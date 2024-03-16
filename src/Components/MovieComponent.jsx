import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  CardActionArea,
  CardMedia,
  Divider,
  IconButton,
  Box,
} from "@mui/material";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import loginContext from "../store/loginContext";
import { useNavigate, useLocation } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
import "../styles/movie.css";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ModeIcon from "@mui/icons-material/Mode";

const MovieComponent = ({
  title,
  img,
  id,
  liked,
  onDelete,
  onEdit,
  onFavorite,
}) => {
  let { login } = useContext(loginContext);
  const navigate = useNavigate();
  let location = useLocation();
  const handleDeleteClick = () => {
    onDelete(id);
  };
  const handleEditeClick = () => {
    onEdit(id);
  };

  const handleFavoriteClick = () => {
    onFavorite(id);
  };
  return (
    <Card square raised className="cards">
      <CardActionArea>
        <CardMedia
          component="img"
          height={200}
          image={img}
          alt="image"
          onClick={() => navigate(`${ROUTES.MOVIEDETAILS}/${id}`)}
        />
        <CardHeader
          title={title}
          className="heading"
          sx={{ height: "18px", mt: 2 }}
        ></CardHeader>
        <CardContent sx={{ height: 30 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
              {((login && login.isAdmin) ||
                location.pathname === ROUTES.MYMOVIES) && (
                <IconButton onClick={handleDeleteClick}>
                  <DeleteIcon style={{ color: "black" }} />
                </IconButton>
              )}
              {((login && location.pathname === ROUTES.MYMOVIES) ||
                login?.isAdmin) && (
                <IconButton onClick={handleEditeClick}>
                  <ModeIcon style={{ color: "black" }} />
                </IconButton>
              )}
            </Box>
            <Box>
              {login && (
                <IconButton
                  onClick={handleFavoriteClick}
                  sx={{ bgcolor: "#db0000", borderRadius: 2 }}
                >
                  <FavoriteIcon style={{ color: liked ? "black" : "white" }} />
                </IconButton>
              )}
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
MovieComponent.propTypes = {
  title: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  liked: PropTypes.bool,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  onFavorite: PropTypes.func,
};
export default MovieComponent;
