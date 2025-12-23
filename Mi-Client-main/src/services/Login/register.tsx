import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import axios from "axios";
import Swal from 'sweetalert2';

interface RegisterFormInputs {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormInputs>();

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    try {
      const { confirmPassword, ...dataToSend } = data;
      const res = await axios.post(
        import.meta.env.VITE_API_URL + "/auth/register",
        dataToSend
      );
      console.log("Registration successful:", res.data);
      Swal.fire({
        icon: "success",
        title: "Registered!",
        text: "נרשמת בהצלחה.",
      });
    } 
    catch (error) {
      console.error("Registration failed", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error instanceof Error ? error.message : "הרישום נכשל! אנא נסה שוב.",
      });
    }
  };

  const password = watch("password");

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div>
        <label>שם מלא</label>
        <input
          type="text"
          {...register("name", {
            required: "חובה להזין שם מלא",
          })}
        />
        {errors.name && <small>{errors.name.message}</small>}
      </div>
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
      <div>
        <label>אישור סיסמה</label>
        <input
          type="password" 
          {...register("confirmPassword", {
            required: "חובה לאשר סיסמה",
            validate: (value) =>
              value === password || "הסיסמאות לא תואמות",
          })}
        />
        {errors.confirmPassword && <small>{errors.confirmPassword.message}</small>}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "נרשם..." : "רישום"}
      </button>

      <a href="/login">התחבר אם יש לך חשבון</a>
    </form>
  );
};

export default RegisterForm;
