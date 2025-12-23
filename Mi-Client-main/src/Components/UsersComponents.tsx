import React from 'react';
import type { UserDetails } from '../types/user';
import { useUsersQuery } from '../Query/useQuery';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container,
  Box,
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  Chip,
  Grid,
  CircularProgress,
  Divider,
  Avatar,
  Stack,
} from '@mui/material';
import {
  ArrowBack as BackIcon,
} from '@mui/icons-material';

export const GetUserByIdWarpper: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return <GetUserById id={Number(id)} />;
};

export const GetUserById: React.FC<{ id: number }> = ({ id }) => {
  const navigate = useNavigate();
  const { data: users, isLoading, isError } = useUsersQuery();

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !users) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ py: 3 }}>
          <Card sx={{ border: '1px solid #e2e8f0' }}>
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body1" sx={{ color: '#64748b' }}>
                שגיאה בטעינת משתמשים
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Container>
    );
  }

  const user = users.find((u: UserDetails) => u.id === id);

  if (!user) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ py: 3 }}>
          <Button startIcon={<BackIcon />} onClick={() => navigate(-1)} sx={{ mb: 2, color: '#2563eb' }}>
            חזור
          </Button>
          <Card sx={{ border: '1px solid #e2e8f0' }}>
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body1" sx={{ color: '#64748b' }}>
                משתמש לא נמצא
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Container>
    );
  }

  const getRoleColor = (role: string): 'default' | 'primary' | 'error' | 'warning' | 'success' | 'info' => {
    if (role === 'admin') return 'error';
    if (role === 'agent') return 'warning';
    return 'default';
  };

  const getRoleLabel = (role: string): string => {
    const roles: { [key: string]: string } = {
      admin: 'מנהל מערכת',
      agent: 'סוכן תמיכה',
      customer: 'לקוח',
    };
    return roles[role] || 'משתמש';
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 3 }}>
        <Button startIcon={<BackIcon />} onClick={() => navigate(-1)} sx={{ mb: 2, color: '#2563eb' }}>
          חזור
        </Button>

        <Card sx={{ border: '1px solid #e2e8f0' }}>
          <CardHeader
            avatar={
              <Avatar
                sx={{
                  backgroundColor: '#2563eb',
                  width: 56,
                  height: 56,
                  fontSize: '1.5rem',
                }}
              >
                {user.name?.charAt(0).toUpperCase()}
              </Avatar>
            }
            title={
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#1e293b' }}>
                {user.name}
              </Typography>
            }
            subheader={
              <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                <Chip label={getRoleLabel(user.role)} color={getRoleColor(user.role)} size="small" />
              </Stack>
            }
          />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Box sx={{ width: '100%', p: 2 }}>
                <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>
                  דוא״ל
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, color: '#1e293b' }}>
                  {user.email}
                </Typography>
              </Box>

              <Box sx={{ width: '100%', p: 2 }}>
                <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>
                  תפקיד
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, color: '#1e293b' }}>
                  {getRoleLabel(user.role)}
                </Typography>
              </Box>

              <Box sx={{ width: '100%', p: 2 }}>
                <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>
                  מזהה משתמש
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, color: '#1e293b' }}>
                  #{user.id}
                </Typography>
              </Box>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export const ShowUsers: React.FC = () => {
  const navigate = useNavigate();
  const usersQuery = useUsersQuery();
  const users = usersQuery.data || [];

  const getRoleColor = (role: string): 'default' | 'primary' | 'error' | 'warning' | 'success' | 'info' => {
    if (role === 'admin') return 'error';
    if (role === 'agent') return 'warning';
    return 'default';
  };

  const getRoleLabel = (role: string): string => {
    const roles: { [key: string]: string } = {
      admin: 'מנהל מערכת',
      agent: 'סוכן תמיכה',
      customer: 'לקוח',
    };
    return roles[role] || 'משתמש';
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            רשימת משתמשים
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/createUser')}
            sx={{ backgroundColor: '#2563eb', '&:hover': { backgroundColor: '#1e40af' } }}
          >
            + משתמש חדש
          </Button>
        </Box>

        <TableContainer component={Card} sx={{ border: '1px solid #e2e8f0' }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f3f4f6' }}>
                <TableCell sx={{ fontWeight: 700, color: '#374151' }}>שם</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#374151' }}>דוא״ל</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#374151' }}>תפקיד</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#374151' }} align="right">
                  פעולות
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user: UserDetails) => (
                <TableRow
                  key={user.id}
                  sx={{
                    '&:hover': { backgroundColor: '#f9fafb' },
                    cursor: 'pointer',
                  }}
                  onClick={() => navigate(`/user/${user.id}`)}
                >
                  <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar sx={{ backgroundColor: '#2563eb', width: 32, height: 32, fontSize: '0.75rem' }}>
                        {user.name?.charAt(0).toUpperCase()}
                      </Avatar>
                      {user.name}
                    </Box>
                  </TableCell>
                  <TableCell sx={{ color: '#374151' }}>{user.email}</TableCell>
                  <TableCell>
                    <Chip label={getRoleLabel(user.role)} color={getRoleColor(user.role)} variant="filled" size="small" />
                  </TableCell>
                  <TableCell align="right">
                    <Button size="small" variant="outlined" onClick={(e) => { e.stopPropagation(); navigate(`/user/${user.id}`); }}>
                      צפה
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {users.length === 0 && (
          <Card sx={{ border: '1px solid #e2e8f0', mt: 3 }}>
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body1" sx={{ color: '#64748b' }}>
                אין משתמשים זמינים
              </Typography>
            </CardContent>
          </Card>
        )}
      </Box>
    </Container>
  );
};