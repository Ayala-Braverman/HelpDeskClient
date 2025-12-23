import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {  type UserToCreate } from "../../types/user";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { USERS_QUERY_KEY} from "../../Query/useQuery";


export const getAllUsers = async () => {
    const token = localStorage.getItem("token");
    try {
        const res = await axios.get(
            import.meta.env.VITE_API_URL + "/users",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log("Users loaded successfully:");
        return res.data;
    }
    catch (error) {
        console.error("Loading users failed", error);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error instanceof Error ? error.message : "טעינת המשתמשים נכשלה! אנא נסה שוב.",
        });
    }
}

export const CreateUser: React.FC = () => {
    const token = localStorage.getItem("token");
    const queryClient = useQueryClient();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<UserToCreate>();
    const onSubmit = async (data: UserToCreate) => {
        try {
            await axios.post(
                import.meta.env.VITE_API_URL + "/users",
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("Creating user successful");
            Swal.fire({
                icon: "success",
                title: "User Created!",
                text: "המשתמש נוצר בהצלחה.",
            });
            queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY });
        }
        catch (error) {
            console.error("Creating user failed", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error instanceof Error ? error.message : "יצירת המשתמש נכשלה! אנא נסה שוב.",
            });
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <h3>משתמש חדש</h3>
            <div>
                <label>שם מלא</label>
                <input
                    type="text"
                    {...register("name", {
                        required: "חובה להזין שם מלא"
                    })} />
                {errors.name && <small>{errors.name.message}</small>}
            </div>
            <div>
                <label>אימייל</label>
                <input
                    type="email"
                    {...register("email", {
                        required: "חובה להזין אימייל",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "אימייל לא תקין"
                        }
                    })} />
                {errors.email && <small>{errors.email.message}</small>}
            </div>
            <div>
                <label>סיסמה</label>
                <input
                    type="password"
                    {...register("password", {
                        required: "חובה להזין סיסמה",
                        minLength: {
                            value: 6, message: "הסיסמה חייבת להכיל לפחות 6 תווים"
                        }
                    })} />
                {errors.password && <small>{errors.password.message}</small>}
            </div>
            <div>
                <label>תפקיד</label>
                <select {...register("role", { required: "חובה לבחור תפקיד" })} defaultValue="">
                    <option value="" disabled>בחר תפקיד</option>
                    <option value="admin">מנהל</option>
                    <option value="agent">מזכיר</option>
                    <option value="customer">משתמש</option>
                </select>

                {errors.role && <small>{errors.role.message}</small>}
            </div>
            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "יוצר משתמש..." : "צור משתמש"}
            </button>
        </form>
    );
}

