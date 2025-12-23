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

const CustomerDashboard: React.FC = () => {
  const user = localStorage.getItem("user");
  const user1 = user ? JSON.parse(user) : null;
  const navigate = useNavigate();

  const customerActions = [
    {
      id: 1,
      label: "פנייה חדשה",
      description: "צור פנייה חדשה לתמיכה",
      icon: <AddIcon sx={{ fontSize: 40, color: "#2563eb" }} />,
      onClick: () => navigate("/ticket/new"),
      variant: "contained" as const,
    },
    {
      id: 2,
      label: "הפניות שלי",
      description: "צפה בכל הפניות שלך",
      icon: <TicketsIcon sx={{ fontSize: 40, color: "#2563eb" }} />,
      onClick: () => navigate("/tickets"),
      variant: "outlined" as const,
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
                {user1 ? `!ברוך הבא, ${user1.name}` : "!ברוך הבא"}
              </Typography>
              <Typography variant="body1" sx={{ color: "#64748b" }}>
                אנחנו כאן כדי לעזור לך
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Getting Started */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5, color: "#1e293b" }}>
            בואו נתחיל
          </Typography>
          <Typography variant="body2" sx={{ color: "#64748b", mb: 3 }}>
            בחר את מה שתרצה לעשות היום
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
              💡 טיפים
            </Typography>
            <Typography variant="body2" sx={{ color: "#64748b", lineHeight: 1.8 }}>
              • אתה יכול לצפות בסטטוס של הפניות שלך בכל עת
              <br />
              • הצוות שלנו ישיב לך במהירות האפשרית
              <br />• אתה תקבל עדכוניות דרך דוא״ל
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default CustomerDashboard;