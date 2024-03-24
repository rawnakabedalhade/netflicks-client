import { Typography, Divider, IconButton, Box, Grid } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeIcon from "@mui/icons-material/Mode";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PropTypes from "prop-types";
import { useContext } from "react";
import loginContext from "../store/loginContext";
import { useNavigate, useLocation } from "react-router-dom";
import ROUTES from "../routes/ROUTES";

const MoviesDetailsComponent = ({
  title,
  description,
  year,
  director,
  category,
  actors,
  trailer,
  watchLink,
  image,
  id,
  liked,
  onDelete,
  onEdit,
  onFavorite,
}) => {
  const { login } = useContext(loginContext);
  const navigate = useNavigate();
  let location = useLocation();

  const handleDeleteClick = () => {
    onDelete(id);
  };

  const handleEditClick = () => {
    onEdit(id);
  };

  const handleFavoriteClick = () => {
    onFavorite(id);
  };

  return (
    <Grid container spacing={2}>
      {/* Movie Image */}
      <Grid item xs={12} md={4}>
        <img
          src={image}
          alt={image}
          style={{
            maxWidth: "100%",
            height: "90vh",
            margin: 5,
            objectFit: "contain",
          }}
        />
      </Grid>

      {/* Movie Details */}
      <Grid item xs={12} md={8} sx={{ marginTop: 10 }}>
        <Typography
          variant="h3"
          gutterBottom
          sx={{ color: "#333", fontWeight: 600 }}
        >
          {title}
        </Typography>
        <Divider />
        <Typography variant="subtitle1" gutterBottom sx={{ color: "#666" }}>
          Description: {description}
        </Typography>
        <Typography variant="subtitle1" gutterBottom sx={{ color: "#666" }}>
          Year: {year}
        </Typography>
        <Typography variant="subtitle1" gutterBottom sx={{ color: "#666" }}>
          Director: {director}
        </Typography>
        <Typography variant="subtitle1" gutterBottom sx={{ color: "#666" }}>
          Category: {category.join(", ")}
        </Typography>
        <Typography variant="subtitle1" gutterBottom sx={{ color: "#666" }}>
          Actors: {actors.join(", ")}
        </Typography>
        <Typography variant="subtitle1" gutterBottom sx={{ color: "#666" }}>
          Watch Link:{" "}
          <a
            href={watchLink}
            style={{ color: "#007bff", textDecoration: "none" }}
          >
            {watchLink}
          </a>
        </Typography>
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <PlayCircleIcon
            sx={{ fontSize: "30px", marginRight: 1, color: "#db0000" }}
          />
          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{ color: "#333", fontWeight: 600 }}
          >
            Trailer:
          </Typography>
        </Box>
        <Box mt={2} mb={2}>
          <iframe
            width="100%"
            height="315"
            src={trailer}
            title="Trailer"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </Box>

        {/* Action buttons */}
        {login && (
          <Box mt={4}>
            {((login && login.isAdmin) ||
              location.pathname === ROUTES.MYMOVIES) && (
              <IconButton onClick={handleDeleteClick}>
                <DeleteIcon style={{ color: "black" }} />
              </IconButton>
            )}
            {((login && location.pathname === ROUTES.MYMOVIES) ||
              login?.isAdmin) && (
              <IconButton onClick={handleEditClick}>
                <ModeIcon style={{ color: "black" }} />
              </IconButton>
            )}
            {login && (
              <IconButton
                onClick={handleFavoriteClick}
                sx={{ bgcolor: "#db0000", borderRadius: 2 }}
              >
                <FavoriteIcon style={{ color: liked ? "black" : "white" }} />
              </IconButton>
            )}
          </Box>
        )}
      </Grid>
    </Grid>
  );
};

MoviesDetailsComponent.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  director: PropTypes.string.isRequired,
  category: PropTypes.arrayOf(PropTypes.string).isRequired,
  actors: PropTypes.arrayOf(PropTypes.string).isRequired,
  trailer: PropTypes.string.isRequired,
  watchLink: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  liked: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onFavorite: PropTypes.func.isRequired,
};

export default MoviesDetailsComponent;
