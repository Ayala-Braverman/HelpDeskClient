export type Comment = {
    content: string;
    id?: number;
}
export type commentFromServer = {
    id: number;
    ticket_id: number;
    author_id: number;
    content: string;
    created_at: string;
    author_name: string;
    author_email: string;
}
