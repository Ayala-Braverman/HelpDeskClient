import React, { useState } from 'react';
import type { UserDetails } from '../types/user';
import { useUsersQuery } from '../Query/useQuery';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container,
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Avatar,
  Stack,
  Paper,
  TextField,
} from '@mui/material';
import {
  ArrowBack as BackIcon,
  Edit as EditIcon,
  Mail as MailIcon,
  Badge as BadgeIcon,
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
                Error loading users
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
            Back
          </Button>
          <Card sx={{ border: '1px solid #e2e8f0' }}>
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body1" sx={{ color: '#64748b' }}>
                User not found
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
      admin: 'System Administrator',
      agent: 'Support Agent',
      customer: 'Customer',
    };
    return roles[role] || 'User';
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ py: 3 }}>
        <Button startIcon={<BackIcon />} onClick={() => navigate(-1)} sx={{ mb: 3, color: '#2563eb' }}>
          Back
        </Button>

        <Card
          sx={{
            border: 'none',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
          }}
        >
          {/* Header Background */}
          <Box
            sx={{
              height: '80px',
              background: 'linear-gradient(135deg, #2563eb 0%, #10b981 100%)',
            }}
          />

          {/* Main Content */}
          <CardContent
            sx={{
              p: 2.5,
              mt: -4,
              position: 'relative',
            }}
          >
            {/* Avatar Section */}
            <Box sx={{ textAlign: 'center', mb: 2.5 }}>
              <Avatar
                sx={{
                  background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
                  width: 90,
                  height: 90,
                  fontSize: '2.2rem',
                  fontWeight: 700,
                  margin: '0 auto',
                  boxShadow: '0 10px 30px rgba(37, 99, 235, 0.3)',
                  mb: 1.5,
                }}
              >
                {user.name?.charAt(0).toUpperCase()}
              </Avatar>

              {/* Name and Role */}
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  color: '#1e293b',
                  mb: 0.8,
                }}
              >
                {user.name}
              </Typography>

              <Stack
                direction="row"
                spacing={1}
                sx={{
                  justifyContent: 'center',
                }}
              >
                <Chip
                  label={getRoleLabel(user.role)}
                  color={getRoleColor(user.role)}
                  size="small"
                  sx={{
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    height: '30px',
                    px: 1,
                  }}
                />
              </Stack>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Details Grid */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                gap: 4,
              }}
            >
              {/* Email */}
              <Box
                sx={{
                  backgroundColor: '#f9fafb',
                  borderRadius: '12px',
                  p: 3,
                  borderLeft: '4px solid #2563eb',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <MailIcon sx={{ color: '#2563eb', fontSize: '1.3rem' }} />
                  <Typography
                    variant="caption"
                    sx={{
                      color: '#64748b',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      fontSize: '0.75rem',
                      letterSpacing: '0.5px',
                    }}
                  >
                    Email
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  sx={{
                    color: '#1e293b',
                    fontWeight: 500,
                    ml: 3.5,
                    wordBreak: 'break-word',
                  }}
                >
                  {user.email}
                </Typography>
              </Box>

              {/* ID */}
              <Box
                sx={{
                  backgroundColor: '#f9fafb',
                  borderRadius: '12px',
                  p: 3,
                  borderLeft: '4px solid #2563eb',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <BadgeIcon sx={{ color: '#2563eb', fontSize: '1.3rem' }} />
                  <Typography
                    variant="caption"
                    sx={{
                      color: '#64748b',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      fontSize: '0.75rem',
                      letterSpacing: '0.5px',
                    }}
                  >
                    User ID
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  sx={{
                    color: '#1e293b',
                    fontWeight: 600,
                    ml: 3.5,
                    fontSize: '1.1rem',
                  }}
                >
                  #{user.id}
                </Typography>
              </Box>

              {/* Role */}
              <Box
                sx={{
                  backgroundColor: '#f9fafb',
                  borderRadius: '12px',
                  p: 3,
                  borderLeft: '4px solid #2563eb',
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: '#64748b',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    fontSize: '0.75rem',
                    letterSpacing: '0.5px',
                  }}
                >
                  Role
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: '#1e293b',
                    fontWeight: 500,
                    mt: 1,
                  }}
                >
                  {getRoleLabel(user.role)}
                </Typography>
              </Box>
            </Box>
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
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filter users based on search query
  const filteredUsers = users.filter((user: UserDetails) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      user.name.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower) ||
      user.id.toString().includes(searchQuery)
    );
  });

  const getRoleColor = (role: string): 'default' | 'primary' | 'error' | 'warning' | 'success' | 'info' => {
    if (role === 'admin') return 'error';
    if (role === 'agent') return 'warning';
    return 'default';
  };

  const getRoleLabel = (role: string): string => {
    const roles: { [key: string]: string } = {
      admin: 'System Administrator',
      agent: 'Support Agent',
      customer: 'Customer',
    };
    return roles[role] || 'User';
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            User List
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/createUser')}
            sx={{ backgroundColor: '#2563eb', '&:hover': { backgroundColor: '#1e40af' } }}
          >
            + New User
          </Button>
        </Box>

        {/* Search Bar */}
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            placeholder="Search by name, email, or user ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            variant="outlined"
            size="small"
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: '#2563eb',
                },
              },
            }}
          />
        </Box>

        {filteredUsers.length === 0 ? (
          <Card sx={{ border: '1px solid #e2e8f0' }}>
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body1" sx={{ color: '#64748b' }}>
                {searchQuery ? 'No users match your search' : 'No users available'}
              </Typography>
            </CardContent>
          </Card>
        ) : (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
              },
              gap: 3,
              direction: 'rtl',
            }}
          >
            {users.map((user: UserDetails) => (
              <Box key={user.id}>
                <Paper
                  elevation={0}
                  sx={{
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    height: '100%',
                    minHeight: '420px',
                    display: 'flex',
                    flexDirection: 'column',
                    '&:hover': {
                      boxShadow: '0 10px 25px rgba(37, 99, 235, 0.1)',
                      borderColor: '#2563eb',
                      transform: 'translateY(-4px)',
                    },
                  }}
                  onClick={() => navigate(`/user/${user.id}`)}
                >
                  {/* Header Background */}
                  <Box
                    sx={{
                      height: '8px',
                      background: 'linear-gradient(90deg, #2563eb 0%, #10b981 100%)',
                    }}
                  />

                  <CardContent sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column' }}>
                    {/* Avatar and Name */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                      <Avatar
                        sx={{
                          background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
                          width: 56,
                          height: 56,
                          fontSize: '1.5rem',
                          fontWeight: 700,
                          boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
                        }}
                      >
                        {user.name?.charAt(0).toUpperCase()}
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                            color: '#1e293b',
                            marginBottom: '4px',
                          }}
                        >
                          {user.name}
                        </Typography>
                        <Chip
                          label={getRoleLabel(user.role)}
                          color={getRoleColor(user.role)}
                          size="small"
                          variant="filled"
                          sx={{ fontWeight: 600 }}
                        />
                      </Box>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    {/* Email */}
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 2 }}>
                      <MailIcon
                        sx={{
                          color: '#10b981',
                          fontSize: '1.2rem',
                          mt: 0.5,
                          flexShrink: 0,
                        }}
                      />
                      <Box>
                        <Typography
                          variant="caption"
                          sx={{
                            color: '#64748b',
                            fontWeight: 600,
                            display: 'block',
                            mb: 0.5,
                          }}
                        >
                          Email
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: '#1e293b',
                            wordBreak: 'break-word',
                          }}
                        >
                          {user.email}
                        </Typography>
                      </Box>
                    </Box>

                    {/* ID */}
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 3 }}>
                      <BadgeIcon
                        sx={{
                          color: '#10b981',
                          fontSize: '1.2rem',
                          flexShrink: 0,
                        }}
                      />
                      <Box>
                        <Typography
                          variant="caption"
                          sx={{
                            color: '#64748b',
                            fontWeight: 600,
                            display: 'block',
                            mb: 0.5,
                          }}
                        >
                          ID
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: '#1e293b',
                            fontWeight: 600,
                          }}
                        >
                          #{user.id}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Action Buttons */}
                    <Stack direction="row" spacing={1} sx={{ pt: 2, mt: 'auto' }}>
                      <Button
                        fullWidth
                        variant="contained"
                        size="small"
                        startIcon={<EditIcon />}
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/user/${user.id}`);
                        }}
                        sx={{
                          backgroundColor: '#2563eb',
                          '&:hover': { backgroundColor: '#1e40af' },
                          fontWeight: 600,
                        }}
                      >
                        View
                      </Button>
                    </Stack>
                  </CardContent>
                </Paper>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Container>
  );
};