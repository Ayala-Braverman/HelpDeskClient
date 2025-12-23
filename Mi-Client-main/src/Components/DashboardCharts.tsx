import React, { useMemo } from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useTicketsQuery, usePriorityQuery, useStatusQuery } from '../Query/useQuery';
import type { Ticket } from '../types/ticket';

export const DashboardCharts: React.FC = () => {
  const ticketsQuery = useTicketsQuery();
  const prioritiesQuery = usePriorityQuery();
  const statusesQuery = useStatusQuery();

  const ticketsArray = (ticketsQuery.data as Ticket[]) || [];
  const prioritiesData = (Array.isArray(prioritiesQuery.data) ? prioritiesQuery.data : []) as any[];
  const statusesData = (Array.isArray(statusesQuery.data) ? statusesQuery.data : []) as any[];

  // Calculate tickets by status
  const ticketsByStatus = useMemo(() => {
    if (statusesData.length === 0) return [];
    
    return statusesData.map((status: any) => ({
      name: status.name,
      Tickets: ticketsArray.filter((t) => t.status_id === status.id).length,
    }));
  }, [ticketsArray, statusesData]);

  // Calculate tickets by priority
  const ticketsByPriority = useMemo(() => {
    if (prioritiesData.length === 0) return [];
    
    return prioritiesData.map((priority: any) => ({
      name: priority.name,
      Tickets: ticketsArray.filter((t) => t.priority_id === priority.id).length,
    }));
  }, [ticketsArray, prioritiesData]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mb: 4 }}>
      {/* Tickets by Status Chart */}
      <Card sx={{ border: '1px solid #e2e8f0' }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: '#1e293b' }}>
            Tickets by Status
          </Typography>
          {ticketsByStatus.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ticketsByStatus} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Bar dataKey="Tickets" fill="#2563eb" radius={[8, 8, 0, 0]} maxBarSize={50} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <Typography variant="body2" sx={{ color: '#94a3b8', textAlign: 'center', py: 4 }}>
              אין נתונים זמינים
            </Typography>
          )}
        </CardContent>
      </Card>

      {/* Tickets by Priority Chart */}
      <Card sx={{ border: '1px solid #e2e8f0' }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: '#1e293b' }}>
            Tickets by Priority
          </Typography>
          {ticketsByPriority.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ticketsByPriority} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Bar dataKey="Tickets" fill="#2563eb" radius={[8, 8, 0, 0]} maxBarSize={50} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <Typography variant="body2" sx={{ color: '#94a3b8', textAlign: 'center', py: 4 }}>
              אין נתונים זמינים
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};
