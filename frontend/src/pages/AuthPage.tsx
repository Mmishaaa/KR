import { useState, FC, ChangeEvent, FormEvent, useEffect } from "react";
import { TextField, Button, Box, Typography, Container, Grid, MenuItem, Snackbar, Alert } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "../../state/user/userSlice";
import { UserAuthentication } from "../shared/interfaces/user";
import { AppDispatch } from "../../state/store";
import { RootState } from "../../state/store";
import React from "react";

declare global {
  interface ymaps {
    Map: any;
    GeoObject: any;
    GeoObjectCollection: any;
  }
}

const AuthPage: FC = () => {
  const [isLogin, setIsLogin] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const errorMessage = useSelector((state: RootState) => state.user.error);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    age: "",
    gender: "NonSpecified",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isRegistrationAttempted, setIsRegistrationAttempted] = useState(false); 

  useEffect(() => {
    const isAuthPage = location.pathname === "/login";
    setIsLogin(isAuthPage);

    if (isRegistrationAttempted && errorMessage) {
      setOpenErrorSnackbar(true);
    }
  }, [location.pathname, errorMessage, isRegistrationAttempted]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };  

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(formData.email)) {
        newErrors.email = "Please enter a valid email address.";
      }
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = "Password must include at least one uppercase letter.";
    } else if (!/[!@#$%^&*]/.test(formData.password)) {
      newErrors.password = "Password must include at least one special character.";
    }

    if (!isLogin) {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Confirm Password is required.";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match.";
      }

      if (!formData.age) {
        newErrors.age = "Age is required.";
      } else if (isNaN(Number(formData.age)) || Number(formData.age) <= 0) {
        newErrors.age = "Please enter a valid age.";
      }

      if (!formData.gender) {
        newErrors.gender = "Gender is required.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const userAuthenticationData: UserAuthentication = {
      email: formData.email,
      password: formData.password,
    };

    setIsRegistrationAttempted(true);

    isLogin
      ? dispatch(login(userAuthenticationData, navigate))
      : dispatch(register({ ...formData }, navigate));
  };

  const handleToggleAuth = () => {
    setIsLogin(!isLogin);
    if (isLogin) {
      navigate("/registration");
    } else {
      navigate("/login");
    }
  };

  const handleCloseErrorSnackbar = () => {
    setOpenErrorSnackbar(false);
    setIsRegistrationAttempted(false);
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 4,
        }}
      >
        <Typography variant="h5">{isLogin ? "Login" : "Register"}</Typography>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <TextField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            error={!!errors.password}
            helperText={errors.password}
          />     
          {!isLogin && (
            <>
              <TextField
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
              />
              <TextField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
                error={!!errors.firstName}
                helperText={errors.firstName}
              />
              <TextField
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
                error={!!errors.lastName}
                helperText={errors.lastName}
              />              
              <TextField
                label="Age"
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
                error={!!errors.age}
                helperText={errors.age}
                inputProps={{
                  min: 0,
                  max: 100,
                }}
              />
              <TextField
                label="Gender"
                select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
                error={!!errors.gender}
                helperText={errors.gender}
              >
                <MenuItem value="NonSpecified">Non-Specified</MenuItem>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
            </>
          )}           
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            {isLogin ? "Login" : "Register"}
          </Button>
        </form>
        <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
          <Grid item>
            <Button onClick={handleToggleAuth} color="primary">
              {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
            </Button>
          </Grid>
        </Grid>
      </Box>
      
      <Snackbar
        open={openErrorSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseErrorSnackbar}
      >
        <Alert 
          onClose={handleCloseErrorSnackbar} 
          severity="error" 
          sx={{ width: '100%' }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AuthPage;
