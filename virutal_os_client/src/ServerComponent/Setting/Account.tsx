import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Divider,
  Avatar,
  useMediaQuery,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import DeleteIcon from "@mui/icons-material/Delete";
import { useStore } from "@/util/globalState/appSetting";
import { useTheme } from "@mui/material";

const Account: React.FC = () => {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const {
    userData: { firstName, lastName, dob, email, number, password },
  } = useStore();

  return (
    <Box>
      <Grid
        container
        spacing={1}
        alignItems="center"
        justifyContent={isMobile ? "space-around" : "start"}
      >
        <Grid size={isMobile ? 2 : 1}>
          <Avatar
            alt="Cindy Baker"
            src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />
        </Grid>{" "}
        <Grid size={isMobile ? 4 : 2}>
          <Button variant="contained" color="success">
            Upload
          </Button>
        </Grid>{" "}
        <Grid size={isMobile ? 4 : 2}>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </Grid>
      </Grid>

      <Divider sx={{ marginY: 3 }} />
      <Grid container spacing={2}>
        <Grid size={6}>
          <TextField
            value={firstName}
            label="First Name"
            variant="outlined"
            fullWidth
            required
          />
        </Grid>
        <Grid size={6}>
          <TextField
            value={lastName}
            label="Last Name"
            variant="outlined"
            fullWidth
            required
          />
        </Grid>
        <Grid size={6}>
          <TextField
            value={email}
            label="Email"
            variant="outlined"
            fullWidth
            required
          />
        </Grid>
        <Grid size={6}>
          <TextField
            value={new Date()}
            label="Date of Birth"
            type="date"
            variant="outlined"
            fullWidth
            required
          />
        </Grid>
        <Grid size={6}>
          <TextField
            value={number}
            label="Phone Number"
            variant="outlined"
            fullWidth
            required
          />
        </Grid>
        <Grid size={6}>
          <TextField
            value={password}
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            required
          />
        </Grid>
      </Grid>
      <Divider sx={{ marginY: 3 }} />
      <Grid container spacing={2}>
        <Grid size={9}>
          <Typography variant="body2">
            When you delete account , you will permenently loose your data!
          </Typography>
        </Grid>
        <Grid size={3}>
          <Button variant="outlined" color="error" startIcon={<DeleteIcon />}>
            Delete
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Account;
