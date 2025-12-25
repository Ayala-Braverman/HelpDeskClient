import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Card,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import {
  Description as TicketsIcon,
  People as UsersIcon,
  CheckCircle as StatusIcon,
  Flag as PriorityIcon,
} from "@mui/icons-material";
import { DashboardCharts } from "../../Components/DashboardCharts";
import { useUserContext } from "../../Context/userContext";

const AdminDashboard: React.FC = () => {
  const { user } = useUserContext();
  const user1 = user?.userDetails ;
  const navigate = useNavigate();

  const adminActions = [
    {
      id: 1,
      label: "All Tickets",
      description: "Manage and view all tickets in the system",
      icon: <TicketsIcon sx={{ fontSize: 40, color: "#2563eb" }} />,
      onClick: () => navigate("/tickets"),
    },
    {
      id: 2,
      label: "User Management",
      description: "Add, edit or delete users",
      icon: <UsersIcon sx={{ fontSize: 40, color: "#2563eb" }} />,
      onClick: () => navigate("/users"),
    },
    {
      id: 3,
      label: "Manage Statuses",
      description: "Set statuses for tickets",
      icon: <StatusIcon sx={{ fontSize: 40, color: "#10b981" }} />,
      onClick: () => navigate("/manage/statuses"),
    },
    {
      id: 4,
      label: "Manage Priorities",
      description: "Set priority levels for tickets",
      icon: <PriorityIcon sx={{ fontSize: 40, color: "#10b981" }} />,
      onClick: () => navigate("/manage/priorities"),
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
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em'
                }}
              >
                {user1 ? `Welcome, ${user1.name}` : "Welcome, Admin"}
              </Typography>
            
            </Box>
            <Typography 
              variant="body1" 
              sx={{ 
                color: "#64748b", 
                fontWeight: 500
              }}
            >
              Create, edit and handle tickets easily. Smooth and efficient support process with just one click.
            </Typography>
          </Box>
        </Box>

        {/* Action Cards Grid */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mb: 4 }}>
          {adminActions.map((action) => (
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

        {/* Quick Actions */}
        <Card sx={{ border: "1px solid #e2e8f0" }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: "#1e293b" }}>
              Quick Actions
            </Typography>
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <Button
                variant="contained"
                onClick={() => navigate("/createUser")}
                sx={{
                  backgroundColor: "#2563eb",
                  "&:hover": { backgroundColor: "#1e40af" },
                }}
              >
                + Create New User
              </Button>
                <Button
                variant="contained"
                onClick={() => navigate("/createPriority")}
                sx={{
                  backgroundColor: "#2563eb",
                  "&:hover": { backgroundColor: "#1e40af" },
                }}
              >
                + Create New Priority
              </Button>
              <Button
                variant="contained"
                onClick={() => navigate("/createStatus")}
                sx={{
                  backgroundColor: "#2563eb",
                  "&:hover": { backgroundColor: "#1e40af" },
                }}
              >
                + Create New Status
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default AdminDashboard;