import React from "react";
import { Box, Button, Card, CardContent, TextField, Typography } from "@mui/material";
import {Link } from 'react-router-dom';
const ForgotPassword = () => {
  return (
     <>
     <Card sx={{ p: 2, maxWidth: 400, mx: "auto",  }}>
    <Box>
      <Typography variant="h4" fontWeight={700} mb={2}>
        Forgot Password
      </Typography>

      <Typography>
        Enter your email and we'll send you a reset link
      </Typography>

      <TextField
        fullWidth
        placeholder="your@email.com"
        sx={{ my: 2 }}
      />

      <Button
        fullWidth
        variant="contained"
        sx={{
          py: 1.2,
          background: "linear-gradient(to bottom, #1f2937, #111827)",
        }}
      >
        Send reset link
      </Button>

      <Typography textAlign="center" mt={3}>
        <Link to="/login">Back to Sign In</Link>
      </Typography>
    </Box>
    </Card>
    </>
    
  );
};

export default ForgotPassword;