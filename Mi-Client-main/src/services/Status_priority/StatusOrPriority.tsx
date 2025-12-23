import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from 'sweetalert2';
import { useQueryClient } from "@tanstack/react-query";
import { PRIORITIES_QUERY_KEY } from "../../Query/useQuery";
import { STATUSES_QUERY_KEY } from "../../Query/useQuery";
import { Container, Box, Card, CardHeader, CardContent, TextField, Button, Stack, Typography, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";


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
                navigate(type === "priorities" ? "/priorities" : "/statuses");
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
                <Button variant="outlined" onClick={() => navigate(-1)} sx={{ mb: 2, borderColor: '#e2e8f0', color: '#1e293b' }}>
                    ↑ חזור
                </Button>
                <Card sx={{ border: '1px solid #e2e8f0' }}>
                    <CardHeader title={<Typography variant="h5" sx={{ fontWeight: 700, color: '#1e293b' }}>הוסף {typeLabel}</Typography>} />
                    <Divider />
                    <CardContent sx={{ p: 3 }}>
                        <form onSubmit={handleSubmit(onSubmit)} noValidate>
                            <Stack spacing={3}>
                                <TextField
                                    fullWidth
                                    label={`שם ${typeLabel}`}
                                    placeholder={`הזן את שם ${typeLabel}`}
                                    {...register("name", { required: `חובה להזין שם ${typeLabel}` })}
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
                                    disabled={isSubmitting}
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    disabled={isSubmitting}
                                    sx={{ mt: 1, bgcolor: '#2563eb', '&:hover': { bgcolor: '#1e40af' } }}
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
