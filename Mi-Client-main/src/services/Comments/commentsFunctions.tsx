import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { COMMENTS_QUERY_KEY } from "../../Query/useQuery";
import { useQueryClient } from "@tanstack/react-query";


export const getComments = async (ticketId: number) => {
    const token = localStorage.getItem("token");
    try {
        const res = await axios.get(
            import.meta.env.VITE_API_URL + `/tickets/${ticketId}/comments`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log("Comments loaded successfully:");
        return res.data;
    }
    catch (error) {
        console.error("Loading comments failed", error);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error instanceof Error ? error.message : "טעינת התגובות נכשלה! אנא נסה שוב.",
        });
    }
}

export const AddComment: React.FC<{ ticketId: number }> = ({ ticketId }) => {
    const queryClient = useQueryClient();
    const token = localStorage.getItem("token");
    type Comment = {
        content: string;
    }
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<Comment>();
    const onSubmit = async (data: Comment) => {
        try {
            await axios.post(
                import.meta.env.VITE_API_URL + `/tickets/${ticketId}/comments`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            queryClient.invalidateQueries({ queryKey: COMMENTS_QUERY_KEY });
            console.log("Adding comment successful:");
            Swal.fire({
                icon: "success",
                title: "Comment Added!",
                text: "התגובה נוספה בהצלחה.",
            });
            window.location.reload();
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
                <label>תגובה</label>
                <input
                    type="text"
                    {...register("content", {
                        required: "חובה להזין תוכן תגובה"
                    })} />
                {errors.content && <small>{errors.content.message}</small>}
            </div>
            <button type="submit" disabled={isSubmitting}>
                שלח תגובה
            </button>
        </form>
    );

}

