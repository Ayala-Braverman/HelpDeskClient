import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
} from '@mui/material';
import {
  Add as AddIcon,
  ArrowBack as BackIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { usePriorityQuery, useStatusQuery } from '../Query/useQuery';

type Props = { type: 'priorities' | 'statuses' };

export const ManagePrioritiesAndStatusesWrapper: React.FC = () => {
  const { type } = useParams();

  if (type !== 'priorities' && type !== 'statuses') {
    return (
      <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
          <Typography variant="h5" color="error">
            Invalid Type
          </Typography>
        </Box>
      </Container>
    );
  }

  return <ManagePrioritiesAndStatuses type={type} />;
};

export const ManagePrioritiesAndStatuses: React.FC<Props> = ({ type }) => {
  const navigate = useNavigate();
  const prioritiesQuery = usePriorityQuery();
  const statusesQuery = useStatusQuery();

  const query = type === 'priorities' ? prioritiesQuery : statusesQuery;
  const data = (Array.isArray(query.data) ? query.data : []) as any[];

  const title = type === 'priorities' ? 'Priorities' : 'Statuses';
  const addButtonText = type === 'priorities' ? 'Add Priority' : 'Add Status';
  const addPath = type === 'priorities' ? '/createPriority' : '/createStatus';

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        {/* Back Button */}
        <Button
          startIcon={<BackIcon />}
          onClick={() => navigate(-1)}
          sx={{ mb: 3, color: '#2563eb' }}
        >
          Back
        </Button>

        {/* Header Card */}
        <Card sx={{
          mb: 3,
          background: type === 'priorities'
            ? 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)'
            : 'linear-gradient(135deg, #f0fdf4 0%, #d1fae5 100%)',
          border: type === 'priorities' ? '1px solid #bae6fd' : '2px solid #a7f3d0',
        }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#1e293b', mb: 1 }}>
                  Manage {title}
                </Typography>
                <Typography variant="body1" sx={{ color: '#64748b' }}>
                  List of all {title} in the system
                </Typography>
              </Box>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => navigate(addPath)}
                sx={{
                  background: type === 'priorities'
                    ? '#2563eb'
                    : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  '&:hover': {
                    background: type === 'priorities'
                      ? '#1e40af'
                      : 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                  },
                }}
              >
                {addButtonText}
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* Content Card */}
        <Card sx={{ border: '1px solid #e2e8f0' }}>
          <CardContent sx={{ p: 3 }}>
            {query.isLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                <CircularProgress />
              </Box>
            ) : data.length > 0 ? (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{
                      backgroundColor: type === 'priorities' ? '#f3f4f6' : '#f0fdf4',
                      borderBottom: type === 'priorities' ? '2px solid #e2e8f0' : '2px solid #a7f3d0',
                    }}>
                      <TableCell sx={{ fontWeight: 700, color: type === 'priorities' ? '#374151' : '#047857' }}>ID</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: type === 'priorities' ? '#374151' : '#047857' }}>Name</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((item: any) => (
                      <TableRow
                        key={item.id}
                        sx={{
                          '&:hover': { backgroundColor: type === 'priorities' ? '#f9fafb' : '#f0fdf4' },
                          borderBottom: type === 'statuses' ? '1px solid #d1fae5' : '1px solid #e2e8f0',
                        }}
                      >
                        <TableCell sx={{
                          fontWeight: 600,
                          color: type === 'priorities' ? '#2563eb' : '#10b981',
                        }}>#{item.id}</TableCell>
                        <TableCell sx={{ color: '#1e293b', fontSize: '0.95rem' }}>
                          {item.name}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography variant="body1" sx={{ color: '#94a3b8', mb: 3 }}>
                  No {title.toLowerCase()} available
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => navigate(addPath)}
                  sx={{
                    backgroundColor: '#2563eb',
                    '&:hover': { backgroundColor: '#1e40af' },
                  }}
                >
                  {addButtonText}
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};
