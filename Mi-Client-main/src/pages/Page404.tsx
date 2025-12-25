import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Box, Typography, Button } from "@mui/material";
import { ErrorOutline as ErrorOutlineIcon } from "@mui/icons-material";
import { useUserContext } from "../Context/userContext";

export const Error404: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const userDetails = user?.userDetails;

  const handleGoHome = () => {
    if (userDetails?.id) {
      // If logged in, go to dashboard
      if (userDetails.role === 'admin') {
        navigate('/admin/dashboard');
      } else if (userDetails.role === 'agent') {
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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: '#f9fafb',
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          {/* Icon Circle */}
          <Box
            sx={{
              width: 120,
              height: 120,
              borderRadius: '50%',
              background: '#dbeafe',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mb: 4,
            }}
          >
            <ErrorOutlineIcon
              sx={{
                fontSize: 60,
                color: '#3b82f6',
              }}
            />
          </Box>

          {/* 404 Number */}
          <Typography
            sx={{
              fontSize: { xs: '3.5rem', sm: '5rem' },
              fontWeight: 900,
              background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              mb: 2,
              lineHeight: 1,
            }}
          >
            404
          </Typography>

          {/* Main Message */}
          <Typography
            sx={{
              fontSize: { xs: '1.5rem', sm: '2rem' },
              fontWeight: 700,
              color: '#1e293b',
              mb: 2,
            }}
          >
            Oops! Page not found
          </Typography>

          {/* Description */}
          <Typography
            sx={{
              color: '#64748b',
              mb: 4,
              fontSize: '1rem',
              maxWidth: '400px',
              lineHeight: 1.6,
            }}
          >
            The page you are looking for might have been removed or is temporarily unavailable.
          </Typography>

          {/* Back to Home Button */}
          <Button
            onClick={handleGoHome}
            sx={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #7c3aed 100%)',
              color: 'white',
              fontWeight: 700,
              textTransform: 'uppercase',
              fontSize: '0.9rem',
              px: 4,
              py: 1.25,
              borderRadius: '8px',
              transition: 'all 0.3s ease',
              '&:hover': {
                opacity: 0.9,
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 16px rgba(59, 130, 246, 0.4)',
              },
            }}
          >
            ← Back to Home
          </Button>
        </Box>
      </Container>
    </Box>
  );
};