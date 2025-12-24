// src/pages/DashboardPage.tsx
import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

const DashboardPage: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' } }}>
        <Paper sx={{ p: 3, borderRadius: 2 }} elevation={1}>
          <Typography variant="subtitle2">Total Users</Typography>
          <Typography variant="h3">1,245</Typography>
        </Paper>
        <Paper sx={{ p: 3, borderRadius: 2 }} elevation={1}>
          <Typography variant="subtitle2">Revenue</Typography>
          <Typography variant="h3">$24,000</Typography>
        </Paper>
        <Paper sx={{ p: 3, borderRadius: 2 }} elevation={1}>
          <Typography variant="subtitle2">Active</Typography>
          <Typography variant="h3">980</Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default DashboardPage;