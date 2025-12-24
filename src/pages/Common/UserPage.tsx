// src/pages/UsersPage.tsx
import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import UsersTable from './UserTable';

const UsersPage: React.FC = () => (
  <Box>
    <Typography variant="h4" gutterBottom>
      Users
    </Typography>
    <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
      <UsersTable />
    </Paper>
  </Box>
);

export default UsersPage;