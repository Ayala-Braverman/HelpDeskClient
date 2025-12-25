import React, { useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useTicketsQuery, usePriorityQuery, useStatusQuery, useUsersQuery } from '../Query/useQuery';
import type { Ticket } from '../types/ticket';
import type { UserDetails } from '../types/user';

export const DashboardCharts: React.FC = () => {
  const ticketsQuery = useTicketsQuery();
  const prioritiesQuery = usePriorityQuery();
  const statusesQuery = useStatusQuery();
  const usersQuery = useUsersQuery();

  const ticketsArray = (ticketsQuery.data as Ticket[]) || [];
  const prioritiesData = (Array.isArray(prioritiesQuery.data) ? prioritiesQuery.data : []) as any[];
  const statusesData = (Array.isArray(statusesQuery.data) ? statusesQuery.data : []) as any[];
  const usersArray = (Array.isArray(usersQuery.data) ? usersQuery.data : []) as UserDetails[];

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

  // Calculate users by role
  const usersByRole = useMemo(() => {
    const roleCounts = {
      admin: 0,
      agent: 0,
      customer: 0,
    };

    usersArray.forEach((user) => {
      if (user.role in roleCounts) {
        roleCounts[user.role as keyof typeof roleCounts]++;
      }
    });

    return Object.entries(roleCounts)
      .filter(([_, count]) => count > 0)
      .map(([role, count]) => ({
        name: role.charAt(0).toUpperCase() + role.slice(1),
        value: count,
      }));
  }, [usersArray]);

  const COLORS = ['#2563eb', '#10b981', '#f59e0b'];
  const TOOLTIP_STYLE = {
    backgroundColor: '#fff',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
  };
  const CHART_MARGIN = { top: 20, right: 30, left: 0, bottom: 5 };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 4 }}>
      {/* Tickets by Status Chart */}
      <Box sx={{ backgroundColor: '#ffffff', borderRadius: '8px', p: 3, border: '1px solid #e2e8f0' }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: '#1e293b' }}>
          Tickets by Status
        </Typography>
        {ticketsByStatus.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={ticketsByStatus} margin={CHART_MARGIN}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip contentStyle={TOOLTIP_STYLE} />
              <Legend />
              <defs>
                <linearGradient id="colorTickets1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="Tickets" fill="url(#colorTickets1)" stroke="#2563eb" fillOpacity={0.8} />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <Typography variant="body2" sx={{ color: '#94a3b8', textAlign: 'center', py: 4 }}>
            No data available
          </Typography>
        )}
      </Box>

      {/* Tickets by Priority Chart */}
      <Box sx={{ backgroundColor: '#ffffff', borderRadius: '8px', p: 3, border: '1px solid #e2e8f0' }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: '#1e293b' }}>
          Tickets by Priority
        </Typography>
        {ticketsByPriority.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={ticketsByPriority} margin={CHART_MARGIN}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip contentStyle={TOOLTIP_STYLE} />
              <Legend />
              <defs>
                <linearGradient id="colorTickets2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="Tickets" fill="url(#colorTickets2)" stroke="#10b981" fillOpacity={0.8} />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <Typography variant="body2" sx={{ color: '#94a3b8', textAlign: 'center', py: 4 }}>
            No data available
          </Typography>
        )}
      </Box>

      {/* Users by Role Chart */}
      <Box sx={{ py: 3 }}>
        <Box sx={{ backgroundColor: '#ffffff', borderRadius: '8px', p: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#1e293b' }}>
            Users by Role
          </Typography>
          {usersByRole.length > 0 ? (
            <ResponsiveContainer width="100%" height={450}>
              <PieChart>
                <Pie
                  data={usersByRole}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {usersByRole.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={TOOLTIP_STYLE} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <Typography variant="body2" sx={{ color: '#94a3b8', textAlign: 'center', py: 4 }}>
              No data available
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};
