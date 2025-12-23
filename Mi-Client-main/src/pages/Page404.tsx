import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Box, Typography, Button, Card, CardContent, Stack } from "@mui/material";
import { Home as HomeIcon, ArrowBack as ArrowBackIcon } from "@mui/icons-material";

export const Error404: React.FC = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleGoHome = () => {
    if (user?.id) {
      // If logged in, go to dashboard
      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else if (user.role === 'agent') {
        navigate('/agent/dashboard');
      } else {
        navigate('/customer/dashboard');
      }
    } else {
      // If not logged in, go to home
      navigate('/');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh',
          py: 4,
        }}
      >
        <Card sx={{ width: '100%', border: '1px solid #e2e8f0', boxShadow: 'none' }}>
          <CardContent sx={{ textAlign: 'center', py: 6 }}>
            {/* 404 Number */}
            <Typography
              variant="h1"
              sx={{
                fontSize: '5rem',
                fontWeight: 800,
                color: '#2563eb',
                mb: 2,
                lineHeight: 1,
              }}
            >
              404
            </Typography>

            {/* Main Message */}
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: '#1e293b',
                mb: 2,
              }}
            >
              הדף לא נמצא
            </Typography>

            {/* Description */}
            <Typography
              variant="body1"
              sx={{
                color: '#64748b',
                mb: 4,
                lineHeight: 1.8,
              }}
            >
              לצערנו, הדף שאתה מחפש לא קיים או הוסר.
              <br />
              אנא בחר מהתפריט הצדי או חזור לדף הבית.
            </Typography>

            {/* Action Buttons */}
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              sx={{ justifyContent: 'center' }}
            >
              <Button
                variant="contained"
                startIcon={<HomeIcon />}
                onClick={handleGoHome}
                sx={{
                  background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
                  color: 'white',
                  fontWeight: 600,
                  textTransform: 'none',
                  fontSize: '1rem',
                  px: 3,
                  py: 1.25,
                  '&:hover': {
                    background: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)',
                  },
                }}
              >
                חזור לבית
              </Button>
              <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate(-1)}
                sx={{
                  color: '#2563eb',
                  borderColor: '#2563eb',
                  fontWeight: 600,
                  textTransform: 'none',
                  fontSize: '1rem',
                  px: 3,
                  py: 1.25,
                  '&:hover': {
                    borderColor: '#1e40af',
                    backgroundColor: '#f0f4f8',
                  },
                }}
              >
                דף קודם
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};