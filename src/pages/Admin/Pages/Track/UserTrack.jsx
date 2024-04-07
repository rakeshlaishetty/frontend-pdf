import React, { useState, useEffect } from "react";
import { Box, LinearProgress } from "@mui/material";
import DisplayTable from "../../../../utils/DisplayTable";
import AdminAPI from "../../../../utils/AdminApi/AdminApi";
import { useDispatch } from "react-redux";
import { ShowToast } from "../../../../store/slices/toastSlice";
import { useNavigate } from "react-router-dom";
import {  Select, MenuItem } from "@mui/material";
import { useParams } from "react-router-dom";

function UserTrack() {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [userId, setuserId] = useState("admin");
  const [userRole, setUserRole] = useState("admin");
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalDataLength, setTotalDataLength] = useState(200);
  const excluded = ["_id", "__v", "Project", "Assigned","role","projects"];
  const [projectData, setProjectData] = useState(null);

  console.log(projectId,'projectId')
  
  if(projectId) {
    setuserId(projectId._id)
  }

  const fetchUserFromApi = async () => {
    setLoading(true);
    try {
        const data = {
            userId: userId
        };
        const response = await AdminAPI.getOneUser(data);
        console.log(response, "res");
        // if (response.success) {
        //     const newUsers = response.data.userIds.length !== 0 ? response.data.userIds.map((user) => {
        //         return {
        //             ...user,
        //             roleName:user.role.roleName
        //         };
        //     }) : []
        //     setUsers(newUsers);
        //     setTotalDataLength(response.data.pagination.totalPages);
        // }
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
    fetchUserFromApi();
}, [userId]);

  return (
    <div>
      <h1>UserTrack Component</h1>

      <p>GET INFORMAION HEE  DOCUMENTS IN TABLE AN I FCLICK ON DOCUMENMT S SHOW MODAL </p>
      {projectData ? (
        <div>
          <h2>Project Name: {projectData.name}</h2>
          {/* Display other project details */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default UserTrack;
