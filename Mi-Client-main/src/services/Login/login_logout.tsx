import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import axios from "axios";
import Swal from 'sweetalert2';
import { useUserContext } from "../../Context/userContext";
import { useNavigate } from "react-router-dom";

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { dispatch: userDispatch } = useUserContext();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const res = await axios.post(
        import.meta.env.VITE_API_URL + "/auth/login",
        data
      );
      console.log("Login successful:");
      Swal.fire({
        icon: "success",
        title: "Logged in!",
        text: "התחברת בהצלחה.",
      });
      userDispatch({ type: "LOGIN", payload: res.data });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      if (res.data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else if (res.data.user.role === "agent") {
        navigate("/agent/dashboard");
      } else {
        navigate("/customer/dashboard");
      }
    }
    catch (error) {
      console.error("Login failed", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error instanceof Error ? error.message : "התחברות נכשלה! אנא בדוק את הפרטים ונסה שוב.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div>
        <label>אימייל</label>
        <input
          type="email"
          {...register("email", {
            required: "חובה להזין אימייל",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "אימייל לא תקין",
            },
          })}
        />
        {errors.email && <small>{errors.email.message}</small>}
      </div>

      <div>
        <label>סיסמה</label>
        <input
          type="password"
          {...register("password", {
            required: "חובה להזין סיסמה",
            minLength: {
              value: 6,
              message: "הסיסמה חייבת להכיל לפחות 6 תווים",
            },
          })}
        />
        {errors.password && <small>{errors.password.message}</small>}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "מתחבר..." : "התחבר"}
      </button>
      <a href="/register">הרשם אם אין לך חשבון</a>
    </form>
  );
};

export const Logout: React.FC = () => {
  const navigate = useNavigate();
  const { dispatch: userDispatch } = useUserContext();

  const handleLogout = () => {
    userDispatch({ type: "LOGOUT" });
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    Swal.fire({
      icon: "success",
      title: "Logged out!",
      text: "התנתקת בהצלחה.",
    });
    navigate("/login");
  };

  return <button onClick={handleLogout}>התנתק</button>;

}

export default LoginForm;
