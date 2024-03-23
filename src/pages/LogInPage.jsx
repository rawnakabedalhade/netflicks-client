import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  Box,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  Alert,
} from "@mui/material";
import { validateEmail, validatePassword } from "../validation/loginValidation";
import "../styles/login.css";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ROUTES from "../routes/ROUTES";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import loginContext from "../store/loginContext";

const Login = () => {
  const { setLogin, login } = useContext(loginContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [checked, setChecked] = useState(false);
  const [failedLoginAttempts, setFailedLoginAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);

  const navigate = useNavigate();

  const checkUserLoginAttempts = async () => {
    try {
      const { data } = await axios.get("/users/" + login._id);
      if (data.failedLoginAttempts >= 3) {
        setIsBlocked(true);

        // Set a timeout to unblock the user after 24 hours
        const unblockTimer = setTimeout(() => {
          setIsBlocked(false);
          setFailedLoginAttempts(0);
          data.failedLoginAttempts = 0; // Reset failed login attempts after unblocking
        }, 24 * 60 * 60 * 1000); // 24 hours in milliseconds

        // Clear the timeout when the component unmounts
        return () => clearTimeout(unblockTimer);
      }
    } catch (err) {
      console.log(err);
      // Handle error when fetching user data
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isBlocked) {
      toast.error(
        "Your account is temporarily locked. Please try again later."
      );
      return;
    }
    try {
      let { data } = await axios.post("/users/login", {
        email: email,
        password: password,
      });
      checkUserLoginAttempts();
      if (!checked) {
        localStorage.setItem("token", data);
      } else {
        sessionStorage.setItem("token", data);
      }
      const decoded = jwtDecode(data);
      setLogin(decoded);
      toast.success("LoggedIn Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      navigate(ROUTES.HOME);
    } catch (err) {
      console.log("err from axios", err);
      setFailedLoginAttempts((prevAttempts) => prevAttempts + 1);
      if (failedLoginAttempts + 1 >= 3) {
        toast.error(
          "Your account is temporarily locked. Please try again later.",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          }
        );
      } else {
        toast.error("Oops..! Something went wrong", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    }
  };
  const handleEmailBlur = () => {
    let dataFromJoi = validateEmail({ email: email });
    if (dataFromJoi.error) {
      setEmailError(dataFromJoi.error.details[0].message);
    } else {
      setEmailError("");
    }
  };

  const handlePasswordBlur = () => {
    let dataFromJoi = validatePassword({ password: password });
    if (dataFromJoi.error) {
      setPasswordError(dataFromJoi.error.details[0].message);
    } else {
      setPasswordError("");
    }
  };
  const handleCheckboxChange = () => {
    setChecked(!checked);
  };
  return (
    <Grid container component="main" className="bg">
      <Box component="form">
        <Paper
          sx={{
            padding: "20px",
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            borderRadius: "16px",
            maxWidth: 400,
            height: 480,
          }}
        >
          <Typography variant="h4" gutterBottom color="white">
            Login
          </Typography>
          <TextField
            label="Email"
            sx={{ bgcolor: "#564d4d", color: "white" }}
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={handleEmailBlur}
          />
          {emailError && <Alert severity="error">{emailError}</Alert>}
          <TextField
            label="Password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    sx={{ color: "black" }}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ bgcolor: "#564d4d", color: "white" }}
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={handlePasswordBlur}
          />
          {passwordError && <Alert severity="error">{passwordError}</Alert>}
          <FormControlLabel
            control={
              <Checkbox
                value="remember"
                color="primary"
                sx={{ color: "white" }}
              />
            }
            label="Remember me"
            onChange={handleCheckboxChange}
            checked={checked}
            sx={{ color: "white" }}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ bgcolor: "#db0000", mt: 2 }}
            fullWidth
            disabled={isBlocked}
            onClick={handleSubmit}
          >
            Login
          </Button>
        </Paper>
        {/* <Link to="#" className="span">
          {"Don't have an account? Sign Up"}
        </Link> */}
      </Box>
    </Grid>
  );
};

export default Login;
