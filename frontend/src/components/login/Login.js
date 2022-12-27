import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { config } from "../../App";
import "./Login.css";

const Login = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (formData) => {
    setLoading(true);

    try {
      const response = await axios.post(`${config}/auth/login`, formData);
      const { username, token, balance } = response.data;

      localStorage.setItem("username", username);
      localStorage.setItem("token", token);
      localStorage.setItem("balance", balance);

      enqueueSnackbar("Logged in successfully", {
        variant: "success",
      });
      setLoading(false);
      navigate("/");
    } catch (error) {
      const errorResponse = error.response;
      let errorMsg = "";

      if (errorResponse.status === 400) {
        errorMsg = errorResponse.data.message;
      } else {
        errorMsg =
          "Something went wrong. Check that the backend is running, reachable and returns valid JSON.";
      }

      enqueueSnackbar(errorMsg, {
        variant: "error",
      });

      setLoading(false);
    }
  };

  const validateInput = (data) => {
    const { username, password } = data;

    if (username && password) {
      return true;
    }

    if (!username) {
      enqueueSnackbar("Username is a required field", { variant: "warning" });
      return false;
    }

    if (!password) {
      enqueueSnackbar("Password is a required field", { variant: "warning" });
      return false;
    }
  };

  const handleLogin = () => {
    if (validateInput(formData)) {
      login(formData);
    }
  };

  const handleChange = (type, value) => {
    const formDataCopy = { ...formData };
    formDataCopy[type] = value;
    setFormData(formDataCopy);
  };

  return (
    <Box display="flex" flexDirection="column" justifyContent="space-between">
      <Box className="content">
        <Stack spacing={2} className="form">
          <h2 className="title">Login</h2>
          <TextField
            id="username"
            label="username"
            variant="outlined"
            title="Username"
            name="username"
            placeholder="Enter Username"
            fullWidth
            required
            value={formData.username}
            onChange={(event) => handleChange("username", event.target.value)}
          />
          <TextField
            id="password"
            variant="outlined"
            label="password"
            name="password"
            type="password"
            fullWidth
            required
            value={formData.password}
            onChange={(event) => handleChange("password", event.target.value)}
          />
          <Button
            role="button"
            className="button"
            variant="contained"
            onClick={handleLogin}
          >
            {loading ? (
              <CircularProgress sx={{ color: "white" }} />
            ) : (
              "LOGIN TO QKART"
            )}
          </Button>
          <p className="secondary-action">
            Don’t have an account?
            <Link to="/register">Register now</Link>
          </p>
        </Stack>
      </Box>
    </Box>
  );
};

export default Login;
