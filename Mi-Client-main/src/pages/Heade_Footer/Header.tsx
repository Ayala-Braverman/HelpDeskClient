import React from "react";
import { useNavigate } from "react-router-dom";
export const Header: React.FC = () => {
    const navigate = useNavigate();
    return (
        <header>
            <h1>ברוכים הבאים למערכת ניהול הכרטיסים</h1>
            <button onClick={() => navigate("/logout")}>התנתק</button>
            <button onClick={() => navigate("/login")}>התחבר</button>
            <button onClick={() => navigate("/register")}>הרשם</button>
            <button onClick={() => navigate("/")}>דף הבית</button>
        </header>
    );
}