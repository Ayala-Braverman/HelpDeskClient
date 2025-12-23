import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { COMMENTS_QUERY_KEY } from "../../Query/useQuery";
import { useQueryClient } from "@tanstack/react-query";
import { Box, TextField, IconButton, InputAdornment } from "@mui/material";
import { Send as SendIcon } from "@mui/icons-material";


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
        reset,
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
                title: "בהצלחה!",
                text: "התגובה נוספה בהצלחה.",
            });
            reset();
        }
        catch (error) {
            console.error("Adding comment failed", error);
            Swal.fire({
                icon: "error",
                title: "שגיאה",
                text: error instanceof Error ? error.message : "הוספת התגובה נכשלה! אנא נסה שוב.",
            });
        }
    }
    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{
                display: 'flex',
                gap: 1,
                alignItems: 'flex-end',
                p: 2,
                backgroundColor: '#ffffff',
                borderTop: '1px solid #e2e8f0',
                borderRadius: '0 0 8px 8px',
                mt: 2,
            }}
        >
            <TextField
                fullWidth
                placeholder="כתוב הערה..."
                {...register("content", { required: "חובה להזין תוכן תגובה" })}
                error={!!errors.content}
                helperText={errors.content?.message}
                disabled={isSubmitting}
                multiline
                maxRows={4}
                variant="outlined"
                size="small"
                sx={{
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                        backgroundColor: '#f9fafb',
                        '&:hover': {
                            backgroundColor: '#f3f4f6',
                        },
                    },
                }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                type="submit"
                                disabled={isSubmitting}
                                size="small"
                                sx={{
                                    color: '#2563eb',
                                    '&:hover': {
                                        backgroundColor: '#dbeafe',
                                    },
                                }}
                            >
                                <SendIcon fontSize="small" />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </Box>
    );
}

