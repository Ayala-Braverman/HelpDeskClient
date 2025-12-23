import React from 'react';
import type { UserDetails } from '../types/user';
import { useUsersQuery } from '../Query/useQuery';
import { useNavigate, useParams } from 'react-router-dom';

export const GetUserByIdWarpper: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    return <GetUserById id={Number(id)} />;
}
export const GetUserById: React.FC<{ id: number }> = ({ id }) => {
    const { data: users, isLoading, isError } = useUsersQuery();

    if (isLoading) return <div>טוען משתמש...</div>;
    if (isError || !users) return <div>שגיאה בטעינת משתמשים</div>;

    const user = users.find((user: UserDetails) => user.id === id);

    return user
        ? (<div>
            <h3>פרטי משתמש</h3>
            <p>Id: {user.id}</p>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
        </div>)
        : <div>user not found</div>;
};

export const ShowUsers: React.FC = () => {
    const navigate = useNavigate();
    const usersQuery = useUsersQuery();
    const users = usersQuery.data || [];
    return (
        <div>
            <h2>רשימת משתמשים</h2>
            {users.map((user: UserDetails) => (
                <li
                    key={user.id}
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate(`/user/${user.id}`)}
                >
                    {user.id} - {user.name} - {user.email} - {user.role}
                </li>
            ))}
        </div>
    );
}