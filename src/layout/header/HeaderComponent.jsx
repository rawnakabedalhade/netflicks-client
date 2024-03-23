import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MenuItem from "@mui/material/MenuItem";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Links from "./Links";
import { Switch, Hidden } from "@mui/material"; // Import Hidden component
import SearchDiv from "./search";
import { useState } from "react"; // Import useState hook
import loginContext from "../../store/loginContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import ROUTES from "../../routes/ROUTES";

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
            <SearchDiv />
            <Box
              sx={{
                my: 2,
                p: 1,
                display: { xs: "none" },
              }}
            >
              <Typography
                sx={{
                  display: { xs: "none", md: "inline", color: "white" },
                  mr: 2,
                }}
              >
                {isDarkTheme ? "Dark" : "Light"}
              </Typography>
              <Switch checked={isDarkTheme} onChange={handleThemeChange} />
            </Box>
            <Box sx={{ flexGrow: 1 }} />
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
                <PersonOutlineIcon sx={{ fontSize: "30px", color: "white" }} />
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
