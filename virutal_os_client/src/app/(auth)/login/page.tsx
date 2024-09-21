"use client";

import React, { ReactNode, useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  CssBaseline,
  Link,
  Grid2,
  Alert,
  AlertTitle,
} from "@mui/material";
import { LockOutlined as LockOutlinedIcon } from "@mui/icons-material";
import Avatar from "@mui/material/Avatar";
import { httpClient } from "@/util/axios";
import { useRouter } from "next/navigation";
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<null | ReactNode>(null);
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email && password) {
      setLoading(true);
      try {
        const response = await httpClient.post("auth/log-in", {
          email,
          password,
        });
        console.log("response.data", response.data);
        localStorage.setItem("auth", "true");
        localStorage.setItem("socket-auth", response.data.socketToken);
        router.push("/dashboard");
      } catch (error: any) {
        console.log("error", error);
        setAlert(
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {error?.response?.data?.error ?? error?.message}
          </Alert>
        );
      } finally {
        setLoading(false);
      }
    } else {
      setError("Both fields are required");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        {alert}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            Sign In
          </Button>
          <Grid2 container>
            <Grid2>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid2>
            <Grid2>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid2>
          </Grid2>
        </Box>
      </Box>
    </Container>
  );
};

export default SignIn;
