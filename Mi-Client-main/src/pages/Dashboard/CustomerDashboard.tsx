import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import {
  Description as TicketsIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import { DashboardCharts } from "../../Components/DashboardCharts";
import { useUserContext } from "../../Context/userContext";

const CustomerDashboard: React.FC = () => {
  const { user } = useUserContext();
  const user1 = user?.userDetails ;
  const navigate = useNavigate();

  const customerActions = [
    {
      id: 1,
      label: "New Ticket",
      description: "Create a new support ticket",
      icon: <AddIcon sx={{ fontSize: 40, color: "#2563eb" }} />,
      onClick: () => navigate("/ticket/new"),
      variant: "contained" as const,
    },
    {
      id: 2,
      label: "My Tickets",
      description: "View all your tickets",
      icon: <TicketsIcon sx={{ fontSize: 40, color: "#2563eb" }} />,
      onClick: () => navigate("/tickets"),
      variant: "outlined" as const,
    },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 6 }}>
        {/* Welcome Section */}
        <Box sx={{ mb: 8, textAlign: 'center' }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5, alignItems: 'center' }}>
            {/* Main Title */}
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0.5, flexWrap: 'wrap' }}>
              <Typography
                sx={{ 
                  fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
                  fontWeight: 700,
                  background: "linear-gradient(135deg, #2563eb 0%, #10b981 100%)",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em'
                }}
              >
                {user1 ? `Welcome, ${user1.name}` : "Welcome"}
              </Typography>
            </Box>
            <Typography 
              variant="body1" 
              sx={{ 
                color: "#64748b", 
                fontWeight: 500
              }}
            >
              Create a new ticket and get help within minutes.
            </Typography>
          </Box>
        </Box>

        {/* Getting Started */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5, color: "#1e293b" }}>
            Let's Get Started
          </Typography>
          <Typography variant="body2" sx={{ color: "#64748b", mb: 3 }}>
            Choose what you'd like to do today
          </Typography>
        </Box>

        {/* Action Cards Grid */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mb: 4 }}>
          {customerActions.map((action) => (
            <Box key={action.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  cursor: "pointer",
                  border: "1px solid #e2e8f0",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    transform: "translateY(-4px)",
                    borderColor: "#2563eb",
                  },
                }}
                onClick={action.onClick}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    p: 3,
                    textAlign: "center",
                    flex: 1,
                  }}
                >
                  <Box sx={{ mb: 2 }}>{action.icon}</Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: "#1e293b" }}>
                    {action.label}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#64748b" }}>
                    {action.description}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>

        {/* Charts Section */}
        <DashboardCharts />

        {/* Info Card */}
        <Card sx={{ border: "1px solid #e2e8f0", backgroundColor: "#f8fafc" }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: "#1e293b" }}>
              💡 Tips
            </Typography>
            <Typography variant="body2" sx={{ color: "#64748b", lineHeight: 1.8 }}>
              • You can view the status of your tickets at any time
              <br />
              • Our team will respond to you as quickly as possible
              <br />• You will receive updates via email
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default CustomerDashboard;