import React, { useEffect, useState } from 'react';
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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  Chip,
  Stack,
  CircularProgress,
  Divider,
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

export const ShowTickets: React.FC = () => {
  const ticketsQuery = useTicketsQuery();
  const prioritiesQuery = usePriorityQuery();
  const statusesQuery = useStatusQuery();
  const ticketsArray = (ticketsQuery.data as Ticket[]) || [];
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const getStatusColor = (statusId: number): 'default' | 'primary' | 'success' | 'error' | 'warning' => {
    if (statusId === 1) return 'primary';
    if (statusId === 2) return 'success';
    if (statusId === 3) return 'error';
    return 'default';
  };

  const getStatusLabel = (statusId: number): string => {
    const statusesData = (Array.isArray(statusesQuery.data) ? statusesQuery.data : []) as any[];
    const status = statusesData.find((s: any) => s.id === statusId);
    return status?.name || 'לא ידוע';
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
            כל הפניות
          </Typography>
          {user.role !== 'admin' && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate('/ticket/new')}
              sx={{ backgroundColor: '#2563eb', '&:hover': { backgroundColor: '#1e40af' } }}
            >
              פנייה חדשה
            </Button>
          )}
        </Box>

        <TableContainer component={Card} sx={{ border: '1px solid #e2e8f0' }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f3f4f6' }}>
                <TableCell sx={{ fontWeight: 700, color: '#374151' }}>מספר</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#374151' }}>נושא</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#374151' }}>סטטוס</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#374151' }}>עדיפות</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#374151' }} align="right">
                  פעולות
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ticketsArray.map((ticket) => (
                <TableRow
                  key={ticket.id}
                  sx={{
                    '&:hover': { backgroundColor: '#f9fafb' },
                    cursor: 'pointer',
                  }}
                  onClick={() => navigate(`/ticket/${ticket.id}`)}
                >
                  <TableCell sx={{ fontWeight: 600, color: '#2563eb' }}>#{ticket.id}</TableCell>
                  <TableCell sx={{ color: '#1e293b' }}>{ticket.subject}</TableCell>
                  <TableCell>
                    <Chip label={getStatusLabel(ticket.status_id)} color={getStatusColor(ticket.status_id)} variant="filled" size="small" />
                  </TableCell>
                  <TableCell>
                    <Chip label={getPriorityLabel(ticket.priority_id)} color={getPriorityColor(ticket.priority_id)} variant="filled" size="small" />
                  </TableCell>
                  <TableCell align="right">
                    <Button size="small" variant="outlined" onClick={(e) => { e.stopPropagation(); navigate(`/ticket/${ticket.id}`); }}>
                      צפה
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {ticketsArray.length === 0 && (
          <Card sx={{ border: '1px solid #e2e8f0', mt: 3 }}>
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body1" sx={{ color: '#64748b' }}>
                אין פניות זמינות
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
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const prioritiesQuery = usePriorityQuery();
  const statusesQuery = useStatusQuery();
  const [ticket, setTicket] = useState<TicketById | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTicketById(id)
      .then((t) => {
        setTicket(t ?? null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

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
                הפנייה לא נמצאה
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
    return status?.name || 'לא ידוע';
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
    return priority?.name || 'לא ידוע';
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
          חזור
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
                  מספר פנייה: #{ticket.id}
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
                  <DescriptionIcon sx={{ color: '#2563eb', fontSize: '1.5rem' }} />
                  <Typography variant="h6" sx={{ color: '#1e293b', fontWeight: 700 }}>
                    תאור
                  </Typography>
                </Box>
                <Box sx={{ 
                  backgroundColor: '#f9fafb',
                  borderRadius: '8px',
                  p: 2,
                  borderLeft: '4px solid #2563eb',
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
                  <AssignmentIcon sx={{ color: '#2563eb', fontSize: '1.5rem' }} />
                  <Typography variant="h6" sx={{ color: '#1e293b', fontWeight: 700 }}>
                    פרטי הפנייה
                  </Typography>
                </Box>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                  {/* Created By */}
                  <Box sx={{ 
                    backgroundColor: '#f9fafb',
                    borderRadius: '8px',
                    p: 1.5,
                    borderLeft: '4px solid #2563eb'
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                      <PersonIcon sx={{ color: '#64748b', fontSize: '1.2rem' }} />
                      <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>
                        נוצר על ידי
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
                        הוקצה ל
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: '#1e293b', fontWeight: 500, ml: 3.5 }}>
                      {ticket.assigned_to_name ? ticket.assigned_to_name : 'לא הוקצה'}
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
                        תאריך יצירה
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: '#1e293b', fontWeight: 500, ml: 3.5 }}>
                      {new Date(ticket.created_at).toLocaleDateString('he-IL')}
                    </Typography>
                  </Box>

                  {/* Last Update */}
                  <Box sx={{ 
                    backgroundColor: '#f9fafb',
                    borderRadius: '8px',
                    p: 1.5,
                    borderLeft: '4px solid #2563eb'
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                      <UpdateIcon sx={{ color: '#64748b', fontSize: '1.2rem' }} />
                      <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>
                        עדכון אחרון
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: '#1e293b', fontWeight: 500, ml: 3.5 }}>
                      {ticket.updated_at ? new Date(ticket.updated_at).toLocaleDateString('he-IL') : 'לא עודכן'}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Comments Section */}
        {ticket.comments.length > 0 && (
          <Card sx={{ mb: 3, border: '1px solid #e2e8f0' }}>
            <CardHeader
              title={
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b' }}>
                  הערות ({ticket.comments.length})
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
                הוסף הערה
              </Typography>
            }
          />
          <Divider />
          <CardContent>
            <AddComment ticketId={ticket.id} />
          </CardContent>
        </Card>

        {/* Action Buttons */}
        {user.role !== 'customer' && (
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
              עדכן פניה
            </Button>
            {user.role === 'admin' && (
              <Button
                variant="outlined"
                startIcon={<DeleteIcon />}
                color="error"
                onClick={() => navigate(`/deleteTicket/${ticket.id}`)}
              >
                מחק פניה
              </Button>
            )}
          </Stack>
        )}
      </Box>
    </Container>
  );
};