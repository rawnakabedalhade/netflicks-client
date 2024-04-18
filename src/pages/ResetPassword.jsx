import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Alert,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { toast } from "react-toastify";
import ROUTES from "../routes/ROUTES";
import { validatePassword } from "../validation/loginValidation";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const { id, token } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`/users/reset-password/${id}/${token}`, { password })
      .then((res) => {
        toast.success("The Password Reset successfully!!", {
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
  const handlePasswordBlur = () => {
    let dataFromJoi = validatePassword({ password: password });
    if (dataFromJoi.error) {
      setPasswordError(dataFromJoi.error.details[0].message);
    } else {
      setPasswordError("");
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
          backgroundColor: "#f5f5f5",
        }}
      >
        <Typography variant="h4" gutterBottom align="center" color="black">
          Reset Password
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box mb={2}>
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
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={handlePasswordBlur}
            />
            {passwordError && <Alert severity="error">{passwordError}</Alert>}
          </Box>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ backgroundColor: "#db0000", mt: 2 }}
            disabled={passwordError}
          >
            Update
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default ResetPassword;
