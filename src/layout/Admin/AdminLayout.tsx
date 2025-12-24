import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Avatar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  ThemeProvider,
  Divider,
  Menu,
  MenuItem,
  Fade
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { getTheme } from '../../theme/theme';
import { motion } from 'framer-motion';
import Sidebar from '../../components/Sidebar';
import Breadcrumbs from '../../components/Breadcrumb';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { clearUser } from '../../store/authSlice';

const DRAWER_WIDTH = 280;
const COLLAPSED_WIDTH = 72;

const LOGO = '/logo-192.png';
const AVATAR = '/avatar.png';

const AdminLayout: React.FC = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [collapsed, setCollapsed] = React.useState(false);
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');

  const theme = React.useMemo(() => getTheme(mode), [mode]);
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const location = useLocation();
   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleDrawerToggle = () => setMobileOpen((v) => !v);
  const handleCollapse = () => setCollapsed((c) => !c);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleAvatarClose = () => {
    setAnchorEl(null);
  };
  
  const handleLogout = () => {
    dispatch(clearUser());
        navigate("/login");
  };
  const userName  = useSelector((state: RootState) => state.auth.user?.userName);
  const initials = (userName ?? "").slice(0, 2).toUpperCase();
  // Drawer Content Wrapper (scrollable)
  const drawer = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden'
      }}
    >
      {/* Header */}
      <Toolbar sx={{ gap: 2, px: 2 }}>
        <img
          src={LOGO}
          alt="logo"
          style={{ width: 32, height: 32, borderRadius: 6 }}
        />
        {!collapsed && (
          <Typography variant="h6" noWrap>
            PrepX
          </Typography>
        )}
      </Toolbar>

      <Divider />

      {/* Scrollable Menu */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          '&::-webkit-scrollbar': { width: 6 },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(0,0,0,0.2)',
            borderRadius: 4
          }
        }}
      >
        <Sidebar collapsed={collapsed} />
      </Box>

      <Divider />

      <Box sx={{ p: 2, textAlign: collapsed ? 'center' : 'left' }}>
        <Typography variant="body2" color="text.secondary">
          © 2025 PrepX
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ px: 3, py: 2 }}>
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box sx={{ display: 'flex' }}>
        {/* ================= NAVBAR ================= */}
        <AppBar
          position="fixed"
          color="inherit"
          elevation={0}
          sx={{
            zIndex: (t) => t.zIndex.drawer + 1,
            borderBottom: '1px solid rgba(0,0,0,0.1)',
            bgcolor: 'background.paper'
          }}
        >
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            {/* Left side */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {/* Mobile toggle */}
              <IconButton
                onClick={handleDrawerToggle}
                sx={{ display: { md: 'none' } }}
              >
                <MenuIcon />
              </IconButton>

              {/* Desktop collapse toggle */}
              <IconButton
                onClick={handleCollapse}
                sx={{ display: { xs: 'none', md: 'inline-flex' } }}
              >
                <MenuIcon />
              </IconButton>

              <Typography
                component={Link}
                to="/admin"
                sx={{
                  fontWeight: 700,
                  ml: 1,
                  textDecoration: 'none',
                  color: 'inherit'
                }}
              >
                PrepX
              </Typography>
            </Box>

            {/* Right Side */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                sx={{
                  px: 1,
                  py: '4px',
                  borderRadius: 2,
                  border: 1,
                  borderColor: 'divider'
                }}
              >
                <input
                  placeholder="Search here"
                  style={{
                    outline: 'none',
                    border: 0,
                    paddingLeft: 8,
                    background: 'transparent'
                  }}
                />
              </Box>

              <IconButton
                onClick={() => setMode((m) => (m === 'light' ? 'dark' : 'light'))}
              >
                {mode === 'light' ? '🌙' : '☀️'}
              </IconButton>

              <Avatar 
                id="fade-button"
                aria-controls={open ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleAvatarClick}
                style={{ cursor: 'pointer' }}
                src={AVATAR}>
                {initials}
              </Avatar>
              
              <Menu
                  id="fade-menu"
                  slotProps={{
                  list: {
                        'aria-labelledby': 'fade-button',
                  },
                    }}
                  slots={{ transition: Fade }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleAvatarClose}>
                <MenuItem onClick={handleAvatarClose}>Profile</MenuItem>
                <MenuItem onClick={handleAvatarClose}>My account</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Box>
            
          </Toolbar>
        </AppBar>

        {/* ================= SIDEBAR (DRAWER) ================= */}
        <Box
          component="nav"
          sx={{
            width: {
              md: collapsed ? COLLAPSED_WIDTH : DRAWER_WIDTH
            },
            flexShrink: { md: 0 }
          }}
        >
          {/* Mobile Drawer */}
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{ display: { xs: 'block', md: 'none' } }}
            PaperProps={{ sx: { width: DRAWER_WIDTH } }}
          >
            {drawer}
          </Drawer>

          {/* Desktop Permanent Drawer */}
          <Drawer
            variant="permanent"
            open
            sx={{ display: { xs: 'none', md: 'block' } }}
            PaperProps={{
              sx: {
                width: collapsed ? COLLAPSED_WIDTH : DRAWER_WIDTH,
                transition: 'width 240ms ease',
                overflow: 'hidden'
              }
            }}
          >
            {drawer}
          </Drawer>
        </Box>

        {/* ================= MAIN CONTENT ================= */}
        <Box component="main" sx={{ flexGrow: 1, p: 0 }}>
          <Toolbar />

          {/* Breadcrumbs */}
          <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.24 }}>
            <Breadcrumbs />
          </motion.div>

          {/* Page Content */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Outlet />
          </motion.div>
        </Box>
      </Box>
      
    </ThemeProvider>
    </Box>
  );
};

export default AdminLayout;
