import React from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard: React.FC = () => {
    const user = localStorage.getItem("user");
const user1 = user ? JSON.parse(user) : null;
    const navigate = useNavigate();
    return (
        <>
            <div>
                <h1>ברוך הבא, {user1 ? user1.name : "מנהל"}</h1>
                <p>שמחים ששבת אלינו</p>
                <p>מה תרצה לעשות היום?</p>
            </div>
            <div>
                <button onClick={() => navigate("/tickets")}>הצג את כל הפניות</button>
                <button onClick={() => navigate("/users")}>הצג את כל המשתמשים</button>
                <button onClick={() => navigate("/createUser")}>צור משתמש</button>
                <button onClick={() => navigate("/createPriority")}>הוסף עדיפות</button>
                <button onClick={() => navigate("/createStatus")}>הוסף סטטוס</button>
            </div>

        </>
    );
}
export default AdminDashboard;