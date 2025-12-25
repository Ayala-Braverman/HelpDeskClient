import React, {  useEffect, useState } from 'react';
import type { Ticket, TicketById } from '../types/ticket';
import { useTicketsQuery, usePriorityQuery, useStatusQuery } from '../Query/useQuery';
import { useNavigate, useParams } from 'react-router-dom';
import { getTicketById } from '../services/Tickets/TicketFunctions';
import { ShowComments } from './CommentsComponents';
import { AddComment } from '../services/Comments/commentsFunctions';
import {
  Container,
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
  Chip,
  Stack,
  CircularProgress,
  Divider,
  Paper,
  TextField,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  ArrowBack as BackIcon,
  Description as DescriptionIcon,
  Person as PersonIcon,
  Assignment as AssignmentIcon,
  CalendarToday as CalendarIcon,
  Update as UpdateIcon,
} from '@mui/icons-material';
import { useUserContext } from '../Context/userContext';
import type { UserDetails } from '../types/user';

export const ShowTickets: React.FC = () => {
  const ticketsQuery = useTicketsQuery();
  const prioritiesQuery = usePriorityQuery();
  const statusesQuery = useStatusQuery();
  const ticketsArray = (ticketsQuery.data as Ticket[]) || [];
  const navigate = useNavigate();
  let { user } = useUserContext();
  const userDetails = user?.userDetails;
  const [selectedStatus, setSelectedStatus] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const statusesData = (Array.isArray(statusesQuery.data) ? statusesQuery.data : []) as any[];
  
  // Filter tickets based on selected status and search query
  const filteredTickets = ticketsArray.filter(ticket => {
    const matchesStatus = selectedStatus === null || ticket.status_id === selectedStatus;
    const matchesSearch = searchQuery === '' || 
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.id.toString().includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (statusId: number): 'default' | 'primary' | 'success' | 'error' | 'warning' => {
    if (statusId === 1) return 'primary';
    if (statusId === 2) return 'success';
    if (statusId === 3) return 'error';
    return 'default';
  };

  const getStatusLabel = (statusId: number): string => {
    const statusesData = (Array.isArray(statusesQuery.data) ? statusesQuery.data : []) as any[];
    const status = statusesData.find((s: any) => s.id === statusId);
    return status?.name || 'Unknown';
  };

  const getPriorityColor = (priorityId: number): 'error' | 'warning' | 'info' | 'success' => {
    const prioritiesData = (Array.isArray(prioritiesQuery.data) ? prioritiesQuery.data : []) as any[];
    const priorityIndex = prioritiesData.findIndex((p: any) => p.id === priorityId);
    
    if (priorityIndex === 0) return 'error';      // First priority = highest (red)
    if (priorityIndex === 1) return 'warning';    // Middle priority (orange)
    if (priorityIndex === 2) return 'info';       // Lower priority (blue)
    return 'success';                              // Default (green)
  };

  const getPriorityLabel = (priorityId: number): string => {
    const prioritiesData = (Array.isArray(prioritiesQuery.data) ? prioritiesQuery.data : []) as any[];
    const priority = prioritiesData.find((p: any) => p.id === priorityId);
    return priority?.name || 'לא ידוע';
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            All Tickets
          </Typography>
          {userDetails?.role == 'user' && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate('/ticket/new')}
              sx={{ backgroundColor: '#2563eb', '&:hover': { backgroundColor: '#1e40af' } }}
            >
              New Ticket
            </Button>
          )}
        </Box>

        {/* Search Bar */}
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            placeholder="Search by ticket ID, subject, or description..."
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

        {/* Status Filter Buttons */}
        <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap', alignItems: 'center' }}>
          <Button
            variant={selectedStatus === null ? 'contained' : 'outlined'}
            onClick={() => setSelectedStatus(null)}
            sx={{
              backgroundColor: selectedStatus === null ? '#2563eb' : 'transparent',
              color: selectedStatus === null ? 'white' : '#2563eb',
              borderColor: '#2563eb',
              '&:hover': {
                backgroundColor: selectedStatus === null ? '#1e40af' : '#f0f4ff',
              },
            }}
          >
            All Statuses
          </Button>
          {statusesData.map((status: any) => (
            <Button
              key={status.id}
              variant={selectedStatus === status.id ? 'contained' : 'outlined'}
              onClick={() => setSelectedStatus(status.id)}
              sx={{
                backgroundColor: selectedStatus === status.id ? '#2563eb' : 'transparent',
                color: selectedStatus === status.id ? 'white' : '#2563eb',
                borderColor: '#2563eb',
                '&:hover': {
                  backgroundColor: selectedStatus === status.id ? '#1e40af' : '#f0f4ff',
                },
                textTransform: 'uppercase',
                fontWeight: 600,
              }}
            >
              {status.name}
            </Button>
          ))}
        </Box>

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
          {filteredTickets.map((ticket: Ticket) => (
            <Box key={ticket.id}>
              <Paper
                elevation={0}
                sx={{
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  height: '100%',
                  minHeight: '380px',
                  display: 'flex',
                  flexDirection: 'column',
                  '&:hover': {
                    boxShadow: '0 10px 25px rgba(37, 99, 235, 0.1)',
                    borderColor: '#10b981',
                    transform: 'translateY(-4px)',
                  },
                }}
                onClick={() => navigate(`/ticket/${ticket.id}`)}
              >
                {/* Header Background */}
                <Box
                  sx={{
                    height: '8px',
                    background: 'linear-gradient(90deg, #2563eb 0%, #10b981 100%)',
                  }}
                />

                <CardContent sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column' }}>
                  {/* ID and Title */}
                  <Box sx={{ mb: 2 }}>
                    <Typography
                      variant="caption"
                      sx={{
                        color: '#2563eb',
                        fontWeight: 700,
                        fontSize: '0.75rem',
                      }}
                    >
                      ticket #{ticket.id}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: '#1e293b',
                        marginTop: '4px',
                        lineHeight: 1.3,
                      }}
                    >
                      {ticket.subject}
                    </Typography>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  {/* Status */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                    <AssignmentIcon
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
                        Status
                      </Typography>
                      <Chip
                        label={getStatusLabel(ticket.status_id)}
                        color={getStatusColor(ticket.status_id)}
                        variant="filled"
                        size="small"
                        sx={{ fontWeight: 600 }}
                      />
                    </Box>
                  </Box>

                  {/* Priority */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                    <UpdateIcon
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
                        Priority
                      </Typography>
                      <Chip
                        label={getPriorityLabel(ticket.priority_id)}
                        color={getPriorityColor(ticket.priority_id)}
                        variant="filled"
                        size="small"
                        sx={{ fontWeight: 600 }}
                      />
                    </Box>
                  </Box>

                  {/* Created Date */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: 'auto' }}>
                    <CalendarIcon
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
                        Creation Date
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: '#1e293b',
                        }}
                      >
                        {new Date(ticket.created_at).toLocaleDateString('en-US')}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Paper>
            </Box>
          ))}
        </Box>

        {filteredTickets.length === 0 && (
          <Card sx={{ border: '1px solid #e2e8f0', mt: 3 }}>
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body1" sx={{ color: '#64748b' }}>
                {selectedStatus === null ? 'No tickets available' : 'No tickets with this status'}
              </Typography>
            </CardContent>
          </Card>
        )}
      </Box>
    </Container>
  );
};

