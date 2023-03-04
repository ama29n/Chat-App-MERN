import * as React from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Badge, MenuItem, Menu, Button, Dialog, DialogActions, Drawer, Tooltip } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions, chatActions, notificationActions, userActions } from '../../Store/store';
import GroupProfilePicture from "../../Resources/GroupProfilePicture.jpg";

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

  // State for dialog of profile
  const [open, setOpen] = React.useState(false);
  // Function to open profile dialog
  const handleClickOpen = () => {
    setAnchorEl(false);
    setOpen(true);
  };
  // Function to close dialog
  const handleClose = () => {
    setOpen(false);
  };

  // Custom hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Fetch notifications from store
  const notifications = useSelector((state) => state.notification.notifications);
  // State for notification drawer
  const [notififcationDrawer, setNotificationDrawer] = React.useState(false);
  // Function to close drawer
  const closeNotificationDrawer = () => {
    dispatch(notificationActions.setNotifications([]));
    setNotificationDrawer(false);
  };
  // Function to close notification drawer
  const openNotificationDrawer = () => {
    setNotificationDrawer(true);
    // Close the profile and notification menu dialog
    handleMobileMenuClose();
  };
  // Fetch user from store
  const user = useSelector((state) => {
    return state.user;
  });
  // Logout Handler
  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(userActions.deleteUser());
    dispatch(authActions.logout());
    dispatch(chatActions.clear());
    navigate("/");
  }

  // .............................................................................................................................................................................................................................................................

  // Desktop Menu
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
      
      {/* View profile  */}

      <Dialog open={open} onClose={handleClose} >
          <Box textAlign="center" padding="2rem 2rem 0 2rem" fontSize="1.2rem" color="#212529">My Profile</Box>
          <Box display="flex" gap="2rem" alignItems="center" flexDirection="column" padding="2rem">
            <Box width="150px" height="150px"><img style={{ width: "100%", height: "auto", borderRadius: "50%" }} src={user.profilePhoto} alt="user"/></Box>
            <Box textAlign="center">
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
  
  // Mobile Menu
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

      {/* Drawer  */}
      <Drawer anchor="right" open={notififcationDrawer} onClose={closeNotificationDrawer}>
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
                const selectChatHandler = (e) => {
                  dispatch(chatActions.setSelectedChat(notif.chat));
                  setNotificationDrawer(false);
                }
                var createdAt = notif.createdAt;
                var s = new Date(createdAt).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'});
                let idx = s.length - 2;
                let arr = s.split("");
                arr.splice(idx - 4, 3);
                s = arr.join("");
                return (
                  <div key={notif.chat._id}>
                    <Box sx={__ChatListItem_box} key={notif.chat._id} id={notif.chat._id} onClick={selectChatHandler}>
                      <Box id={notif.chat._id} width="50px" height="50px">
                        <img
                          id={notif.chat._id}
                          alt="user"
                          src={notif.chat.isGroupChat ? GroupProfilePicture : notif.sender.profilePhoto}
                          style={{ height: "auto", width: "100%", borderRadius: "50%", border: "2px solid #d6d6d7" }}
                        />
                      </Box>

                      <Box>
                        <p id={notif.chat._id} style={{ fontSize: "14px", fontWeight: "600", color: "#212529" }}>{notif.chat.isGroupChat ? notif.chat.chatName : notif.sender.name}</p>
                        {notif.chat.isGroupChat && <p id={notif.chat._id} style={{ fontSize: "14px", fontWeight: "400", color: "#212529" }}>- {notif.sender.name}</p>}
                        <Box width="200px" sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}><p id={notif.chat._id} style={{ fontSize: "14px", fontWeight: "400", color: "#495057" }}>{notif.content}</p></Box>
                        <Box style={{
                          marginTop: "10px",
                          fontSize: "10px",
                          fontWeight: "600",
                          color: "#495057",
                        }}>{s}</Box>
                      </Box>
                    </Box>
                    <Divider />
                  </div>
                );
              })}
            </Box>
          )}
        </Box>
      </Drawer>
    {/* Mobile menu closing  */}
    </Menu>
  );

  // ..............................................................................................................................................................................................................................................................

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* Logo */}
          <Typography variant="h6" noWrap component="div" sx={{ display: { sm: 'block', fontFamily: "'Oleo Script Swash Caps', cursive", fontSize: "2rem" } }}>Hi You</Typography>
          <Box sx={{ flexGrow: 1 }} />
          {/* Search Input field */}

          {/* Space between search input field and left side icons */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Left side icons */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: "center", gap: "1rem" }}>
            <Tooltip title="Notifications"><IconButton onClick={openNotificationDrawer} size="large" color="inherit"><Badge badgeContent={notifications.length} color="error"><NotificationsIcon /></Badge></IconButton></Tooltip>
            {/* <IconButton size="large" edge="end"  onClick={handleProfileMenuOpen} color="inherit"><AccountCircle /></IconButton> */}
            <Tooltip title="options"><IconButton size="large" edge="end" onClick={handleProfileMenuOpen}><Box width="30px" height="30px"><img style={{ width: "100%", height: "auto", borderRadius: "50%" }} src={user.profilePhoto} alt="user"/></Box></IconButton></Tooltip>
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