import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import axios from "axios";
import Swal from 'sweetalert2';
import { useUserContext } from "../../Context/userContext";
import { useNavigate } from "react-router-dom";
import { Container, Box, Card, CardHeader, CardContent, TextField, Button, Stack, Typography, Divider, Link } from "@mui/material";

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
        title: "בהצלחה!",
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
        title: "שגיאה",
        text: error instanceof Error ? error.message : "התחברות נכשלה! אנא בדוק את הפרטים ונסה שוב.",
      });
    }
  };

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
               טופס התחברות 
              </Typography>
            } 
          />
          <Divider />
          <CardContent sx={{ p: 3 }}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Stack spacing={3}>
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
                  placeholder="הזן סיסמה"
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
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={isSubmitting}
                  sx={{ mt: 2, py: 1.5, bgcolor: '#2563eb', '&:hover': { bgcolor: '#1e40af' }, fontWeight: 600 }}
                >
                  {isSubmitting ? "מתחבר..." : "התחבר"}
                </Button>
                <Box sx={{ textAlign: 'center', mt: 2 }}>
                  <Typography variant="body2" sx={{ color: '#64748b' }}>
                    אין לך חשבון? {' '}
                    <Link href="/register" sx={{ color: '#2563eb', cursor: 'pointer', textDecoration: 'none', fontWeight: 600, '&:hover': { textDecoration: 'underline' } }}>
                      הרשם כאן
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

export const Logout: React.FC = () => {
  const navigate = useNavigate();
  const { dispatch: userDispatch } = useUserContext();

  const handleLogout = () => {
    userDispatch({ type: "LOGOUT" });
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    Swal.fire({
      icon: "success",
      title: "בהצלחה!",
      text: "התנתקת בהצלחה.",
    });
    navigate("/login");
  };

  return (<Box >
    <p style={{ textAlign: 'center', marginTop: 25, fontSize:30, fontFamily: 'Arial, sans-serif' }}>?האם אתה בטוח שברצונך להתנתק</p>
    <Button
      variant="outlined"
      onClick={handleLogout}
      sx={{ borderColor: '#e2e8f0', color: '#1e293b' , margin: '50px'}}
    >
      התנתק
    </Button>
    <Button 
    variant="outlined"
      onClick={() => navigate(-1)}
      sx={{ borderColor: '#e2e8f0', color: '#1e293b' , margin: '50px'}}
    >
      חזור
    </Button>


  </Box>);
}

export default LoginForm;
