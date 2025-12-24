import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Divider,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import { Link,useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../api/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/authSlice";

const Login = () => {
  const [login, { isLoading, isError, isSuccess, data }] = useLoginMutation();
  const [userInfo, setUserInfo] = useState({ email: '', password: '' });
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const handleLogin = async () => {
    try {
      await login(userInfo).unwrap();
        const result = await login(userInfo).unwrap();

  // Save user & token
    dispatch(setUser({
    user: {
      id: result.data.id,
      userName: result.data.userName,
      email: result.data.email,
      roles: result.data.roles
    },
    token: result.data.jwToken
  }));

  // Store in localStorage
  localStorage.setItem("user", JSON.stringify(result.data));
  localStorage.setItem("token", result.data.jwToken);

  navigate('/admin/');
      
    } catch (error) {
       if(isError){
        
        console.error("Failed to login:", error);
    }
    }
  };
  return (
    <>
    <Card sx={{ p: 2, maxWidth: 400, mx: "auto"}}>
    <Box>
      <Typography variant="h4" fontWeight={700} mb={2}>
        Sign in
      </Typography>

      <Typography>Email</Typography>
      <TextField
        fullWidth
        placeholder="your@email.com"
        value={userInfo.email}
        onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
        sx={{ my: 1 }}
      />

      <Typography>Password</Typography>
      <TextField
        type="password"
        fullWidth
        value={userInfo.password}
        onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
        sx={{ my: 1 }}
      />

      <FormControlLabel
        control={<Checkbox />}
        label="Remember me"
        sx={{ my: 1 }}
      />

      <Button
        fullWidth
        variant="contained"
        sx={{
          mt: 2,
          py: 1.2,
          background: "linear-gradient(to bottom, #1f2937, #111827)",
        }}
        onClick={handleLogin} disabled={isLoading}
      >
        Sign in
      </Button>

       {isError && <p>Error logging in</p>}
       {isSuccess && <p>Login successful</p>}

      <Box textAlign="center" mt={2}>
        <Typography variant="body2" color="primary.main">
        <Link to="/forgetpassword"> Forgot your password?</Link>
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }}>or</Divider>

      <Button fullWidth variant="outlined" sx={{ mb: 2 }}>
        <GoogleIcon sx={{ mr: 1 }} /> Sign in with Google
      </Button>

      <Button fullWidth variant="outlined">
        <FacebookIcon sx={{ mr: 1 }} /> Sign in with Facebook
      </Button>

      <Typography textAlign="center" mt={3}>
        Don't have an account?{" "}
        <Link to="/register">Register here</Link>
      </Typography>
    </Box>
     </Card>
    </>
  );
};

export default Login;