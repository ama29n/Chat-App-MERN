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
import Drawer from '@mui/material/Drawer';
import { Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
// import userImage from "../../Resources/ProfilePicture.jpg";
import { useSelector, useDispatch } from "react-redux";
import { authActions, chatActions, userActions, notificationActions } from '../../Store/store';

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
  
  const notifications = useSelector((state) => state.notification.notifications);
  console.log(notifications);

  const [notififcationDrawer, setNotificationDrawer] = React.useState(false);
  const toggleDrawer = () => {
    dispatch(notificationActions.setNotifications([]));
    setNotificationDrawer(false);
  };
  const openNotificationDrawer = () => {
    setNotificationDrawer(true);
    handleMobileMenuClose();
  };

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
          <Box padding="2rem 2rem 0 2rem" fontSize="1.2rem" color="#212529">Your Profile</Box>
          <Box display="flex" gap="2rem" alignItems="center" padding="2rem">
            <Box width="150px" height="150px"><img style={{ width: "100%", height: "auto", borderRadius: "50%" }} src={user.profilePhoto} alt="user"/></Box>
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
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={openNotificationDrawer}>
        <IconButton size="large" color="inherit">
          <Badge badgeContent={notifications.length} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p style={{ marginLeft: "1rem" }}>Notifications</p>
      </MenuItem>

      <Drawer anchor="right" open={notififcationDrawer} onClose={toggleDrawer}>
        <Box width="300px">
          <Box
            sx={{
              fontSize: "1.5rem",
              fontWeight: "400",
              color: "#212529",
              padding: "0.75rem 1rem"
            }}
          >
            Notifications
          </Box>
          {notifications.length === 0 && (
            <p style={{ color: "#495057", paddingLeft: "1rem" }}>No unread messages</p>
          )}
          {notifications.length > 0 && (
            <Box>
              {notifications.map((notif) => {
                return (
                  <>
                    <Box sx={__ChatListItem_box} key={notif.chat._id} myPersonalData={notif.chat}>
                      <Box id={notif.chat._id} width="50px" height="50px">
                        <img
                          id={notif.chat._id}
                          alt="user"
                          src={notif.sender.profilePhoto}
                          style={{ height: "auto", width: "100%", borderRadius: "50%" }}
                        />
                      </Box>

                      <Box>
                        <p id={notif.chat._id} style={{ fontSize: "14px", fontWeight: "400", color: "#212529" }}>{notif.sender.name}</p>
                        <Box width="140px" sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}><p id={notif.chat._id} style={{ fontSize: "14px", fontWeight: "400", color: "#495057" }}>{notif.content}</p></Box>
                      </Box>
                    </Box>
                    <Divider />
                  </>
                );
              })}
            </Box>
          )}
        </Box>
      </Drawer>

      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton size="large" onClick={handleProfileMenuOpen}>
          <Box width="30px" height="30px">
            <img
              style={{ width: "100%", height: "auto", borderRadius: "50%" }}
              src={user.profilePhoto}
              alt="user"
            />
          </Box>
        </IconButton>
        <p style={{ marginLeft: "1rem" }}>Profile</p>
      </MenuItem>
    </Menu>
  );

  // ..............................................................................................................................................................................................................................................................

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* Logo */}
          <Typography variant="h6" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block', fontFamily: "'Oleo Script Swash Caps', cursive", fontSize: "2rem" } }}>Hi You</Typography>
          <Box sx={{ flexGrow: 1 }} />
          {/* Search Input field */}
          

          {/* Space between search input field and left side icons */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Left side icons */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: "center", gap: "1rem" }}>
            <IconButton size="large" color="inherit"><Badge badgeContent={notifications.length} onClick={openNotificationDrawer} color="error"><NotificationsIcon /></Badge></IconButton>
            {/* <IconButton size="large" edge="end"  onClick={handleProfileMenuOpen} color="inherit"><AccountCircle /></IconButton> */}
            <IconButton size="large" edge="end" onClick={handleProfileMenuOpen}><Box width="30px" height="30px"><img style={{ width: "100%", height: "auto", borderRadius: "50%" }} src={user.profilePhoto} alt="user"/></Box></IconButton>
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

const __ChatListItem_box = {
  display: "flex",
  padding: "0.75rem 1rem",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: "1rem",
  color: "black",
  cursor: "pointer",
};