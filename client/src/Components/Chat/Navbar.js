import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { useNavigate } from "react-router-dom";
import userImage from "../../Resources/ProfilePicture.jpg";
import { useSelector, useDispatch } from "react-redux";
import { authActions, chatActions, userActions } from '../../Store/store';

// ......................................................................................................................................

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setAnchorEl(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => {
    return state.user;
  });

  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(userActions.deleteUser());
    dispatch(authActions.logout());
    dispatch(chatActions.clear());
    navigate("/");
  }

  // .............................................................................................................................................................................................................................................................

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleClickOpen}>Profile</MenuItem>
      <Dialog open={open} onClose={handleClose} >
          <Box display="flex" gap="2rem" alignItems="center" padding="2rem">
            <Box width="150px" height="150px"><img style={{ width: "100%", height: "auto", borderRadius: "50%" }} src={userImage} alt="user"/></Box>
            <Box>
              <p style={{ fontSize: "2rem", color: "#212529"}}>{user.name}</p>
              <p style={{ fontSize: "1.2rem", fontWeight: "400", color: "#495057" }}>{user.email}</p>
            </Box>
          </Box>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
      <MenuItem onClick={logoutHandler}>Log out</MenuItem>
    </Menu>
  );

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" color="inherit"><Badge badgeContent={17} color="error"><NotificationsIcon /></Badge></IconButton>
        <p style={{ marginLeft: "1rem"}}>Notifications</p>
      </MenuItem>

      <MenuItem onClick={handleProfileMenuOpen}>
      <IconButton size="large" onClick={handleProfileMenuOpen}><Box width="30px" height="30px"><img style={{ width: "100%", height: "auto", borderRadius: "50%" }} src={userImage} alt="user"/></Box></IconButton>
        <p style={{ marginLeft: "1rem"}}>Profile</p>
      </MenuItem>

    </Menu>
  );

  // ..............................................................................................................................................................................................................................................................

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* Logo */}
          <Typography variant="h6" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block', fontFamily: "'Oleo Script Swash Caps', cursive", fontSize: "2rem" } }}>Chat App</Typography>
          <Box sx={{ flexGrow: 1 }} />
          {/* Search Input field */}
          

          {/* Space between search input field and left side icons */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Left side icons */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: "center", gap: "1rem" }}>
            <IconButton size="large" color="inherit"><Badge badgeContent={17} color="error"><NotificationsIcon /></Badge></IconButton>
            {/* <IconButton size="large" edge="end"  onClick={handleProfileMenuOpen} color="inherit"><AccountCircle /></IconButton> */}
            <IconButton size="large" edge="end" onClick={handleProfileMenuOpen}><Box width="30px" height="30px"><img style={{ width: "100%", height: "auto", borderRadius: "50%" }} src={userImage} alt="user"/></Box></IconButton>
          </Box>

          {/* For small screens */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton size="large" onClick={handleMobileMenuOpen} color="inherit">
              <MoreIcon />
            </IconButton>
          </Box>
          
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}