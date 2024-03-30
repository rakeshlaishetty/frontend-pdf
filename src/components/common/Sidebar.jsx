import { Link, useLocation } from 'react-router-dom';
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
  colors,
} from "@mui/material";
import { Images } from "../../assets";
import Animate from "./Animate";
import useUserRole from '../../utils/useUserRole';


const admin = [
  {
    title: "Dashboard",
    icon: <MailOutlinedIcon />,
    state: "/admin/dashboard",
  },
  {
    title: "Projects",
    icon: <DashboardCustomizeOutlinedIcon />,
    state: "/admin/projects",
  },
  {
    title: "Documents",
    icon: <ChatBubbleOutlineOutlinedIcon />,
    state: "/admin/documents",
  },
  {
    title: "Track",
    icon: <ContentPasteSearchIcon />,
    state: "/admin/track",
  },
  {
    title: "Create Profile",
    icon: <PersonAddAlt1Icon />,
    state: "/admin/createprofile",
  },
];
const analyst = []
const client = []
const employee = [ {
  title: "Dashboard",
  icon: <MailOutlinedIcon />,
  state: "/employee/dashboard",
},]

const menus = {admin,analyst,client,employee}
// const serviceMenus = [
//   {
//     title: "Mortage",
//     icon: <OtherHousesOutlinedIcon />,
//     state: "mortage",
//   },
//   {
//     title: "Car loans",
//     icon: <DirectionsCarFilledOutlinedIcon />,
//     state: "carloan",
//   },
//   {
//     title: "Insurance",
//     icon: <SportsMotorsportsOutlinedIcon />,
//     state: "insurance",
//   },
// ];

// const investmentMenus = [
//   {
//     title: "Stocks reade",
//     icon: <SwapHorizOutlinedIcon />,
//     state: "stocktrade",
//   },
//   {
//     title: "Finance advice",
//     icon: <ChatBubbleOutlineOutlinedIcon />,
//     state: "financeadvice",
//   },
//   {
//     title: "Savings accounts",
//     icon: <SavingsOutlinedIcon />,
//     state: "savingaccount",
//   },
// ];

const Sidebar = ({ SidebarWidth }) => {
  const location = useLocation()
  
  const roleName = useUserRole()
 console.log(menus)
  const menuItems = menus[roleName] || []; // Fallback to an empty array if roleName is invalid

  console.log(menuItems,'menuItems')
  const MenuItem = (props) => {
    return (
      <ListItem
        key={props.idnex}
        disableGutters
        disablePadding
        sx={{ py: 0.5 }}
        component={Link}
        to={`${props.item.state}`}
      >
        <ListItemButton
          sx={{
            borderRadius: "10px",
            bgcolor: props.isActive ? "gray" : "",
            color: props.isActive ? colors.common.white : "",
            "&:hover": {
              bgcolor: props.isActive ? colors.green[600] : "",
              color: props.isActive ? colors.common.white : "",
            },
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: "40px",
              color: props.isActive ? colors.common.white : "",
            }}
          >
            {props.item.icon}
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography fontWeight={600}>{props.item.title}</Typography>
            }
          />
        </ListItemButton>
      </ListItem>
    );
  };
  const drawer = (
    <Box
      padding={3}
      paddingBottom={0}
      display="flex"
      flexDirection="column"
      height="100vh"
      sx={{
        "::-webkit-scrollbar": {
          display: "none"
        }
      }}
    >
      {/* logo */}
      <Box sx={{ textAlign: "center", mb: 2 }}>
        <Animate type="fade" delay={1}>
          <img src={Images.logo} alt="logo" height={60} />
        </Animate>
      </Box>
      {/* logo */}

      <Animate sx={{ flexGrow: 1 }}>
        <Paper
          elevation={0}
          square
          sx={{
            borderTopRightRadius: "10px",
            borderTopLeftRadius: "10px",
            p: 2,
            height: "100%",
            boxShadow: "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px"
          }}
        >
          {/* menu group 1 */}
          <List>
            {menuItems.map((item, index) => (
              <MenuItem
                key={index}
                item={item}
                isActive={item.state === location.pathname}
              />
            ))}
          </List>
          {/* menu group 1 */}

          {/* menu group 2 */}
          {/* <List>
            <ListItem>
              <Typography fontWeight={600} mt={1} color={colors.grey[600]}>
                Services
              </Typography>
            </ListItem>
            {serviceMenus.map((item, index) => (
              <MenuItem
                key={index}
                item={item}
                isActive={item.state === activeState}
              />
            ))}
          </List>
          {/* menu group 2 */}

          {/* menu group 3 */}
          {/* <List>
            <ListItem>
              <Typography fontWeight={600} mt={1} color={colors.grey[600]}>
                Investments
              </Typography>
            </ListItem>
            {investmentMenus.map((item, index) => (
              <MenuItem
                key={index}
                item={item}
                isActive={item.state === activeState}
              />
            ))}
          </List> */}
          {/* menu group 3 */}
        </Paper>
      </Animate>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{
        width: { md: SidebarWidth },
        bgcolor:'rgba(145, 158, 171, 0.12)',
        flexShrink: { md: 0 }
      }}
    >
      {/* large screen */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "none", md: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            transition: 'width 0.3s ease',
            width: SidebarWidth,
            borderWidth: 0,
            bgcolor: "transparent",
            "::-webkit-scrollbar": {
              display: "none"
            }
          }
        }}
        open
      >
        {drawer}
      </Drawer>
      {/* large screen */}
    </Box>
  );
};

export default Sidebar;