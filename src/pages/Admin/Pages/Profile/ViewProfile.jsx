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
import { useDispatch, useSelector } from "react-redux";
import { OverlaySpinner } from "../../../../App";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import profileApi from "../../../../utils/apis/getProfile";
import ProfileUpdate from "../../../../components/common/ProfileUpdate";
import { ShowToast } from "../../../../store/slices/toastSlice";

const Root = styled("div")(({ theme }) => ({
  width: "100%",
  padding: 5,
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  "& > :not(style) ~ :not(style)": {
    marginTop: theme.spacing(4),
  },
}));

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{ marginTop: 0 }}
    >
      {value == index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const ViewProfile = () => {
  const [value, setValue] = React.useState(0);
  const [user,setUser]  = React.useState({})
  const [isLoading,setLoading] = useState(false)

  const dispatch = useDispatch();
  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  const GetUserData = async () => {
    setLoading(true)
    try {
      const response = await profileApi.getRoleService();
      if (response.success) {
        console.log(response.data,"dat")
        setUser(response.data);
      } else {
        throw new Error("Error occured While fecthing Api");
      }
    } catch (error) {
      dispatch(
        ShowToast({
          message: error.message || "something Went Wrong",
          boolean: true,
          icon: "error",
        })
      );
    }finally{
      setLoading(false)
    }
  };


  useEffect(() => {
    GetUserData();
  }, []);

  return isLoading ? <OverlaySpinner /> : (
    <Paper elevation={3} sx={{ minWidth: "100%" }}>
      <Root>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <Tabs
            value={value}
            onChange={handleChangeTab}
            aria-label="disabled tabs example"
          >
            <Tab label="View Profile" />
            <Tab label="Update Profile" />
          </Tabs>
        </Box>
        <Box component="section" sx={{ p: 2, minHeight: "100%" }}>
          <CustomTabPanel value={value} index={0}>
            <Divider sx={{ fontSize: 20, fontWeight: "bold" }}>
              View Profile
            </Divider>
            <Box
              component="section"
              sx={{ p: 2, minHeight: "100%", minWidth: "100%" }}
            >
              <Container>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="h6" align="right">
                      <b>First Name:</b>
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h6">
                      <b>{user.FirstName}</b>
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h6" align="right">
                      <b>Last Name:</b>
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h6">
                      <b>{user.lastName}</b>
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography variant="h6" align="right">
                      <b>Email:</b>
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h6">
                      <b>{user.email}</b>
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h6" align="right">
                      <b>Nick Name</b>
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h6">
                      <b>{user.nickName}</b>
                    </Typography>
                  </Grid>
                </Grid>
              </Container>
            </Box>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <ProfileUpdate userData={user} dispatch={dispatch} ShowToast={ShowToast}/>
          </CustomTabPanel>
        </Box>
      </Root>
    </Paper>
  );
};

export default ViewProfile;
