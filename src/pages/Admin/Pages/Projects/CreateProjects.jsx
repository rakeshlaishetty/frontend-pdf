import React, { useState, useEffect } from "react";
import { TextField, Button, Grid, Container, Box } from "@mui/material";
import Divider from "@mui/material/Divider";
import AdminAPI from "../../../../utils/AdminApi/AdminApi";
import { MenuItem } from "@mui/material";
import { useDispatch } from "react-redux";
import { ShowToast } from "../../../../store/slices/toastSlice";

const CreateProjects = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    projectName: "",
    projectStartDate: "",
    projectEndDate: "",
    clientId: "", // Client ID field
    documents: [],
  });

  console.log(formData, "formData");
  const [clientIds, setClientIds] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to fetch client IDs from the API
  const fetchClientIds = async () => {
    setLoading(true);
    try {
      const response = await AdminAPI.getClients();
      console.log(response.data);
      setClientIds(response.data);
    } catch (error) {
      console.error("Error fetching client IDs:", error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect hook to fetch client IDs when the component mounts
  useEffect(() => {
    fetchClientIds();
  }, []);

  // Function to handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await AdminAPI.CreateProject(formData);
      if (response.success) {
        dispatch(
          ShowToast({
            message: "successfully Created ",
            boolean: true,
            icon: "success",
          })
        );
      } else {
        throw new Error(response.message || "Something Went Wrong");
      }
    } catch (err) {
      dispatch(
        ShowToast({
          message: err.message || "something Went Wrong",
          boolean: true,
          icon: "error",
        })
      );
    }
  };

  return (
    <Box>
      <Divider sx={{ fontSize: 20, fontWeight: "bold" }}>
        Create Project
      </Divider>

      <Box component="section" sx={{ p: 2, minHeight: "100%" }}>
        <Container>
          <form onSubmit={handleSubmit}>
            <TextField
              name="projectName"
              label="Project Name"
              variant="outlined"
              fullWidth
              value={formData.projectName}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
            />
            <TextField
              name="projectStartDate"
              label="Start Date"
              type="date"
              variant="outlined"
              fullWidth
              value={formData.projectStartDate}
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ mb: 2 }}
            />
            <TextField
              name="projectEndDate"
              label="End Date"
              type="date"
              variant="outlined"
              fullWidth
              value={formData.projectEndDate}
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ mb: 2 }}
            />
            {/* Dropdown for client IDs */}
            <TextField
              select
              name="clientId"
              label="Client ID"
              variant="outlined"
              fullWidth
              value={formData.clientId}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
            >
              {/* Map through client IDs and create menu items */}
              {Array.isArray(clientIds) &&
                clientIds.length &&
                clientIds.map((clientId) => (
                  <MenuItem key={clientId} value={clientId._id}>
                    {`${clientId.FirstName} ${clientId.lastName}`}
                  </MenuItem>
                ))}
            </TextField>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </form>
        </Container>
      </Box>
    </Box>
  );
};

export default CreateProjects;
