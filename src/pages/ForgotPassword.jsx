import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Alert,
} from "@mui/material";
import { toast } from "react-toastify";
import ROUTES from "../routes/ROUTES";
import { validateEmail } from "../validation/loginValidation";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/users/forgot-password", { email })
      .then((res) => {
        toast.success("Please Check Your Email..", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        navigate(ROUTES.LOGIN);
      })
      .catch((err) => console.log(err));
  };
  const handleEmailBlur = () => {
    let dataFromJoi = validateEmail({ email: email });
    if (dataFromJoi.error) {
      setEmailError(dataFromJoi.error.details[0].message);
    } else {
      setEmailError("");
    }
  };

  return (
    <Container
      maxWidth="sm"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Paper
        elevation={3}
        style={{
          padding: "20px",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <Typography variant="h4" gutterBottom align="center">
          Forgot Password
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <TextField
              id="email"
              label="Email"
              type="email"
              placeholder="Enter Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={handleEmailBlur}
            />
          </Box>
          {emailError && <Alert severity="error">{emailError}</Alert>}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ backgroundColor: "#db0000", mt: 2 }}
            disabled={emailError}
          >
            Send
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default ForgotPassword;
