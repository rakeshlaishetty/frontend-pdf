import { Box, Paper } from '@mui/material'
import React,{useState} from 'react'
import Sidebar from "../common/Sidebar"
import { Outlet } from 'react-router-dom'
import { FaBarsStaggered } from "react-icons/fa6";
import Profile from "../common/Profile"
import { useDispatch } from 'react-redux';
import { toggle } from "../../store/slices/navSlice"
import { useSelector } from 'react-redux';



const TopbarHeight = 70

const MainLayout = () => {
  const navState = useSelector((state)=> {
    return state.navbar
  })
  console.log(navState,'navState')
 
  const dispatch = useDispatch()
  
  const ChangeSidebar = () => {
    dispatch(toggle())
  }
  
  return (
    <Box display={'flex'} flexDirection="column" height="100vh">
      {/* Sidebar and Main Content */}
      <Box display="flex" flexGrow={1}>
        {/* Sidebar */}
        <Paper sx={{ 
            bgcolor: 'primary.secondary'
          }}>

        <Sidebar SidebarWidth={navState.isOpen ? 350 : 0}/>
          </Paper>
        
        {/* Main Content Area */}
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Top Bar */}
          <Paper sx={{ 
            bgcolor: 'primary.secondary', 
            color: 'black', 
            p: 3, 
            height: `${TopbarHeight}px`, 
            width: `100%`, 
            mb: 3,
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center'
          }}>
          <Box sx={{margin:'2px',cursor:'pointer',display:'flex'}}>
          <FaBarsStaggered size={24} onClick={ChangeSidebar}/>
          </Box>
            <Box>
              <Profile />
            </Box>
          </Paper>
          
          {/* Main Content */}
          <Paper component={'main'} sx={{ flexGrow: 1, p: 3 }}>
            <Outlet />
          </Paper>
        </Box>
      </Box>
    </Box>
  )
}

export default MainLayout
