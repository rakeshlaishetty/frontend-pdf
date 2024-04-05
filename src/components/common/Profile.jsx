import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import { logoutUser } from '../../store/slices/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null)
  };

  const handleLogOut = () => {
    dispatch(logoutUser());
  }

  const GotoProfile = () => {
    handleClose(null)
    navigate("profile")
  }

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        disableTouchRipple
      >
         <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={GotoProfile}>Profile</MenuItem>
        <MenuItem onClick={handleLogOut}>Logout</MenuItem>
      </Menu>
    </div>
  );
}