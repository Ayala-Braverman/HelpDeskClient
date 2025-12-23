import React from "react";
import Swal from "sweetalert2";
import { type Comment } from "../types/comments";
import { useCommentsQuery } from "../Query/useQuery";
export const ShowComments: React.FC<{ id: number }> = ({ id }) => {
    const comments = useCommentsQuery(id);
    const items = comments.data || [];
    React.useEffect(() => {
        if (comments.error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text:
                    comments.error instanceof Error
                        ? comments.error.message
                        : "טעינת הערות נכשלה",
            });
        }
    }, [comments.error]);

    if (comments.isLoading) return <div>טוען...</div>;

    return (
        <div>
            <h2>רשימת תגובות</h2>
            <ul>
                {items.map((comment:Comment) => (
                    <li key={comment.id ?? comment.content}>{comment.content}</li>
                ))}
            </ul>
        </div>
    );
}