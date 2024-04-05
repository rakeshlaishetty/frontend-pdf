import React, { useState, useEffect } from "react";
import { TextField, Button, Container, Box } from "@mui/material";
import Divider from "@mui/material/Divider";
import AdminAPI from "../../../../utils/AdminApi/AdminApi";
import { MenuItem } from "@mui/material";
import { useDispatch } from "react-redux";
import { ShowToast } from "../../../../store/slices/toastSlice";
import { LinearProgress } from "@mui/material";

const CreateDocument = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    documentName: "",
    projectId: "", // Project ID field
    assignedId: "", // Assigned user ID field
    documentfile: null, // Files field for file upload
  });

  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [projectsResponse, usersResponse] = await Promise.all([
          AdminAPI.getAllProjects(),
          AdminAPI.getAllEmployees(),
        ]);
        setProjects(projectsResponse.data.projects);
        setUsers(usersResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      documentfile: e.target.files[0],
    });
  };
  

  console.log(formData,"formData")
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const Formdata = new FormData();
      Formdata.append("documentName", formData.documentName);
      Formdata.append("projectId", formData.projectId);
      Formdata.append("assignedId", formData.assignedId);
      Formdata.append("documentfile", formData.documentfile);
      console.log(formData.documentfile,"documentfile")
      const response = await AdminAPI.createDocument(Formdata);
      if (response.success) {
        dispatch(
          ShowToast({
            message: "Document successfully created",
            boolean: true,
            icon: "success",
          })
        );
      } else {
        throw new Error(response.message || "Something went wrong");
      }
    } catch (err) {
      dispatch(
        ShowToast({
          message: err.message || "Something went wrong",
          boolean: true,
          icon: "error",
        })
      );
    }
  };

  return (
    <Box>
      {loading ? (
        <LinearProgress />
      ) : (
        <>
          <Divider sx={{ fontSize: 20, fontWeight: "bold" }}>
            Create Document
          </Divider>

          <Box component="section" sx={{ p: 2, minHeight: "100%" }}>
            <Container>
              <form onSubmit={handleSubmit}>
                <TextField
                  name="documentName"
                  label="Document Name"
                  variant="outlined"
                  fullWidth
                  value={formData.documentName}
                  onChange={handleInputChange}
                  sx={{ mb: 2 }}
                />
                <TextField
                  select
                  name="projectId"
                  label="Project"
                  variant="outlined"
                  fullWidth
                  value={formData.projectId}
                  onChange={handleInputChange}
                  sx={{ mb: 2 }}
                >
                  {projects.map((project) => (
                    <MenuItem key={project._id} value={project._id}>
                      {project.projectName}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  select
                  name="assignedId"
                  label="Assigned User"
                  variant="outlined"
                  fullWidth
                  value={formData.assignedId}
                  onChange={handleInputChange}
                  sx={{ mb: 2 }}
                >
                  {users.map((user) => (
                    <MenuItem key={user._id} value={user._id}>
                      {`${user.FirstName} ${user.lastName}`}
                    </MenuItem>
                  ))}
                </TextField>
                {/* File input field for file upload */}
                <input
                  type="file"
                  name="documentfile"
                  onChange={handleFileChange}
                  multiple={false}
                  accept=".pdf" // Accept only PDF files
                  sx={{ mb: 2 }}
                />
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </form>
            </Container>
          </Box>
        </>
      )}
    </Box>
  );
};

export default CreateDocument;
