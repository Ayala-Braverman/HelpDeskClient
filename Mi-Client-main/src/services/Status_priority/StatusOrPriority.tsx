import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from 'sweetalert2';
import { useQueryClient } from "@tanstack/react-query";
import { PRIORITIES_QUERY_KEY } from "../../Query/useQuery";
import { STATUSES_QUERY_KEY } from "../../Query/useQuery";
import { Container, Box, Card, CardContent, TextField, Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../Context/userContext";


type statusOrPriorityFormInput = {
    name: string;
}

type GetPriorityOrStatusProps = {
    type: "priorities" | "statuses";
    token?: string;
}
export const GetPriorityOrStatus: React.FC<GetPriorityOrStatusProps> = async ({ type, token }) => {
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
    const { user } = useUserContext();
    const token = user?.token;
    const navigate = useNavigate();
    const isStatusType = type === "statuses";
    const typeLabel = isStatusType ? "סטטוס" : "עדיפות";

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<statusOrPriorityFormInput>();
    const onSubmit = async (data: statusOrPriorityFormInput) => {
        try {
            await axios.post(
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
            console.log("Adding successful:", data);
            Swal.fire({
                icon: "success",
                title: "בהצלחה!",
                text: `ה${typeLabel} נוסף בהצלחה.`,
            }).then(() => {
                navigate(-1);
            });
        }
        catch (error) {
            console.error("Adding failed", error);
            Swal.fire({
                icon: "error",
                title: "שגיאה",
                text: error instanceof Error ? error.message : `הוספת ה${typeLabel} נכשלה! אנא נסה שוב.`,
            });
        }
    }
    return (
        <Container maxWidth="sm">
            <Box sx={{ py: 4 }}>
                <Button 
                    variant="outlined" 
                    onClick={() => navigate(-1)} 
                    sx={{ 
                        mb: 3, 
                        borderColor: type === 'statuses' ? '#10b981' : '#2563eb', 
                        color: type === 'statuses' ? '#10b981' : '#2563eb',
                        fontWeight: 600,
                        '&:hover': { 
                            backgroundColor: type === 'statuses' ? '#f0fdf4' : '#f0f4ff',
                            borderColor: type === 'statuses' ? '#10b981' : '#2563eb'
                        } 
                    }}
                >
                    ← חזור
                </Button>
                <Card sx={{ 
                    border: type === 'statuses' ? '2px solid #a7f3d0' : '2px solid #bae6fd', 
                    boxShadow: type === 'statuses' ? '0 4px 20px rgba(16, 185, 129, 0.1)' : '0 4px 20px rgba(37, 99, 235, 0.1)'
                }}>
                    <Box sx={{ 
                        background: type === 'statuses'
                            ? 'linear-gradient(135deg, #f0fdf4 0%, #d1fae5 100%)'
                            : 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
                        p: 3, 
                        borderBottom: type === 'statuses' ? '2px solid #a7f3d0' : '2px solid #bae6fd'
                    }}>
                        <Typography 
                            variant="h4" 
                            sx={{ 
                                fontWeight: 700, 
                                color: type === 'statuses' ? '#047857' : '#1e40af',
                                letterSpacing: '-0.5px'
                            }}
                        >
                            הוסף {typeLabel}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#6b7280', mt: 0.5 }}>
                            הוסף {typeLabel} חדש למערכת
                        </Typography>
                    </Box>
                    <CardContent sx={{ p: 4 }}>
                        <form onSubmit={handleSubmit(onSubmit)} noValidate>
                            <Stack spacing={2.5}>
                                <TextField
                                    fullWidth
                                    label={`שם ${typeLabel}`}
                                    placeholder={`הזן את שם ${typeLabel}`}
                                    {...register("name", { required: `חובה להזין שם ${typeLabel}` })}
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
                                    disabled={isSubmitting}
                                    sx={{
                                        '& .MuiOutlinedInput-root:hover fieldset': { borderColor: type === 'statuses' ? '#10b981' : '#2563eb' },
                                        '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: type === 'statuses' ? '#10b981' : '#2563eb', boxShadow: type === 'statuses' ? '0 0 0 3px rgba(16, 185, 129, 0.1)' : '0 0 0 3px rgba(37, 99, 235, 0.1)' },
                                        '& .MuiInputLabel-root.Mui-focused': { color: type === 'statuses' ? '#10b981' : '#2563eb' },
                                    }}
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    disabled={isSubmitting}
                                    fullWidth
                                    sx={{ 
                                        background: type === 'statuses'
                                            ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                                            : 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
                                        fontWeight: 700,
                                        py: 1.5,
                                        boxShadow: type === 'statuses'
                                            ? '0 4px 12px rgba(16, 185, 129, 0.3)'
                                            : '0 4px 12px rgba(37, 99, 235, 0.3)',
                                        '&:hover': { 
                                            background: type === 'statuses'
                                                ? 'linear-gradient(135deg, #059669 0%, #047857 100%)'
                                                : 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)',
                                            boxShadow: type === 'statuses'
                                                ? '0 6px 16px rgba(16, 185, 129, 0.4)'
                                                : '0 6px 16px rgba(37, 99, 235, 0.4)',
                                        },
                                    }}
                                >
                                    {isSubmitting ? "שולח..." : "הוסף"}
                                </Button>
                            </Stack>
                        </form>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
}
