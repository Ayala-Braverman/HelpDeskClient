import React, { useEffect, useState } from 'react';
import type { Ticket, TicketById } from '../types/ticket';
import { useTicketsQuery } from '../Query/useQuery';
import { useNavigate, useParams } from 'react-router-dom';
import { getTicketById } from '../services/Tickets/TicketFunctions';
import { ShowComments } from './CommentsComponents';
import { AddComment } from '../services/Comments/commentsFunctions';
export const ShowTickets: React.FC = () => {
    const ticketsQuery = useTicketsQuery();
    const ticketsArray = ticketsQuery.data as Ticket[] || [];
    const navigate = useNavigate();
    return (
        <div>
            <h3>כל הפניות</h3>
            <ul>
                {ticketsArray.map((ticket) => (
                    <li
                        key={ticket.id}
                        style={{ cursor: 'pointer' }}
                        onClick={() => navigate(`/ticket/${ticket.id}`)}
                    >
                        {ticket.id} - {ticket.subject} - סטטוס: {ticket.status_id} - עדיפות: {ticket.priority_id}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export const GetTicketByIdWrapper: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    return <GetTicketById id={Number(id)} />;
};

export const GetTicketById: React.FC<{ id: number }> = ({ id }) => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    console.log("Rendering GetTicketById for id:", id);
    const [ticket, setTicket] = useState<TicketById | null>(null);
    const [loading, setLoading] = useState(true);
    const [showComment, setShowComment] = useState(false);

    useEffect(() => {
        getTicketById(id).then((t) => {
            setTicket(t ?? null);
            setLoading(false);
        }).catch(() => setLoading(false));
    }, [id]);

    if (loading) return <div>טוען...</div>;
    if (!ticket) return <div>הטיקט לא נמצא</div>;


    return (
        <div>
            <h3>פרטי פניה</h3>
            <p>Id: {ticket.id}</p>
            <p>נושא: {ticket.subject}</p>
            <p>תיאור: {ticket.description}</p>
            <p>סטטוס: {ticket.status_id}</p>
            <p>עדיפות: {ticket.priority_id}</p>
            <p>נוצר על ידי: {ticket.created_by_name} ({ticket.created_by_email})</p>
            <p>הוקצה ל: {ticket.assigned_to_name ? `${ticket.assigned_to_name} (${ticket.assigned_to_email})` : 'לא הוקצה'}</p>
            <p>נוצר בתאריך: {ticket.created_at}</p>
            <p>עודכן לאחרונה בתאריך: {ticket.updated_at ?? 'לא עודכן'}</p>
            <p>מספר הערות: {ticket.comments.length}</p>
            {ticket.comments.length > 0 && <><p>רשימת הערות:</p>
                <ShowComments id={ticket.id}></ShowComments>
            </>}
            {!showComment && <button onClick={() => setShowComment(!showComment)}>הוסף תגובה</button>}
            {showComment && <AddComment ticketId={ticket.id} />}
            {user.role != "customer" && <button onClick={() =>
                navigate(`/ticket/update/${ticket.id}`, {
                    state: {
                        status_id: ticket.status_id,
                        priority_id: ticket.priority_id,
                        assigned_to: ticket.assigned_to,
                        subject: ticket.subject,
                        description: ticket.description,
                    },
                })
            }>עדכן פניה</button>}
            {user.role=="admin" && <button onClick={() =>
                navigate(`/deleteTicket/${ticket.id}`)
            }>מחק פניה</button>}
        </div >
    );
};