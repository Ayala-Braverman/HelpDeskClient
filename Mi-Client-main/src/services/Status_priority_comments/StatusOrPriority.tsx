import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from 'sweetalert2';
import { useQueryClient } from "@tanstack/react-query";
import { PRIORITIES_QUERY_KEY } from "../../Query/useQuery";
import { STATUSES_QUERY_KEY } from "../../Query/useQuery";
type statusOrPriorityFormInput = {
    name: string;
}

type GetPriorityOrStatusProps = {
    type: "priorities" | "statuses";
}
export const GetPriorityOrStatus: React.FC<GetPriorityOrStatusProps> = async ({ type }) => {
    const token = localStorage.getItem("token");
    try {
        const res = await axios.get(
            import.meta.env.VITE_API_URL + `/${type}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log(`${type} loaded successfully:`);
        return res.data;
        
    }
    catch (error) {
        console.error(`Loading ${type} failed`, error);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error instanceof Error ? error.message : `טעינת ה${type} נכשלה! אנא נסה שוב.`,
        });
    }
    return null;
}

export const AddStatusOrPriorityForm: React.FC<{ type: string }> = ({ type }) => {
    const queryClient = useQueryClient();
    const token = localStorage.getItem("token");

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<statusOrPriorityFormInput>();
    const onSubmit = async (data: statusOrPriorityFormInput) => {
        try {
            const res = await axios.post(
                import.meta.env.VITE_API_URL + `/${type}`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (type === "priorities") {
                queryClient.invalidateQueries({ queryKey: PRIORITIES_QUERY_KEY });
            } else if (type === "statuses") {
                queryClient.invalidateQueries({ queryKey: STATUSES_QUERY_KEY });
            }
            console.log("Adding comment successful:", res.data);
            Swal.fire({
                icon: "success",
                title: "Comment Added!",
                text: "התגובה נוספה בהצלחה.",
            });
        }
        catch (error) {
            console.error("Adding comment failed", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error instanceof Error ? error.message : "הוספת התגובה נכשלה! אנא נסה שוב.",
            });
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div>
                <label>שם ה{type === "priorities" ? "עדיפות" : "סטטוס"}:</label>
                <input
                    type="text"
                    {...register("name", {
                        required: "חובה להזין שם ",
                    })} />
                {errors.name && <small>{errors.name.message}</small>}
            </div>
            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "שולח..." : "הוסף"}
            </button>
        </form>
    );
}
