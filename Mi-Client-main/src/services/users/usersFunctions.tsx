import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {  type UserToCreate } from "../../types/user";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { USERS_QUERY_KEY} from "../../Query/useQuery";
import { Container, Box, Card, CardContent, TextField, FormControl, InputLabel, Select, MenuItem, Button, Stack, Typography, FormHelperText } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../Context/userContext";


export const getAllUsers = async (token?: string) => {
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
    const { user } = useUserContext();
    const token = user?.token;
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
            <Box sx={{ py: 4 }}>
                <Button 
                    variant="outlined" 
                    onClick={() => navigate(-1)} 
                    sx={{ mb: 3, borderColor: '#10b981', color: '#10b981', fontWeight: 600, '&:hover': { backgroundColor: '#f0fdf4', borderColor: '#10b981' } }}
                >
                    ← חזור
                </Button>
                <Card sx={{ border: '2px solid #a7f3d0', boxShadow: '0 4px 20px rgba(16, 185, 129, 0.1)' }}>
                    <Box sx={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #d1fae5 100%)', p: 3, borderBottom: '2px solid #a7f3d0' }}>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: '#047857', letterSpacing: '-0.5px' }}>
                            משתמש חדש
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#6b7280', mt: 0.5 }}>
                            הוסף משתמש חדש למערכת
                        </Typography>
                    </Box>
                    <CardContent sx={{ p: 4 }}>
                        <form onSubmit={handleSubmit(onSubmit)} noValidate>
                            <Stack spacing={2.5}>
                                <TextField
                                    fullWidth
                                    label="שם מלא"
                                    placeholder="הזן שם מלא"
                                    {...register("name", { required: "חובה להזין שם מלא" })}
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
                                    disabled={isSubmitting}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '&:hover fieldset': { borderColor: '#10b981' },
                                            '&.Mui-focused fieldset': { borderColor: '#10b981', boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.1)' },
                                        },
                                        '& .MuiInputLabel-root.Mui-focused': { color: '#10b981' },
                                    }}
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
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '&:hover fieldset': { borderColor: '#10b981' },
                                            '&.Mui-focused fieldset': { borderColor: '#10b981', boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.1)' },
                                        },
                                        '& .MuiInputLabel-root.Mui-focused': { color: '#10b981' },
                                    }}
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
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '&:hover fieldset': { borderColor: '#10b981' },
                                            '&.Mui-focused fieldset': { borderColor: '#10b981', boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.1)' },
                                        },
                                        '& .MuiInputLabel-root.Mui-focused': { color: '#10b981' },
                                    }}
                                />
                                <FormControl fullWidth error={!!errors.role}>
                                    <InputLabel sx={{ '&.Mui-focused': { color: '#10b981' } }}>תפקיד</InputLabel>
                                    <Select
                                        label="תפקיד"
                                        {...register("role", { required: "חובה לבחור תפקיד" })}
                                        defaultValue=""
                                        disabled={isSubmitting}
                                        sx={{
                                            '&.Mui-focused fieldset': { borderColor: '#10b981', boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.1)' },
                                        }}
                                    >
                                        <MenuItem value="admin">מנהל</MenuItem>
                                        <MenuItem value="agent">סוכן תמיכה</MenuItem>
                                        <MenuItem value="customer">לקוח</MenuItem>
                                    </Select>
                                    {errors.role && <FormHelperText>{errors.role.message}</FormHelperText>}
                                </FormControl>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    disabled={isSubmitting}
                                    sx={{ 
                                        mt: 2, 
                                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                        fontWeight: 700,
                                        py: 1.5,
                                        boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
                                        '&:hover': { 
                                            background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                                            boxShadow: '0 6px 16px rgba(16, 185, 129, 0.4)',
                                        },
                                    }}
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

