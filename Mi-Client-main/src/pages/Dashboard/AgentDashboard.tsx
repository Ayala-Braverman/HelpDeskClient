import React from "react";
import { useNavigate } from "react-router-dom";

const AgentDashboard: React.FC = () => {
    const user = localStorage.getItem("user");
const user1 = user ? JSON.parse(user) : null;
    const navigate = useNavigate();
    return (
        <>
            <div>
                <h1>ברוך הבא, {user1 ? user1.name : "מזכיר"}</h1>
                <p>שמחים ששבת אלינו</p>
                <p>מה תרצה לעשות היום?</p>
            </div>
            <div>
                <button onClick={() => navigate("/tickets")}>הצג פניות שמשויכות אליך</button>
            </div>

        </>
    );
}
export default AgentDashboard;