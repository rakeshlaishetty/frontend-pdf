import React, { useState } from "react";
import { TextField, Button, Grid, Typography, Box,LinearProgress,CircularProgress } from "@mui/material";
import profileApi from "../../utils/apis/getProfile";

const ProfileUpdate = ({ userData, dispatch, ShowToast }) => {
  const [updatedUserData, setUpdatedUserData] = useState(userData);
  const [password, setpassword] = useState("");
  const [isLoading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name == "password") {
      setpassword(value);
    } else {
      setUpdatedUserData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const data = {
        ...updatedUserData,
        ...{ password: password },
      };
      const response = await profileApi.updatedUserData(data);
      if (response.success) {
        dispatch(
          ShowToast({
            message: "Updated Successfully",
            boolean: true,
            icon: "success",
          })
        );
      }
    } catch (err) {
      dispatch(
        ShowToast({
          message: err.message || "something Went Wrong",
          boolean: true,
          icon: "error",
        })
      );
    } finally {
      setLoading(false);
    }
  };

  
  const styles = theme => ({  
    circularProgress: {
      marginLeft: 0,
      marginRight: theme.spacing.unit,
    },
  
  });
  return (
    <>
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="subtitle1">First Name:</Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="First Name"
            name="FirstName"
            value={updatedUserData.FirstName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1">Last Name:</Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Last Name"
            name="lastName"
            value={updatedUserData.lastName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1">Email:</Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={updatedUserData.email}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1">Mobile:</Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Mobile"
            name="mobile"
            value={updatedUserData.mobile}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1">password</Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1">Nickname:</Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Nickname"
            name="nickName"
            value={updatedUserData.nickName}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      <Button variant="contained" sx={{marginTop:"10px"}} onClick={handleSubmit} disabled={isLoading}>
        {isLoading && <CircularProgress className={styles.circularProgress} size={20}/> }
        Update Profile
      </Button>
      
    </Box>
  </>
  );
};

export default ProfileUpdate;
