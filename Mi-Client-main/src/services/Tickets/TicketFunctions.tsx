import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import axios from "axios";
import Swal from 'sweetalert2';
import { type ticketToCreate, type ticketToUpdate } from "../../types/ticket";
import type { Ticket } from "../../types/ticket";
import { usePriorityQuery, useStatusQuery, useUsersQuery } from "../../Query/useQuery";
import { useQueryClient } from "@tanstack/react-query";
import { TICKETS_QUERT_KEY } from "../../Query/useQuery";
import { type TicketById } from "../../types/ticket";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import type { UserDetails } from "../../types/user";
import {
  Container,
  Box,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Typography,
  Stack,
  CircularProgress,
  FormHelperText,
  Divider,
} from '@mui/material';
import {
  Save as SaveIcon,
  ArrowBack as BackIcon,
} from '@mui/icons-material';
import { useUserContext } from '../../Context/userContext';

type statusOrPriority = {
    id: number;
    name: string;
}

export const CreateTicket: React.FC = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { user } = useUserContext();
    const token = user?.token;
    const statuses = useStatusQuery();
    const priorities = usePriorityQuery();
    const statusArray = statuses.data as statusOrPriority[];
    const priorityArray = priorities.data as statusOrPriority[];
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ticketToCreate>();
    
    const onSubmit: SubmitHandler<ticketToCreate> = async (data) => {
        try {
            let newTicket = data;
            newTicket.status_id = statusArray.find((s: statusOrPriority) => s.name === "open")?.id || 1;
            newTicket.assigned_to = 2;
            await axios.post(
                import.meta.env.VITE_API_URL + "/tickets",
                newTicket,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            queryClient.invalidateQueries({ queryKey: TICKETS_QUERT_KEY });
            Swal.fire({
                icon: "success",
                title: "הצלחה!",
                text: "הפנייה נוצרה בהצלחה.",
            }).then(() => navigate('/tickets'));
        }
        catch (error) {
            Swal.fire({
                icon: "error",
                title: "שגיאה",
                text: error instanceof Error ? error.message : "יצירת הפנייה נכשלה! אנא נסה שוב.",
            });
        }
    }
    
    return (
        <Container maxWidth="md">
            <Box sx={{ py: 4 }}>
                <Button startIcon={<BackIcon />} onClick={() => navigate(-1)} sx={{ mb: 3, color: '#2563eb', fontWeight: 600, '&:hover': { backgroundColor: '#f0f4ff' } }}>
                    חזור
                </Button>

                <Card sx={{ border: '2px solid #bae6fd', boxShadow: '0 4px 20px rgba(37, 99, 235, 0.1)' }}>
                    <Box sx={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)', p: 3, borderBottom: '2px solid #bae6fd' }}>
                        <Typography variant="h4" sx={{ fontWeight: 900, color: '#1e40af', letterSpacing: '-0.5px' }}>
                            פנייה חדשה
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#6b7280', mt: 0.5 }}>
                            ספר לנו על הבעיה שלך ואנחנו נעזור לך
                        </Typography>
                    </Box>
                    <CardContent sx={{ p: 4 }}>
                        <form onSubmit={handleSubmit(onSubmit)} noValidate>
                            <Stack spacing={2.5}>
                                <TextField
                                    fullWidth
                                    label="נושא"
                                    placeholder="הזן את נושא הפנייה"
                                    {...register("subject", { required: "חובה להזין נושא" })}
                                    error={!!errors.subject}
                                    helperText={errors.subject?.message}
                                    disabled={isSubmitting}
                                    sx={{
                                        '& .MuiOutlinedInput-root:hover fieldset': { borderColor: '#2563eb' },
                                        '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: '#2563eb', boxShadow: '0 0 0 3px rgba(37, 99, 235, 0.1)' },
                                        '& .MuiInputLabel-root.Mui-focused': { color: '#2563eb' },
                                    }}
                                />

                                <TextField
                                    fullWidth
                                    label="תיאור"
                                    placeholder="הזן תיאור מפורט של הבעיה"
                                    multiline
                                    rows={4}
                                    {...register("description", { required: "חובה להזין תיאור" })}
                                    error={!!errors.description}
                                    helperText={errors.description?.message}
                                    disabled={isSubmitting}
                                    sx={{
                                        '& .MuiOutlinedInput-root:hover fieldset': { borderColor: '#2563eb' },
                                        '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: '#2563eb', boxShadow: '0 0 0 3px rgba(37, 99, 235, 0.1)' },
                                        '& .MuiInputLabel-root.Mui-focused': { color: '#2563eb' },
                                    }}
                                />

                                <FormControl fullWidth error={!!errors.priority_id}>
                                    <InputLabel sx={{ '&.Mui-focused': { color: '#2563eb' } }}>עדיפות</InputLabel>
                                    <Select
                                        label="עדיפות"
                                        {...register("priority_id", { required: "חובה לבחור עדיפות" })}
                                        disabled={isSubmitting}
                                        sx={{
                                            '& .MuiOutlinedInput-root:hover fieldset': { borderColor: '#2563eb' },
                                            '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: '#2563eb', boxShadow: '0 0 0 3px rgba(37, 99, 235, 0.1)' },
                                        }}
                                    >
                                        <MenuItem value="">
                                            <em>בחר עדיפות</em>
                                        </MenuItem>
                                        {priorityArray?.map((priority: statusOrPriority) => (
                                            <MenuItem key={priority.id} value={priority.id}>
                                                {priority.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {errors.priority_id && (
                                        <FormHelperText>{errors.priority_id.message}</FormHelperText>
                                    )}
                                </FormControl>

                                <Button
                                    type="submit"
                                    variant="contained"
                                    startIcon={isSubmitting ? <CircularProgress size={20} /> : <SaveIcon />}
                                    disabled={isSubmitting}
                                    fullWidth
                                    sx={{
                                        background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
                                        fontWeight: 700,
                                        py: 1.5,
                                        boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
                                        '&:hover': { 
                                            background: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)',
                                            boxShadow: '0 6px 16px rgba(37, 99, 235, 0.4)',
                                        },
                                    }}
                                >
                                    {isSubmitting ? 'יוצר פנייה...' : 'צור פנייה'}
                                </Button>
                            </Stack>
                        </form>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
}



export const loadTickets = async (token?: string) => {
    try {
        const userRes = await axios.get(
            import.meta.env.VITE_API_URL + "/tickets",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log("Tickets loaded successfully:");
        return userRes.data as Ticket[];
    }
    catch (error) {
        console.error("Loading tickets failed", error);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error instanceof Error ? error.message : "טעינת הכרטיסים נכשלה! אנא נסה שוב.",
        });
    }
}

export const UpdateTicketWrapper: React.FC = () => {
    const { id } = useParams();
    const location = useLocation();

    const { status_id, priority_id, assigned_to, subject, description } =
        location.state as {
            status_id: number;
            priority_id: number;
            assigned_to: number;
            subject: string;
            description: string;
        };

    if (!id) return <div>לא נמצא id</div>;

    return (
        <UpdateTicket
            id={parseInt(id)}
            status_id={status_id}
            priority_id={priority_id}
            assigned_to={assigned_to}
            subject={subject}
            description={description}
        />
    );
};

export const UpdateTicket: React.FC<{ id: number, status_id: number, priority_id: number, assigned_to: number, subject: string, description: string }> = ({ id, status_id, priority_id, assigned_to, subject }) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { user } = useUserContext();
    const token = user?.token;
    const statuses = useStatusQuery();
    const priorities = usePriorityQuery();
    const users = useUsersQuery();
    const usersArray = users.data as UserDetails[] | undefined;
    const agents = usersArray?.filter((user: UserDetails) => user.role === "agent") || [];
    const statusArray = statuses.data as statusOrPriority[];
    const priorityArray = priorities.data as statusOrPriority[];
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ticketToUpdate>();
    
    const onSubmit: SubmitHandler<ticketToUpdate> = async (data) => {
        try {
            await axios.patch(
                import.meta.env.VITE_API_URL + "/tickets/" + id,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            queryClient.invalidateQueries({ queryKey: TICKETS_QUERT_KEY });
            Swal.fire({
                icon: "success",
                title: "הצלחה!",
                text: "הפנייה עודכנה בהצלחה.",
            }).then(() => navigate(`/ticket/${id}`));
        }
        catch (error) {
            Swal.fire({
                icon: "error",
                title: "שגיאה",
                text: error instanceof Error ? error.message : "עדכון הפנייה נכשל! אנא נסה שוב.",
            });
        }
    }

    return (
        <Container maxWidth="md">
            <Box sx={{ py: 3 }}>
                <Button startIcon={<BackIcon />} onClick={() => navigate(-1)} sx={{ mb: 2, color: '#2563eb' }}>
                    חזור
                </Button>

                <Card sx={{ border: '1px solid #e2e8f0' }}>
                    <CardHeader
                        title={
                            <Typography variant="h5" sx={{ fontWeight: 700, color: '#1e293b' }}>
                                עדכון פנייה #{id}
                            </Typography>
                        }
                    />
                    <Divider />
                    <CardContent sx={{ p: 3 }}>
                        <form onSubmit={handleSubmit(onSubmit)} noValidate>
                            <Stack spacing={3}>
                                <Box sx={{ backgroundColor: '#f8fafc', p: 2, borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}>
                                    <Typography variant="caption" sx={{ fontWeight: 600, color: '#64748b' }}>
                                        נושא נוכחי
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#1e293b', mt: 1 }}>
                                        {subject}
                                    </Typography>
                                </Box>

                                <FormControl fullWidth error={!!errors.priority_id}>
                                    <InputLabel>עדיפות</InputLabel>
                                    <Select
                                        defaultValue={priority_id}
                                        label="עדיפות"
                                        {...register("priority_id", { valueAsNumber: true })}
                                        disabled={isSubmitting}
                                    >
                                        {priorityArray?.map((priority: statusOrPriority) => (
                                            <MenuItem key={priority.id} value={priority.id}>
                                                {priority.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {errors.priority_id && (
                                        <FormHelperText>{errors.priority_id.message}</FormHelperText>
                                    )}
                                </FormControl>

                                <FormControl fullWidth error={!!errors.status_id}>
                                    <InputLabel>סטטוס</InputLabel>
                                    <Select
                                        defaultValue={status_id}
                                        label="סטטוס"
                                        {...register("status_id", { valueAsNumber: true })}
                                        disabled={isSubmitting}
                                    >
                                        {statusArray?.map((status: statusOrPriority) => (
                                            <MenuItem key={status.id} value={status.id}>
                                                {status.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {errors.status_id && (
                                        <FormHelperText>{errors.status_id.message}</FormHelperText>
                                    )}
                                </FormControl>

                                <FormControl fullWidth error={!!errors.assigned_to}>
                                    <InputLabel>הוקצה ל</InputLabel>
                                    <Select
                                        defaultValue={assigned_to}
                                        label="הוקצה ל"
                                        {...register("assigned_to", { valueAsNumber: true })}
                                        disabled={isSubmitting}
                                    >
                                        {agents?.map((agent: UserDetails) => (
                                            <MenuItem key={agent.id} value={agent.id}>
                                                {agent.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {errors.assigned_to && (
                                        <FormHelperText>{errors.assigned_to.message}</FormHelperText>
                                    )}
                                </FormControl>

                                <Button
                                    type="submit"
                                    variant="contained"
                                    startIcon={isSubmitting ? <CircularProgress size={20} /> : <SaveIcon />}
                                    disabled={isSubmitting}
                                    sx={{
                                        backgroundColor: '#2563eb',
                                        '&:hover': { backgroundColor: '#1e40af' },
                                        py: 1.5,
                                    }}
                                    fullWidth
                                >
                                    {isSubmitting ? 'מעדכן...' : 'עדכון פנייה'}
                                </Button>
                            </Stack>
                        </form>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
}

export const DeleteTicketWrapper: React.FC = () => {
    const { id } = useParams();
    if (!id) return <div>לא נמצא id</div>;
    return <DeleteTicket id={parseInt(id)} />;
}

export const DeleteTicket: React.FC<{ id: number }> = ({ id }) => {
    const navigate = useNavigate();
    const { user } = useUserContext();
    const token = user?.token;
    
    const handleDelete = async () => {
        try {
            await axios.delete(import.meta.env.VITE_API_URL + `/tickets/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            Swal.fire({
                icon: "success",
                title: "הצלחה!",
                text: "הפנייה נמחקה בהצלחה.",
            }).then(() => navigate('/tickets'));
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "שגיאה",
                text: error instanceof Error ? error.message : "מחיקת הפנייה נכשלה! אנא נסה שוב.",
            });
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ py: 4, textAlign: 'center' }}>
                <Card sx={{ border: '1px solid #e2e8f0' }}>
                    <CardContent sx={{ p: 3 }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#1e293b' }}>
                            מחיקת פנייה
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#64748b', mb: 3 }}>
                            אתה בטוח שברצונך למחוק את הפנייה #{id}? לא ניתן לחזור על הפעולה הזו.
                        </Typography>
                        <Stack direction="row" spacing={2} justifyContent="center">
                            <Button
                                variant="outlined"
                                onClick={() => navigate(-1)}
                                sx={{ borderColor: '#e2e8f0', color: '#1e293b' }}
                            >
                                ביטול
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={handleDelete}
                            >
                                מחק פנייה
                            </Button>
                        </Stack>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
}

export const getTicketById = async (id: number, token?: string): Promise<TicketById | undefined> => {
    try {
        const res = await axios.get(
            import.meta.env.VITE_API_URL + "/tickets/" + id,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log("Get ticket by ID successful");
        return res.data as TicketById;
    }
    catch (error) {
        console.error("Getting ticket by ID failed", error);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error instanceof Error ? error.message : "טעינת הכרטיס נכשלה! אנא נסה שוב.",
        });
        return undefined;
    }
}


export default loadTickets;