import React, { useState, useEffect } from "react";
import { Box, LinearProgress } from "@mui/material";
import DisplayTable from "../../../../utils/DisplayTable";
import AdminAPI from "../../../../utils/AdminApi/AdminApi";
import { useDispatch } from 'react-redux';
import { ShowToast } from "../../../../store/slices/toastSlice";
import { useNavigate } from "react-router-dom";

const Projects = () => {
  const dispatch = useDispatch();
  const [projects, setProjects] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalDataLength, setTotalDataLength] = useState(200);
  const excluded = ['_id','__v','clientId','documents'] 
  const navigate = useNavigate()

  const fetchProjectsFromApi = async () => {
    setLoading(true)
    try {
      const data = {
        page: page,
        limit: 10,
      };
      const response = await AdminAPI.getAllProjects(data);
      console.log(response,"res")
      if (response.success) {
        const newProjects = response.data.projects.map(project => {
          console.log(project)
          const startDate = new Date(project.projectStartDate).toLocaleDateString();
          const endDate = new Date(project.projectEndDate).toLocaleDateString();
          const Client = `${project.clientId.FirstName} ${project.clientId.lastName}`
          return {
            ...project,
            projectStartDate: startDate,
            projectEndDate: endDate,
            client:Client
          };
        });
        
        setProjects(newProjects);
        setTotalDataLength(response.data.pagination.totalPages);
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
    finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchProjectsFromApi()
  }, [page]);

  const handleRowClick = (project) => {
    console.log("Clicked project with ID:", project);
    navigate(`./documents/${project._id}`)
  };

  return (
    <Box width="100%" height="100%" display="flex" flexDirection="column">
      <h2>Projects</h2>
      <Box flex="1" overflow="hidden">
        {isLoading ? (
          <LinearProgress />
        ) : (
          <DisplayTable
            excluded={excluded}
            data={projects}
            onRowClick={handleRowClick}
            page={page}
            setPage={setPage}
            totalDataLength={totalDataLength}
          />
        )}
      </Box>
    </Box>
  );
};

export default Projects;