export const GetTicketByIdWrapper: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return <GetTicketById id={Number(id)} />;
};

export const GetTicketById: React.FC<{ id: number }> = ({ id }) => {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const userDetails = user?.userDetails as UserDetails | undefined;
  const token = user?.token;
  const prioritiesQuery = usePriorityQuery();
  const statusesQuery = useStatusQuery();
  const [ticket, setTicket] = useState<TicketById | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTicketById(id, token)
      .then((t) => {
        setTicket(t ?? null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id, token]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!ticket) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ py: 3 }}>
          <Card sx={{ border: '1px solid #e2e8f0' }}>
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body1" sx={{ color: '#64748b' }}>
                Ticket not found
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Container>
    );
  }

  const getStatusLabel = (statusId: number): string => {
    const statusesData = (Array.isArray(statusesQuery.data) ? statusesQuery.data : []) as any[];
    const status = statusesData.find((s: any) => s.id === statusId);
    return status?.name || 'Unknown';
  };

  const getStatusColor = (statusId: number): 'default' | 'primary' | 'success' | 'error' | 'warning' => {
    if (statusId === 1) return 'primary';
    if (statusId === 2) return 'success';
    if (statusId === 3) return 'error';
    return 'default';
  };

  const getPriorityLabel = (priorityId: number): string => {
    const prioritiesData = (Array.isArray(prioritiesQuery.data) ? prioritiesQuery.data : []) as any[];
    const priority = prioritiesData.find((p: any) => p.id === priorityId);
    return priority?.name || 'Unknown';
  };

  const getPriorityColor = (priorityId: number): 'error' | 'warning' | 'info' | 'success' => {
    const prioritiesData = (Array.isArray(prioritiesQuery.data) ? prioritiesQuery.data : []) as any[];
    const priorityIndex = prioritiesData.findIndex((p: any) => p.id === priorityId);
    
    if (priorityIndex === 0) return 'error';      // First priority = highest (red)
    if (priorityIndex === 1) return 'warning';    // Middle priority (orange)
    if (priorityIndex === 2) return 'info';       // Lower priority (blue)
    return 'success';                              // Default (green)
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 3 }}>
        {/* Back Button */}
        <Button
          startIcon={<BackIcon />}
          onClick={() => navigate(-1)}
          sx={{ mb: 2, color: '#2563eb' }}
        >
          Back
        </Button>

        {/* Ticket Header */}
        <Card sx={{ mb: 3, border: '1px solid #e2e8f0' }}>
          <CardHeader
            title={
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 800, color: '#1e293b', mb: 1 }}>
                  {ticket.subject}
                </Typography>
                <Typography variant="body1" sx={{ color: '#64748b', fontWeight: 500 }}>
                  Ticket Number: #{ticket.id}
                </Typography>
              </Box>
            }
            action={
              <Stack direction="row" spacing={1}>
                <Chip label={getStatusLabel(ticket.status_id)} color={getStatusColor(ticket.status_id)} />
                <Chip label={getPriorityLabel(ticket.priority_id)} color={getPriorityColor(ticket.priority_id)} />
              </Stack>
            }
            sx={{ pb: 2, textAlign: 'center' }}
          />
          <Divider />
          <CardContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Description Section */}
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <DescriptionIcon sx={{ color: '#10b981', fontSize: '1.5rem' }} />
                  <Typography variant="h6" sx={{ color: '#1e293b', fontWeight: 700 }}>
                    Description
                  </Typography>
                </Box>
                <Box sx={{ 
                  backgroundColor: '#f9fafb',
                  borderRadius: '8px',
                  p: 2,
                  borderLeft: '4px solid #10b981',
                  minHeight: '100px',
                }}>
                  <Typography variant="body1" sx={{ color: '#374151', lineHeight: 1.8, fontSize: '0.95rem' }}>
                    {ticket.description}
                  </Typography>
                </Box>
              </Box>

              {/* Details Section */}
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <AssignmentIcon sx={{ color: '#10b981', fontSize: '1.5rem' }} />
                  <Typography variant="h6" sx={{ color: '#1e293b', fontWeight: 700 }}>
                    Ticket Details
                  </Typography>
                </Box>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                  {/* Created By */}
                  <Box sx={{ 
                    backgroundColor: '#f9fafb',
                    borderRadius: '8px',
                    p: 1.5,
                    borderLeft: '4px solid #10b981'
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                      <PersonIcon sx={{ color: '#64748b', fontSize: '1.2rem' }} />
                      <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>
                        Created By
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: '#1e293b', fontWeight: 500, ml: 3.5 }}>
                      {ticket.created_by_name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#94a3b8', ml: 3.5 }}>
                      {ticket.created_by_email}
                    </Typography>
                  </Box>

                  {/* Assigned To */}
                  <Box sx={{ 
                    backgroundColor: '#f9fafb',
                    borderRadius: '8px',
                    p: 1.5,
                    borderLeft: '4px solid #2563eb'
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                      <AssignmentIcon sx={{ color: '#64748b', fontSize: '1.2rem' }} />
                      <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>
                        Assigned To
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: '#1e293b', fontWeight: 500, ml: 3.5 }}>
                      {ticket.assigned_to_name ? ticket.assigned_to_name : 'Not Assigned'}
                    </Typography>
                  </Box>

                  {/* Creation Date */}
                  <Box sx={{ 
                    backgroundColor: '#f9fafb',
                    borderRadius: '8px',
                    p: 1.5,
                    borderLeft: '4px solid #2563eb'
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                      <CalendarIcon sx={{ color: '#64748b', fontSize: '1.2rem' }} />
                      <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>
                        Creation Date
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: '#1e293b', fontWeight: 500, ml: 3.5 }}>
                      {new Date(ticket.created_at).toLocaleDateString('en-US')}
                    </Typography>
                  </Box>

                  {/* Last Update */}
                  <Box sx={{ 
                    backgroundColor: '#f9fafb',
                    borderRadius: '8px',
                    p: 1.5,
                    borderLeft: '4px solid #10b981'
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                      <UpdateIcon sx={{ color: '#64748b', fontSize: '1.2rem' }} />
                      <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>
                        Last Update
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: '#1e293b', fontWeight: 500, ml: 3.5 }}>
                      {ticket.updated_at ? new Date(ticket.updated_at).toLocaleDateString('en-US') : 'Not Updated'}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Comments Section */}
        {(
          <Card sx={{ mb: 3, border: '1px solid #e2e8f0' }}>
            <CardHeader
              title={
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b' }}>
                  Comments ({ticket.comments.length})
                </Typography>
              }
            />
            <Divider />
            <CardContent>
              <ShowComments id={ticket.id} />
            </CardContent>
          </Card>
        )}

        {/* Add Comment */}
        <Card sx={{ mb: 3, border: '1px solid #e2e8f0' }}>
          <CardHeader
            title={
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b' }}>
                Add Comment
              </Typography>
            }
          />
          <Divider />
          <CardContent>
            <AddComment ticketId={ticket.id} />
          </CardContent>
        </Card>

        {/* Action Buttons */}
        {userDetails?.role !== 'customer' && (
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              onClick={() =>
                navigate(`/ticket/update/${ticket.id}`, {
                  state: {
                    status_id: ticket.status_id,
                    priority_id: ticket.priority_id,
                    assigned_to: ticket.assigned_to,
                    subject: ticket.subject,
                    description: ticket.description,
                  },
                })
              }
              sx={{ backgroundColor: '#2563eb', '&:hover': { backgroundColor: '#1e40af' } }}
            >
              Update Ticket
            </Button>
            {userDetails?.role === 'admin' && (
              <Button
                variant="outlined"
                startIcon={<DeleteIcon />}
                color="error"
                onClick={() => navigate(`/deleteTicket/${ticket.id}`)}
              >
                Delete Ticket
              </Button>
            )}
          </Stack>
        )}
      </Box>
    </Container>
  );
};