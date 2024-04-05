import React, { useState, useEffect } from "react";
import { Box, LinearProgress } from "@mui/material";
import DisplayTable from "../../../../utils/DisplayTable";
import AdminAPI from "../../../../utils/AdminApi/AdminApi";
import { useDispatch } from "react-redux";
import { ShowToast } from "../../../../store/slices/toastSlice";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";

const DocumentsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [projects, setProjects] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalDataLength, setTotalDataLength] = useState(200);
  const excluded = ["_id", "__v", "Project"];

  const fetchDocumentsFromApi = async () => {
    setLoading(true);
    try {
      const data = {
        page: page,
        limit: 10,
      };
      const response = await AdminAPI.getAllDocumentsforProject(data);
      console.log(response, "res");
      if (response.success) {
        const newProjects = response.data.documents.length !== 0 ? response.data.documents.map((project) => {
          return {
            ...project,
          };
        }): []
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
    fetchDocumentsFromApi(); // eslint-disable-line react-hooks/exhaustive-deps
}, [page]);


  const handleRowClick = (projectId) => {
    console.log("Clicked project with ID:", projectId);
  };

  const GotDocumentPage = () => {
        navigate("./createdoucment")
  }

  return (
    <Box width="100%" height="100%" display="flex" flexDirection="column">
    <Box width="100%" display="flex" flexDirection="row" justifyContent={"space-between"} alignItems={"center"} marginRight={'35px'}>
      <h2>Documents</h2> <span style={{display:"flex",alignItems:"center",gap:5,fontWeight:"bold",color:"black",alignItems:"flex-end",cursor:"pointer"}} onClick={GotDocumentPage}><AddIcon  />New Document</span>
    </Box>
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

export default DocumentsList;
