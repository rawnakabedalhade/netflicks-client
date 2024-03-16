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
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Links from "./Links";
import { Switch } from "@mui/material";
import SearchDiv from "./search";
import loginContext from "../../store/loginContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import ROUTES from "../../routes/ROUTES";

import favMoviesCountContext from "../../store/favMoviesCount";

const pages = ["Movies", "About Us", "Contact Us"];
const settings = ["Profile", "Logout"];

const HeaderComponent = ({ isDarkTheme, onThemeChange }) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { setLogin } = useContext(loginContext);
  const { favMoviesCount } = useContext(favMoviesCountContext);
  const navigate = useNavigate();

  const handleThemeChange = (event) => {
    onThemeChange(event.target.checked);
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
    <AppBar position="static" sx={{ backgroundColor: "black" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "#c1071e",
              textDecoration: "none",
            }}
          >
            NetFlicks
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "#c1071e",
              textDecoration: "none",
            }}
          >
            NetFlicks
          </Typography>
          <SearchDiv />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography
                sx={{ display: { xs: "none", md: "inline", color: "white" } }}
              >
                {isDarkTheme ? "Dark" : "Light"}
              </Typography>
              <Switch checked={isDarkTheme} onChange={handleThemeChange} />
              <Links />
            </Box>

            <Box
              title="Open settings"
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "row",
              }}
            >
              <IconButton onClick={handleOpenUserMenu}>
                <PersonOutlineIcon sx={{ fontSize: "30px", color: "white" }} />
              </IconButton>
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
            </Box>
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
  );
};
export default HeaderComponent;
