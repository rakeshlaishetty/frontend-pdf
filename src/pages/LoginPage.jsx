import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  Stack,
  TextField,
  Typography,
  circularProgressClasses,
  colors,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Images } from "../assets";
import { Link, useNavigate } from "react-router-dom";
import loginService from "../utils/apis/login";
import Animate from "../components/common/Animate";
import {adduserDetailsWithJwt} from "../store/slices/userSlice"
import { useDispatch,useSelector } from "react-redux";
import { ShowToast } from "../store/slices/toastSlice"


const LoginPage = () => {

  const userData = useSelector((state)=> {
    return state.userData
  })

  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [formData, setformData] = useState({ email: "", password: "" });
  const [onRequest, setOnRequest] = useState(false);
  const [loginProgress, setLoginProgress] = useState(0);

  const onChangeHandlder = (e) => {
    const { name, value } = e.target;
    console.log(name)
    setformData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  
  
  useEffect(() => {
    if (userData.token) {
      const roleName = userData.user.role.roleName;
      // Define your role-based routes
      const roleRoutes = {
        analyst: "/analyst",
        admin: "/admin",
        client: "/client",
        employee: "/employee"
      };
      // Redirect user based on their role
      navigate(roleRoutes[roleName] || "/", { replace: true });
    }
  }, [userData, navigate]);

  
  const onSignin = async (e) => {
    e.preventDefault();
    setOnRequest(true);
  
    const interval = setInterval(() => {
      setLoginProgress((prev) => prev + 100 / 40);
    }, 50);
  
    setTimeout(() => {
      clearInterval(interval);
    }, 2000);
  
    try {
      const data = await loginService.login(formData);
      if (data.success) {
        dispatch(adduserDetailsWithJwt(data.data));
        dispatch(ShowToast({message:"Successfully Logged in",boolean:true,icon:'success'}))
        localStorage.setItem('user', JSON.stringify(data.data));
        setTimeout(() => {
          navigate(`../${data.data.user.role.roleName}`);
        }, 3300);
      } else {

        throw new Error(data || "something Went Wrong")
        // alert("Sorry, login failed. Please try again.");
      }
    } catch (error) {
      console.log(error,"ERR")
      dispatch(ShowToast({message:(error.message || "something Went Wrong"),boolean:true,icon:'error'}))
    } finally {
      setLoginProgress(0)
      setOnRequest(false);
    }
  };

  

  return (
    <Box
      position="relative"
      height="100vh"
      sx={{ "::-webkit-scrollbar": { display: "none" } }}
    >
      {/* background box */}
      <Box
        sx={{
          position: "absolute",
          right: 0,
          height: "100%",
          width: "70%",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url(${Images.loginBg})`,
        }}
      />
      {/* background box */}

      {/* Login form */}
      <Box
        sx={{
          position: "absolute",
          left: 0,
          height: "100%",
          width:  { xl: "30%", lg: "40%", md: "50%", xs: "100%" },
          transition: "all 1s ease-in-out",
          bgcolor: colors.common.white,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            opacity: 1,
            transition: "all 0.3s ease-in-out",
            height: "100%",
            "::-webkit-scrollbar": { display: "none" },
          }}
        >
          {/* logo */}
          <Box sx={{ textAlign: "center", p: 5 }}>
            <Animate type="fade" delay={0.5}>
              <img src={Images.logo} alt="logo" height={60}></img>
            </Animate>
          </Box>
          {/* logo */}

          {/* form */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              "::-webkit-scrollbar": { display: "none" },
            }}
          >
            <Animate type="fade" sx={{ maxWidth: 400, width: "100%" }}>
              <Box
                component="form"
                maxWidth={400}
                width="100%"
                onSubmit={onSignin}
              >
                <Stack spacing={3}>
                  <TextField
                    label="username"
                    fullWidth
                    name='email'
                    value={formData.email}
                    onChange={onChangeHandlder}
                  />
                  <TextField
                    label="password"
                    type="password"
                    fullWidth
                    name="password"
                    value={formData.password}
                    onChange={onChangeHandlder}
                  />
                  <Button
                    type="submit"
                    size="large"
                    variant="contained"
                    color="success"
                  >
                    sign in
                  </Button>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Remember me"
                      />
                    </FormGroup>
                    <Typography color="error" fontWeight="bold">
                      <Link to="#">Forgot password?</Link>
                    </Typography>
                  </Stack>
                </Stack>
              </Box>
            </Animate>
          </Box>
          {/* form */}

          {/* footer */}
          <Box sx={{ textAlign: "center", p: 5, zIndex: 2 }}>
            <Animate type="fade" delay={1}>
              <Typography
                display="inline"
                fontWeight="bold"
                sx={{ "& > a": { color: colors.red[900], ml: "5px" } }}
              >
                Don't have an account -<Link to="#">Register now</Link>
              </Typography>
            </Animate>
          </Box>
          {/* footer */}

          {/* loading box */}
          {onRequest && (
            <Stack
              alignItems="center"
              justifyContent="center"
              sx={{
                height: "100%",
                width: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                bgcolor: colors.common.white,
                zIndex: 1000,
              }}
            >
              <Box position="relative">
                <CircularProgress
                  variant="determinate"
                  sx={{ color: colors.grey[200] }}
                  size={100}
                  value={100}
                />
                <CircularProgress
                  variant="determinate"
                  disableShrink
                  value={loginProgress}
                  size={100}
                  sx={{
                    [`& .${circularProgressClasses.circle}`]: {
                      strokeLinecap: "round",
                    },
                    position: "absolute",
                    left: 0,
                    color: colors.green[600],
                  }}
                />
              </Box>
            </Stack>
          )}
          {/* loading box */}
        </Box>
      </Box>
      {/* Login form */}
    </Box>
  );
};

export default LoginPage;
