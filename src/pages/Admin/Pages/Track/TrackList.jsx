import React, { useState, useEffect } from "react";
import { Box, LinearProgress } from "@mui/material";
import DisplayTable from "../../../../utils/DisplayTable";
import AdminAPI from "../../../../utils/AdminApi/AdminApi";
import { useDispatch } from "react-redux";
import { ShowToast } from "../../../../store/slices/toastSlice";
import { useNavigate } from "react-router-dom";
import {  Select, MenuItem } from "@mui/material";

const TrackList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [userRole, setUserRole] = useState("admin");
    const [users, setUsers] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalDataLength, setTotalDataLength] = useState(200);
    const excluded = ["_id", "__v", "Project", "Assigned","role","projects"];

    const fetchUserssFromApi = async () => {
        setLoading(true);
        try {
            const data = {
                page: page,
                limit: 10,
                userRole: userRole
            };
            const response = await AdminAPI.getAllFilteredUseres(data);
            console.log(response, "res");
            if (response.success) {
                const newUsers = response.data.userIds.length !== 0 ? response.data.userIds.map((user) => {
                    return {
                        ...user,
                        roleName:user.role.roleName
                    };
                }) : []
                setUsers(newUsers);
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
        fetchUserssFromApi();
    }, [userRole, page]);


    const handleRowClick = (projectId) => {
        console.log("Clicked project with ID:", projectId);
        navigate("./trackuser",{ state: projectId })
    };

    const GotDocumentPage = () => {
        navigate("./trackuser")
    }

    return (
        <Box width="100%" height="100%" display="flex" flexDirection="column">
            <Box width="100%" display="flex" flexDirection="row" justifyContent={"space-between"} alignItems={"center"} marginRight={'35px'}>
                <h2>Users</h2> <span style={{ display: "flex", alignItems: "center", gap: 5, fontWeight: "bold", color: "black", alignItems: "flex-end", cursor: "pointer" }}>
                    <Select value={userRole} onChange={(e) => setUserRole(e.target.value)}>
                        <MenuItem value="admin">Admin</MenuItem>
                        <MenuItem value="analyst">analyst</MenuItem>
                        <MenuItem value="employee">employee</MenuItem>
                        <MenuItem value="client">client</MenuItem>
                    </Select>

                </span>
            </Box>
            <Box flex="1" overflow="hidden">
                {isLoading ? (
                    <LinearProgress />
                ) : (
                    <DisplayTable
                        excluded={excluded}
                        data={users}
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

export default TrackList;
