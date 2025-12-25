import React from 'react'
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@mui/material'
import {
  Dashboard as DashboardIcon,
  Description as TicketsIcon,
  People as PeopleIcon,
  CheckCircle as StatusIcon,
  Flag as PriorityIcon,
  Logout as LogoutIcon,
  Login as LoginIcon,
  AppRegistration as RegisterIcon,
} from '@mui/icons-material'
import { useNavigate, useLocation } from 'react-router-dom'
import { useUserContext } from '../Context/userContext'

interface SideNavProps {
  collapsed?: boolean
}

export const SideNav: React.FC<SideNavProps> = ({ collapsed = false }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useUserContext();
  const userDetails = user?.userDetails ;

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/')
  }

  const isLoggedIn = !!userDetails?.id

  const getMenuItems = () => {
    if (!isLoggedIn) {
      return [
        { label: 'Login', icon: LoginIcon, path: '/login', roles: ['all'] },
        { label: 'Register', icon: RegisterIcon, path: '/register', roles: ['all'] },
      ]
    }

    const baseItems = [
      { label: 'Dashboard', icon: DashboardIcon, path: getDefaultDashboard(), roles: ['admin', 'agent', 'customer'] },
      { label: 'Tickets', icon: TicketsIcon, path: '/tickets', roles: ['admin', 'agent', 'customer'] },
    ]

    const roleSpecificItems: any[] = []

    if (userDetails?.role === 'admin') {
      roleSpecificItems.push(
        { label: 'Users', icon: PeopleIcon, path: '/users', roles: ['admin'] },
        { label: 'Statuses', icon: StatusIcon, path: '/manage/statuses', roles: ['admin'] },
        { label: 'Priorities', icon: PriorityIcon, path: '/manage/priorities', roles: ['admin'] }
      )
    }

    return [
      ...baseItems,
      ...roleSpecificItems,
      { label: 'Logout', icon: LogoutIcon, path: '/logout', roles: ['admin', 'agent', 'customer'] },
    ]
  }

  const getDefaultDashboard = () => {
    if (!userDetails?.role) return '/customer/dashboard'
    if (userDetails.role === 'admin') return '/admin/dashboard'
    if (userDetails.role === 'agent') return '/agent/dashboard'
    return '/customer/dashboard'
  }

  const menuItems = getMenuItems()

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#ffffff',
        borderRight: '1px solid #e5e7eb',
      }}
    >
      {/* Logo / Branding */}
      <Box
        sx={{
          p: collapsed ? 1 : 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: '1px solid #e5e7eb',
        }}
      >
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: '0.5rem',
            background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 700,
            fontSize: '1.25rem',
          }}
        >
          H
        </Box>
        {!collapsed && (
          <span style={{ marginLeft: '0.75rem', fontWeight: 600, color: '#111827' }}>
            Helpdesk
          </span>
        )}
      </Box>

      {/* Navigation Menu */}
      <List sx={{ flex: 1, p: 1, overflow: 'auto', scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }}>
        {menuItems.map((item, index) => {
          const IconComponent = item.icon
          const active = isActive(item.path)

          return (
            <Tooltip key={index} title={collapsed ? item.label : ''} placement="right">
              <ListItemButton
                onClick={() => navigate(item.path)}
                sx={{
                  borderRadius: '0.5rem',
                  mb: 0.5,
                  px: collapsed ? 1.25 : 2,
                  bgcolor: active ? '#f0f9ff' : 'transparent',
                  borderLeft: active ? '3px solid #2563eb' : 'none',
                  color: active ? '#2563eb' : '#6b7280',
                  '&:hover': {
                    bgcolor: '#f3f4f6',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: collapsed ? 'auto' : 40,
                    color: active ? '#2563eb' : '#9ca3af',
                  }}
                >
                  <IconComponent fontSize="small" />
                </ListItemIcon>
                {!collapsed && <ListItemText primary={item.label} />}
              </ListItemButton>
            </Tooltip>
          )
        })}
      </List>

      {/* Footer */}
      <Box sx={{ p: 1, borderTop: '1px solid #e5e7eb' }}>
        <Tooltip title={collapsed ? 'v1.0' : ''} placement="right">
          <Box sx={{ textAlign: 'center', fontSize: '0.75rem', color: '#9ca3af' }}>
            {!collapsed && <p>Helpdesk Pro</p>}
            {!collapsed && <p style={{ margin: 0 }}>v1.0</p>}
          </Box>
        </Tooltip>
      </Box>
    </Box>
  )
}

export default SideNav
