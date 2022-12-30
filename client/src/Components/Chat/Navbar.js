import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from "react-router-dom";
import userImage from "../../Resources/ProfilePicture.jpg";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: "2rem",
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '30ch',
    },
  },
}));

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

  const navigate = useNavigate();
  
  const logoutHandler = (e) => {
    e.preventDefault();
    navigate("/");
  }

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
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
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
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>

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