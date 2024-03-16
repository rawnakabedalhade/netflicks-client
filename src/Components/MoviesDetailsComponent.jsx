import { Typography, Divider, IconButton, Box, Grid } from "@mui/material";
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
    navigate(`${ROUTES.EDITMOVIES}/${id}`);
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
          src={image[0].url}
          alt={image[0].alt}
          style={{ maxWidth: "100%", height: "90vh", margin: 5 }}
        />
      </Grid>

      {/* Movie Details */}
      <Grid item xs={12} md={8} sx={{ marginTop: 10 }}>
        <Typography variant="h3" gutterBottom>
          {title}
        </Typography>
        <Divider />
        <Typography variant="subtitle1" gutterBottom>
          Description: {description}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Year: {year}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Director: {director}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Category: {category.join(", ")}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Actors: {actors.join(", ")}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Trailer: {trailer}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Watch Link: {watchLink}
        </Typography>

        {/* Action buttons */}
        {login && (
          <Box mt={2}>
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
