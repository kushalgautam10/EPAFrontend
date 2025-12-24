import React from "react";
import {
  Box,
  Button,
  Card,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const Register = () => {
  return (
     <>
    <Card sx={{ p: 2, maxWidth: 400, mx: "auto" }}>
    <Box>
      <Typography variant="h4" fontWeight={700} mb={2}>
        Create an account
      </Typography>

      <Typography>Full Name</Typography>
      <TextField fullWidth sx={{ my: 1 }} />

      <Typography>Email</Typography>
      <TextField fullWidth sx={{ my: 1 }} />

      <Typography>Password</Typography>
      <TextField type="password" fullWidth sx={{ my: 1 }} />

      <Button
        fullWidth
        variant="contained"
        sx={{
          mt: 3,
          py: 1.2,
          background: "linear-gradient(to bottom, #1f2937, #111827)",
        }}
      >
        Sign up
      </Button>

      <Typography textAlign="center" mt={3}>
        Already have an account?{" "}
        <Link to="/login">Back to Sign In</Link>
      </Typography>
    </Box>
    </Card>
    </>
  );
};

export default Register;