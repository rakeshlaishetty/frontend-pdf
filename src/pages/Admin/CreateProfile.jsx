import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  MenuItem,
  Box,
  Container,
  LinearProgress,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import getRoleService from "../../utils/apis/getroles";
import { ShowToast } from "../../store/slices/toastSlice";
import { useDispatch } from "react-redux";
import { OverlaySpinner } from "../../App";
import PagingComponent from "../../utils/Paginate";

const Root = styled("div")(({ theme }) => ({
  width: "100%",
  padding: 5,
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  "& > :not(style) ~ :not(style)": {
    marginTop: theme.spacing(4),
  },
}));

const CreateProfile = () => {
  const [formData, setFormData] = useState({
    FirstName: "",
    lastName: "",
    nickName: "",
    email: "",
    mobile: "",
    role: "",
    password: "",
  });

  const [rolesData, setRolesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({
    email: "",
    mobile: "",
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    let errorMessage = "";

    // Validation for email
    if (name === "email") {
      if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value)) {
        errorMessage = "Invalid email format";
      }
    }

    // Validation for mobile number
    if (name === "mobile") {
      if (!/^\d{10}$/.test(value)) {
        errorMessage = "Mobile number must be 10 digits";
      }
    }
    if (name === "password") {
      if (value.length > 12 || value.length < 8) {
        errorMessage = "please use 8 to 12 or last 20 charcaters";
      }
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Set error message
    setError((prevError) => ({
      ...prevError,
      [name]: errorMessage,
    }));
  };

  console.log(error);

  const handleSubmit = (e) => {
    e.preventDefault();
    let hasError = false;

    // Check if any field is empty
    for (const key in formData) {
      if (formData[key] == "") {
        setError((prevErrors) => ({
          ...prevErrors,
          [key]: "Please fill in this field",
        }));
        hasError = true;
      }
    }

    // If any error exists, don't proceed with form submission
    if (hasError) {
      return;
    }

    // Handle form submission
    console.log(formData);
  };

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await getRoleService.getRoleService();
        if (response.success) {
          setRolesData(response.data);
        } else {
          throw new Error("Failed to fetch the data ");
        }
        setIsLoading(false);
      } catch (err) {
        setError(err.message || "An error occurred while fetching roles.");
        dispatch(
          ShowToast({
            message: err.message || "something Went Wrong",
            boolean: true,
            icon: "error",
          })
        );
        setIsLoading(false);
      }
    };

    fetchRoles();

    return () => {
      setRolesData([]);
    };
  }, []);

  return isLoading ? (
    <OverlaySpinner />
  ) : (
    <Paper elevation={3}>
      <Root>
        <Box
          component="section"
          sx={{ p: 2, border: "1px dashed grey", minHeight: "100%" }}
        >
          <Divider sx={{ fontSize: 20, fontWeight: "bold" }}>
            Create Profile
          </Divider>
        </Box>
        <Box
          component="section"
          sx={{ p: 2, border: "1px dashed grey", minHeight: "100%" }}
        >
          <Container>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    name="FirstName"
                    value={formData.FirstName}
                    error={error.FirstName}
                    helperText={error.FirstName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    error={error.lastName}
                    helperText={error.lastName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Nick Name"
                    name="nickName"
                    value={formData.nickName}
                    error={error.nickName}
                    helperText={error.nickName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={error.email}
                    helperText={error.email}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Mobile"
                    name="mobile"
                    value={formData.mobile}
                    error={error.mobile}
                    helperText={error.mobile}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    fullWidth
                    label="Role"
                    name="role"
                    value={formData.role}
                    error={error.role}
                    helperText={error.role}
                    onChange={handleChange}
                  >
                    <MenuItem value={null}>Select Role</MenuItem>{" "}
                    {/* Set default value to null */}
                    {rolesData.map((role) => (
                      <MenuItem key={role._id} value={role._id}>
                        {role.roleName}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    error={error.password}
                    helperText={error.password}
                  />
                </Grid>
                <Grid item xs={12} sm={12} textAlign="center">
                  <Button variant="contained" color="success" type="submit">
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Container>
        </Box>
      </Root>
    </Paper>
  );
};

export default CreateProfile;
