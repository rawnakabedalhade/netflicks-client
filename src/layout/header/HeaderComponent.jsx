import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Badge,
  Container,
  Switch,
  Hidden,
} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MenuIcon from "@mui/icons-material/Menu";
import Links from "./Links";
import SearchDiv from "./search";
import { useState, useContext } from "react"; // Import useState hook
import loginContext from "../../store/loginContext";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import Brightness5Icon from "@mui/icons-material/Brightness5";

import favMoviesCountContext from "../../store/favMoviesCount";
import LeftDrawer from "../../pages/Home/LeftDrawer";

const pages = ["Movies", "About Us", "Contact Us"];
const settings = ["Profile", "Logout"];

const HeaderComponent = ({ isDarkTheme, onThemeChange }) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [isOpen, setIsOpen] = useState(false); // Define isOpen state
  const { setLogin } = useContext(loginContext);
  const { favMoviesCount } = useContext(favMoviesCountContext);
  const navigate = useNavigate();
  let location = useLocation();

  const handleThemeChange = (event) => {
    onThemeChange(event.target.checked);
  };

  const handleOpenDrawerClick = () => {
    setIsOpen(true);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleCloseDrawerClick = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    setLogin(null);
    toast.success("LoggedOut Successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    localStorage.clear();
    navigate(ROUTES.LOGIN);
  };

  const handleProfile = () => {
    navigate(ROUTES.PROFILE);
  };

  const handleFavorite = () => {
    navigate(ROUTES.FAVMOVIES);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "black" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Hidden mdUp>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 2 }}
                onClick={handleOpenDrawerClick}
              >
                <MenuIcon sx={{ color: "white" }} />
              </IconButton>
            </Hidden>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: "",
                color: "#db0000",
                textDecoration: "none",
                display: { xs: "none", md: "block" },
              }}
            >
              NetFlicks
            </Typography>
            <Links />
            {location.pathname !== ROUTES.LOGIN &&
              location.pathname !== ROUTES.REGISTER && <SearchDiv />}
            {location.pathname !== ROUTES.LOGIN &&
              location.pathname !== ROUTES.REGISTER && (
                <Box
                  sx={{
                    my: 2,
                    p: 1,
                    display: { xs: "none", md: "flex" },
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      display: { xs: "none", md: "inline" },
                      mr: 1,
                      color: "white",
                    }}
                  >
                    {isDarkTheme ? "Dark" : "Light"}
                  </Typography>
                  <Switch
                    checked={isDarkTheme}
                    onChange={handleThemeChange}
                    color="default"
                    icon={
                      <Brightness5Icon sx={{ fontSize: "25px" }} /> // Light mode icon
                    }
                    checkedIcon={
                      <NightsStayIcon sx={{ fontSize: "25px" }} /> // Dark mode icon
                    }
                  />
                </Box>
              )}
            <Box sx={{ flexGrow: 1 }} />
            {location.pathname !== ROUTES.LOGIN &&
              location.pathname !== ROUTES.REGISTER && (
                <Box
                  sx={{
                    display: { xs: "none", md: "flex" },
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <IconButton onClick={handleFavorite}>
                    <FavoriteIcon sx={{ fontSize: "30px", color: "white" }} />
                    {favMoviesCount > 0 && (
                      <Badge
                        badgeContent={favMoviesCount}
                        color="error"
                        sx={{
                          position: "absolute",
                          top: 9,
                          right: 9,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      />
                    )}
                  </IconButton>
                  <IconButton onClick={handleOpenUserMenu}>
                    <PersonOutlineIcon
                      sx={{ fontSize: "30px", color: "white" }}
                    />
                  </IconButton>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map((setting) => (
                      <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        <Typography
                          textAlign="center"
                          onClick={() => {
                            if (setting === "Profile") {
                              handleProfile();
                            } else if (setting === "Logout") {
                              handleLogout();
                            }
                          }}
                        >
                          {setting}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              )}
          </Toolbar>
        </Container>
      </AppBar>
      <Hidden mdUp>
        <LeftDrawer isOpen={isOpen} onCloseDrawer={handleCloseDrawerClick} />
      </Hidden>
    </Box>
  );
};

export default HeaderComponent;
