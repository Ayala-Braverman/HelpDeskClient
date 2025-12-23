import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {  type UserToCreate } from "../../types/user";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { USERS_QUERY_KEY} from "../../Query/useQuery";
import { Container, Box, Card, CardHeader, CardContent, TextField, FormControl, InputLabel, Select, MenuItem, Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";


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
    const navigate = useNavigate();
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
                title: "בהצלחה!",
                text: "המשתמש נוצר בהצלחה.",
            }).then(() => {
                queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY });
                navigate("/users");
            });
        }
        catch (error) {
            console.error("Creating user failed", error);
            Swal.fire({
                icon: "error",
                title: "שגיאה",
                text: error instanceof Error ? error.message : "יצירת המשתמש נכשלה! אנא נסה שוב.",
            });
        }
    }
    return (
        <Container maxWidth="md">
            <Box sx={{ py: 3 }}>
                <Button variant="outlined" onClick={() => navigate(-1)} sx={{ mb: 2, borderColor: '#e2e8f0', color: '#1e293b' }}>
                    ← חזור
                </Button>
                <Card sx={{ border: '1px solid #e2e8f0' }}>
                    <CardHeader title={<Typography variant="h5" sx={{ fontWeight: 700, color: '#1e293b' }}>משתמש חדש</Typography>} />
                    <CardContent sx={{ p: 3 }}>
                        <form onSubmit={handleSubmit(onSubmit)} noValidate>
                            <Stack spacing={3}>
                                <TextField
                                    fullWidth
                                    label="שם מלא"
                                    placeholder="הזן שם מלא"
                                    {...register("name", { required: "חובה להזין שם מלא" })}
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
                                    disabled={isSubmitting}
                                />
                                <TextField
                                    fullWidth
                                    type="email"
                                    label="אימייל"
                                    placeholder="example@domain.com"
                                    {...register("email", {
                                        required: "חובה להזין אימייל",
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: "אימייל לא תקין"
                                        }
                                    })}
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                    disabled={isSubmitting}
                                />
                                <TextField
                                    fullWidth
                                    type="password"
                                    label="סיסמה"
                                    placeholder="הזן סיסמה (לפחות 6 תווים)"
                                    {...register("password", {
                                        required: "חובה להזין סיסמה",
                                        minLength: {
                                            value: 6,
                                            message: "הסיסמה חייבת להכיל לפחות 6 תווים"
                                        }
                                    })}
                                    error={!!errors.password}
                                    helperText={errors.password?.message}
                                    disabled={isSubmitting}
                                />
                                <FormControl fullWidth error={!!errors.role}>
                                    <InputLabel>תפקיד</InputLabel>
                                    <Select
                                        label="תפקיד"
                                        {...register("role", { required: "חובה לבחור תפקיד" })}
                                        defaultValue=""
                                        disabled={isSubmitting}
                                    >
                                        <MenuItem value="admin">מנהל</MenuItem>
                                        <MenuItem value="agent">מזכיר</MenuItem>
                                        <MenuItem value="customer">משתמש</MenuItem>
                                    </Select>
                                    {errors.role && <Typography variant="caption" sx={{ color: '#d32f2f', display: 'block', mt: 0.5 }}>{errors.role.message}</Typography>}
                                </FormControl>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    disabled={isSubmitting}
                                    sx={{ mt: 1, bgcolor: '#2563eb', '&:hover': { bgcolor: '#1e40af' } }}
                                >
                                    {isSubmitting ? "יוצר משתמש..." : "צור משתמש"}
                                </Button>
                            </Stack>
                        </form>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
}

