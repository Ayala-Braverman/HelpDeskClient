import React from "react";
import { useNavigate } from "react-router-dom";

const CustomerDashboard: React.FC = () => {
    const user = localStorage.getItem("user");
const user1 = user ? JSON.parse(user) : null;
    const navigate = useNavigate();
    return (
        <>
            <div>
                <h1>ברוך הבא, {user1 ? user1.name : "אורח"}</h1>
                <p>שמחים ששבת אלינו</p>
                <p>מה תרצה לעשות היום?</p>
            </div>
            <div>
                <button onClick={() => navigate("/ticket/new")}>צור פנייה חדשה</button>
                <button onClick={() => navigate("/tickets")}>הצג פניות קיימות</button>
            </div>

        </>
    );
}
export default CustomerDashboard;