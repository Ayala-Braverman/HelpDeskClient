import { Box, Container, Typography, Divider } from "@mui/material";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#f9fafb',
        borderTop: '1px solid #e2e8f0',
        py: 3,
        mt: 4
      }}
    >
      <Container maxWidth="lg">
        <Divider sx={{ mb: 2 }} />
        <Typography
          variant="body2"
          sx={{
            textAlign: 'center',
            color: '#64748b',
            fontWeight: 500
          }}
        >
          © {year} מערכת ניהול כרטיסים | Helpdesk System
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
