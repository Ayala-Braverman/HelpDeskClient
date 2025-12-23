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

const AdminDashboard: React.FC = () => {
  const user = localStorage.getItem("user");
  const user1 = user ? JSON.parse(user) : null;
  const navigate = useNavigate();

  const adminActions = [
    {
      id: 1,
      label: "כל הפניות",
      description: "ניהול וצפייה בכל הפניות במערכת",
      icon: <TicketsIcon sx={{ fontSize: 40, color: "#2563eb" }} />,
      onClick: () => navigate("/tickets"),
    },
    {
      id: 2,
      label: "ניהול משתמשים",
      description: "הוסף, ערוך או מחק משתמשים",
      icon: <UsersIcon sx={{ fontSize: 40, color: "#2563eb" }} />,
      onClick: () => navigate("/users"),
    },
    {
      id: 3,
      label: "ניהול סטטוסים",
      description: "הגדר סטטוסים לפניות",
      icon: <StatusIcon sx={{ fontSize: 40, color: "#2563eb" }} />,
      onClick: () => navigate("/createStatus"),
    },
    {
      id: 4,
      label: "ניהול עדיפויות",
      description: "הגדר רמות עדיפות לפניות",
      icon: <PriorityIcon sx={{ fontSize: 40, color: "#2563eb" }} />,
      onClick: () => navigate("/createPriority"),
    },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        {/* Welcome Card */}
        <Card
          sx={{
            mb: 4,
            background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
            border: "1px solid #bae6fd",
          }}
        >
          <CardContent sx={{ p: 3, textAlign: "center" }}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
              <Typography variant="h4" sx={{ fontWeight: 700, color: "#1e293b" }}>
                {user1 ? `!ברוך הבא, ${user1.name}` : "!ברוך הבא, מנהל"}
              </Typography>
              <Typography variant="body1" sx={{ color: "#64748b" }}>
                תפקידך: {user1?.role === "admin" ? "מנהל מערכת" : "משתמש"}
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Admin Panel Section */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5, color: "#1e293b" }}>
            חדר בקרה למנהלים
          </Typography>
          <Typography variant="body2" sx={{ color: "#64748b", mb: 3 }}>
            ניהול משתמשים והגדרות מערכת כאן
          </Typography>
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

        {/* Quick Actions */}
        <Card sx={{ border: "1px solid #e2e8f0" }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: "#1e293b" }}>
              פעולות מהירות
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
                + יצירת משתמש חדש
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate("/createPriority")}
                sx={{
                  borderColor: "#e2e8f0",
                  color: "#1e293b",
                  "&:hover": { borderColor: "#2563eb", backgroundColor: "#f0f9ff" },
                }}
              >
                + הוספת עדיפות
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate("/createStatus")}
                sx={{
                  borderColor: "#e2e8f0",
                  color: "#1e293b",
                  "&:hover": { borderColor: "#2563eb", backgroundColor: "#f0f9ff" },
                }}
              >
                + הוספת סטטוס
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default AdminDashboard;