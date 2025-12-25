import React, { useState } from 'react'
import {
  Box,
  AppBar,
  Toolbar,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Divider,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import {
  Menu as MenuIconComponent,
  Logout as LogoutIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material'
import SideNav from './SideNav'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../Context/userContext'

interface AppShellProps {
  children: React.ReactNode
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const [sideNavOpen, setSideNavOpen] = useState(true)
  const [profileMenuAnchor, setProfileMenuAnchor] = useState<null | HTMLElement>(null)
  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const handleSideNavToggle = () => {
    setSideNavOpen(!sideNavOpen)
  }

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setProfileMenuAnchor(event.currentTarget)
  }

  const handleProfileMenuClose = () => {
    setProfileMenuAnchor(null)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    handleProfileMenuClose()
    navigate('/login')
  }

  const { user } = useUserContext();
  const userDetails = user?.userDetails ;

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#f9fafb' }}>
      {/* Topbar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: theme.zIndex.drawer + 1,
          width: { xs: '100%', md: sideNavOpen ? 'calc(100% - 280px)' : 'calc(100% - 80px)' },
          marginLeft: { xs: 0, md: sideNavOpen ? '280px' : '80px' },
          transition: 'all 0.3s ease',
          backgroundColor: '#ffffff',
          color: '#111827',
          borderBottom: '1px solid #e5e7eb',
          boxShadow: 'none',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', pr: 2, minHeight: '72px', height: '72px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton
              color="inherit"
              aria-label="toggle sidebar"
              onClick={handleSideNavToggle}
              sx={{ color: '#111827', display: { xs: 'none', md: 'inline-flex' } }}
            >
              <MenuIconComponent />
            </IconButton>
            <h2 style={{ color: '#111827', margin: 0, fontWeight: 700, fontSize: '1.25rem' }}>
              Helpdesk Pro
            </h2>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                cursor: 'pointer',
                px: 1.5,
                py: 0.75,
                borderRadius: '0.5rem',
                '&:hover': { bgcolor: '#f3f4f6' },
              }}
              onClick={handleProfileMenuOpen}
            >
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  bgcolor: '#2563eb',
                  fontSize: '0.875rem',
                }}
              >
                {userDetails?.name?.charAt(0).toUpperCase() || 'U'}
              </Avatar>
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <p style={{ margin: 0, fontSize: '0.875rem', color: '#111827', fontWeight: 500 }}>
                  {userDetails?.name || 'User'}
                </p>
                <p style={{ margin: 0, fontSize: '0.75rem', color: '#6b7280' }}>
                  {userDetails?.role || 'User'}
                </p>
              </Box>
            </Box>

            <Menu
              anchorEl={profileMenuAnchor}
              open={Boolean(profileMenuAnchor)}
              onClose={handleProfileMenuClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem disabled>
                <strong>{userDetails?.name || 'User'}</strong>
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleProfileMenuClose}>
                <SettingsIcon sx={{ mr: 1 }} /> Settings
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <LogoutIcon sx={{ mr: 1 }} /> Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isMobile ? sideNavOpen : true}
        onClose={() => setSideNavOpen(false)}
        sx={{
          width: sideNavOpen ? 280 : 80,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: sideNavOpen ? 280 : 80,
            boxSizing: 'border-box',
            height: '100vh',
            transition: 'width 0.3s ease',
            overflow: 'hidden',
          },
        }}
      >
        <SideNav collapsed={!sideNavOpen} />
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { xs: '100%', md: sideNavOpen ? 'calc(100% - 280px)' : 'calc(100% - 80px)' },
          overflowY: 'auto',
          transition: 'width 0.3s ease',
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

export default AppShell
