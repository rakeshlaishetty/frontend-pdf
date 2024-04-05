import React, { useState, useEffect } from "react";
import { Box, LinearProgress } from "@mui/material";
import DisplayTable from "../../../../utils/DisplayTable";
import AdminAPI from "../../../../utils/AdminApi/AdminApi";
import { useDispatch } from "react-redux";
import { ShowToast } from "../../../../store/slices/toastSlice";
import { useParams } from "react-router-dom";

const ProjectDocuments = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [projects, setProjects] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalDataLength, setTotalDataLength] = useState(200);
  const excluded = ["_id", "__v", "Project"];

  const fetchProjectsFromApi = async () => {
    setLoading(true);
    try {
      const data = {
        page: page,
        limit: 10,
        projectId: id,
      };
      const response = await AdminAPI.getAllDocumentsforProject(data);
      console.log(response, "res");
      if (response.success) {
        const newProjects = response.data.documents.map((project) => {
          return {
            ...project,
          };
        });
        console.log(
          response.data.pagination.totalPages,
          "response.data.pagination.totalPages"
        );
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjectsFromApi();
  }, [page]);

  const handleRowClick = (projectId) => {
    console.log("Clicked project with ID:", projectId);
  };

  return (
    <Box width="100%" height="100%" display="flex" flexDirection="column">
      <h2>Documents</h2>
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

export default ProjectDocuments;
