import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';


const Navbar: React.FC<{ onToggleSidebar: () => void }> = ({ onToggleSidebar }) => {
return (
<AppBar position="fixed" color="inherit" elevation={0} sx={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
<Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
<IconButton onClick={onToggleSidebar}><MenuIcon /></IconButton>
<Typography variant="h6" sx={{ fontWeight: 600 }}>PrepX</Typography>
<Avatar src="/avatar.png" />
</Toolbar>
</AppBar>
);
};
export default Navbar;