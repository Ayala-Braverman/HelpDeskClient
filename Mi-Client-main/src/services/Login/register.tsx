import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import axios from "axios";
import Swal from 'sweetalert2';
import { Container, Box, Card, CardHeader, CardContent, TextField, Button, Stack, Typography, Divider, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface RegisterFormInputs {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
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
        title: "בהצלחה!",
        text: "נרשמת בהצלחה. אתה יכול להתחבר כעת.",
      }).then(() => {
        navigate("/login");
      });
    } 
    catch (error) {
      console.error("Registration failed", error);
      Swal.fire({
        icon: "error",
        title: "שגיאה",
        text: error instanceof Error ? error.message : "הרישום נכשל! אנא נסה שוב.",
      });
    }
  };

  const password = watch("password");

  return (
    <Container maxWidth="sm">
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        py: 4
      }}>
        <Card sx={{
          width: '100%',
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
        }}>
          <CardHeader 
            title={
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#1e293b', textAlign: 'center' }}>
                הרשמה
              </Typography>
            } 
          />
          <Divider />
          <CardContent sx={{ p: 3 }}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="שם מלא"
                  placeholder="הזן את שמך המלא"
                  {...register("name", {
                    required: "חובה להזין שם מלא",
                  })}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  disabled={isSubmitting}
                />
                <TextField
                  fullWidth
                  type="email"
                  label="אימייל"
                  placeholder="your@email.com"
                  {...register("email", {
                    required: "חובה להזין אימייל",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "אימייל לא תקין",
                    },
                  })}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  disabled={isSubmitting}
                />
                <TextField
                  fullWidth
                  type="password"
                  label="סיסמה"
                  placeholder="בחר סיסמה (לפחות 6 תווים)"
                  {...register("password", {
                    required: "חובה להזין סיסמה",
                    minLength: {
                      value: 6,
                      message: "הסיסמה חייבת להכיל לפחות 6 תווים",
                    },
                  })}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  disabled={isSubmitting}
                />
                <TextField
                  fullWidth
                  type="password"
                  label="אישור סיסמה"
                  placeholder="חזור על הסיסמה"
                  {...register("confirmPassword", {
                    required: "חובה לאשר סיסמה",
                    validate: (value) =>
                      value === password || "הסיסמאות לא תואמות",
                  })}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                  disabled={isSubmitting}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={isSubmitting}
                  sx={{ mt: 2, py: 1.5, bgcolor: '#2563eb', '&:hover': { bgcolor: '#1e40af' }, fontWeight: 600 }}
                >
                  {isSubmitting ? "נרשם..." : "רישום"}
                </Button>
                <Box sx={{ textAlign: 'center', mt: 2 }}>
                  <Typography variant="body2" sx={{ color: '#64748b' }}>
                    יש לך חשבון? {' '}
                    <Link href="/login" sx={{ color: '#2563eb', cursor: 'pointer', textDecoration: 'none', fontWeight: 600, '&:hover': { textDecoration: 'underline' } }}>
                      התחבר כאן
                    </Link>
                  </Typography>
                </Box>
              </Stack>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default RegisterForm;
