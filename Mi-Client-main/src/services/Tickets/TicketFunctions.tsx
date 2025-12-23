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

type statusOrPriority = {
    id: number;
    name: string;
}

export const CreateTicket: React.FC = () => {
    const queryClient = useQueryClient();
    const token = localStorage.getItem("token");
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
            const res = await axios.post(
                import.meta.env.VITE_API_URL + "/tickets",
                newTicket,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            queryClient.invalidateQueries({ queryKey: TICKETS_QUERT_KEY });
            console.log("Creating ticket successful:", res.data);
            Swal.fire({
                icon: "success",
                title: "Ticket Created!",
                text: "הכרטיס נוצר בהצלחה.",
            });
        }
        catch (error) {
            console.error("Creating ticket failed", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error instanceof Error ? error.message : "יצירת הכרטיס נכשלה! אנא נסה שוב.",
            });
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <h3>פניה חדשה</h3>
            <div>
                <label>נושא</label>
                <input
                    type="text"
                    {...register("subject", {
                        required: "חובה להזין נושא"
                    })} />
                {errors.subject && <small>{errors.subject.message}</small>}
            </div>
            <div>
                <label>תיאור</label>
                <input
                    type="text"
                    {...register("description", {
                        required: "חובה להזין תיאור"
                    })} />
                {errors.description && <small>{errors.description.message}</small>}
            </div>
            <div>
                <label>עדיפות</label>
                <select {...register("priority_id", { required: "חובה לבחור עדיפות" })}>
                    <option value="">בחר עדיפות</option>
                    {priorityArray?.map((priority: statusOrPriority) => (
                        <option key={priority.id} value={priority.id}>
                            {priority.name}
                        </option>
                    ))}
                </select>
                {errors.priority_id && <small>{errors.priority_id.message}</small>}
            </div>
            <button type="submit" disabled={isSubmitting}>יצירת פניה</button>
        </form>

    );

}



export const loadTickets = async () => {
    const token = localStorage.getItem("token");
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

export const UpdateTicket: React.FC<{ id: number, status_id: number, priority_id: number, assigned_to: number, subject: string, description: string }> = ({ id, status_id, priority_id, assigned_to, subject, description }) => {
    const queryClient = useQueryClient();
    const token = localStorage.getItem("token");
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

            const res = await axios.patch(
                import.meta.env.VITE_API_URL + "/tickets/" + id,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            queryClient.invalidateQueries({ queryKey: TICKETS_QUERT_KEY });
            console.log("Update ticket successful:", res.data);
            Swal.fire({
                icon: "success",
                title: "Ticket Updated!",
                text: "הכרטיס עודכן בהצלחה.",
            });
        }
        catch (error) {
            console.error("Updating ticket failed", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error instanceof Error ? error.message : "עדכון הכרטיס נכשלה! אנא נסה שוב.",
            });
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <h3>עדכון פניה</h3>
            <div>
                <p>Id: {id}</p>
            </div>
            <div>
                <p>נושא נוכחי: {subject}</p>
            </div>
            <div>
                <p>תיאור נוכחי: {description}</p>
            </div>
            <div>
                <label>עדיפות</label>
                <select {...register("priority_id", { required: "חובה לבחור עדיפות", valueAsNumber: true })}>
                    <option value={priority_id}>{priority_id}</option>
                    {priorityArray?.map((priority: statusOrPriority) => (
                        <option key={priority.id} value={priority.id}>
                            {priority.name}
                        </option>
                    ))}
                </select>
                {errors.priority_id && <small>{errors.priority_id.message}</small>}
            </div>
            <div>
                <label>סטטוס</label>
                <select {...register("status_id", { required: "חובה לבחור סטטוס", valueAsNumber: true })}>
                    <option value={status_id}>{status_id}</option>
                    {statusArray?.map((status: statusOrPriority) => (
                        <option key={status.id} value={status.id}>
                            {status.name}
                        </option>
                    ))}
                </select>
                {errors.status_id && <small>{errors.status_id.message}</small>}
            </div>
            <div>
                <label>הוקצה ל</label>
                <select {...register("assigned_to", { required: "חובה לבחור משתמש", valueAsNumber: true })}>
                    <option value={assigned_to}>{assigned_to}</option>
                    {agents?.map((agent: UserDetails) => (
                        <option key={agent.id} value={agent.id}>
                            {agent.name}
                        </option>
                    ))}
                </select>
                {errors.assigned_to && <small>{errors.assigned_to.message}</small>}
            </div>
            <button type="submit" disabled={isSubmitting}>עדכון פניה</button>
        </form>
    );

};

export const DeleteTicketWrapper: React.FC = () => {
    const { id } = useParams();
    if (!id) return <div>לא נמצא id</div>;
    return <DeleteTicket id={parseInt(id)} />;
}


export const DeleteTicket: React.FC<{ id: number }> = ({ id }) => {
    const handleDelete = async () => {
        const navigate = useNavigate();
        const token = localStorage.getItem("token");
        try {
            await axios.delete(import.meta.env.VITE_API_URL + `/tickets/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log("Deleting ticket successful:", id);
            navigate(`/tickets/${id}`);
        } catch (error) {
            console.error("Deleting ticket failed", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error instanceof Error ? error.message : "מחיקת הכרטיס נכשלה! אנא נסה שוב.",
            });
        }
    };

    return (
        <div>
            <p>אתה בטוח שברצונך למחוק את הפניה?</p>
            <button onClick={handleDelete}>מחק פניה</button>
        </div>
    );
};

export const getTicketById = async (id: number): Promise<TicketById | undefined> => {
    const token = localStorage.getItem("token");
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