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
} from "@mui/icons-material";

const AgentDashboard: React.FC = () => {
  const user = localStorage.getItem("user");
  const user1 = user ? JSON.parse(user) : null;
  const navigate = useNavigate();

  const agentActions = [
    {
      id: 1,
      label: "הפניות שלי",
      description: "צפה בפניות המשויכות אליך",
      icon: <TicketsIcon sx={{ fontSize: 40, color: "#2563eb" }} />,
      onClick: () => navigate("/tickets"),
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
                {user1 ? `!ברוך הבא, ${user1.name}` : "!ברוך הבא, סוכן"}
              </Typography>
              <Typography variant="body1" sx={{ color: "#64748b" }}>
                תפקידך: {user1?.role === "agent" ? "סוכן תמיכה" : "משתמש"}
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Your Tasks */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5, color: "#1e293b" }}>
            המשימות שלך
          </Typography>
          <Typography variant="body2" sx={{ color: "#64748b", mb: 3 }}>
            בדוק את הפניות המשויכות אליך וטפל בהן
          </Typography>
        </Box>

        {/* Action Cards Grid */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mb: 4 }}>
          {agentActions.map((action) => (
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

        {/* Info Card */}
        <Card sx={{ mt: 4, border: "1px solid #e2e8f0", backgroundColor: "#f8fafc" }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: "#1e293b" }}>
              📋 עזרה
            </Typography>
            <Typography variant="body2" sx={{ color: "#64748b", lineHeight: 1.8 }}>
              • עדכנו כל פנייה עם אחרון הידע
              <br />
              • התאמ סטטוס של הפנייה בעת טיפול בה
              <br />
              • הוסיפו הערות כדי לעדכן את הלקוח
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default AgentDashboard;