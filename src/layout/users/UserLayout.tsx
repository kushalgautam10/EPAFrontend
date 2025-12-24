import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { AppBar, Avatar, Box, Toolbar, Typography, ThemeProvider, CssBaseline, Breadcrumbs, Button, Container, Chip, TextField, InputAdornment } from '@mui/material';
import { getTheme } from '../../theme/theme';
import SearchIcon from "@mui/icons-material/Search";

const AVATAR = '/avatar.png';

const UserLayout: React.FC = () => {
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');
  const theme = React.useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />     

    <Box sx={{ backgroundColor: "#f5f8fc", minHeight: "100vh" }}>
      {/* NAVBAR */}
      <AppBar position="static" color="transparent" elevation={0} sx={{ py: 1 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            PrepX
          </Typography>
          <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
            <Typography>Home</Typography>
            <Typography>Dashboard</Typography>
            <Typography>Pages</Typography>
            <Typography>Docs</Typography>
            <Button
            component={Link} 
            to="/login"
            variant="contained" 
            sx={{ borderRadius: 3 }}>
            Login
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* HERO SECTION */}
      <Container sx={{ textAlign: "center", py: 10 }}>
        <Chip
          label="Over 20+ Different Exam Preparation Courses"
          sx={{ mb: 3, fontSize: "1rem", px: 2, py: 2 }}
        />

        <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
          PrepX For Your Next Exam Preparation
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 4 }}>
          Try It Now!
        </Typography>

        {/* Search */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
          <TextField
            placeholder="Search for Courses. (e.g., IOE, MOE, LokSewa, SEE...)"
            variant="outlined"
            sx={{ width: "60%", borderRadius: 3 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* FILTER BUTTONS */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 4 }}>
          <Button variant="outlined">All Section</Button>
          <Button variant="outlined">Marketing</Button>
          <Button variant="outlined">Feature</Button>
          <Button variant="outlined">Essential</Button>
        </Box>
      </Container>

      {/* PLACEHOLDER BLOCKS */}
      <Container sx={{ display: "flex", justifyContent: "space-between", mt: 6 }}>
        {[1, 2, 3].map((item) => (
          <Box
            key={item}
            sx={{
              width: "32%",
              height: 200,
              backgroundColor: "#e7edf3",
              borderRadius: 4,
            }}
          />
        ))}
      </Container>
    </Box>
    </ThemeProvider>
  );
};

export default UserLayout;