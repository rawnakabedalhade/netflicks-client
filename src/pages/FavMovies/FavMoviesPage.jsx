import { useContext } from "react";
import MovieComponent from "../../Components/MovieComponent";
import { Typography, Grid } from "@mui/material";
import movieContext from "../../store/movieContext";
import loginContext from "../../store/loginContext";
import useDeleteMovie from "../../hooks/useDeleteMovie";
import useFavoriteMovie from "../../hooks/useFavoriteMovie";
import ROUTES from "../../routes/ROUTES";
import { useNavigate } from "react-router-dom";
import normalizeMovies from "./normalizeFav";

const FavMoviesPage = () => {
  let { dataFromServer, setDataFromServer } = useContext(movieContext);
  let { login } = useContext(loginContext);
  const handleFavorite = useFavoriteMovie();
  const handleDelete = useDeleteMovie();
  const navigate = useNavigate();
  let dataFromServerFiltered = normalizeMovies(
    dataFromServer,
    login ? login._id : undefined
  );
  const handleDeleteMovie = (id) => {
    handleDelete(id);
  };
  const handleEditeMovie = (id) => {
    navigate(`${ROUTES.EDITCARD}/${id}`);
  };
  const handleFavoriteMovie = (id) => {
    handleFavorite(id);
  };

  return (
    <>
      <Typography
        variant="h2"
        sx={{
          textAlign: "left",
          mb: 1,
          mt: 2,
          color: "#db0000",
          fontFamily: "cursive",
        }}
      >
        Favorite Movies Page
        <Typography
          variant="h5"
          sx={{ textAlign: "left", mb: 10, color: "#db0000" }}
        >
          Here you can find favorite cards from all categories.
        </Typography>
      </Typography>

      <Grid container spacing={2}>
        {dataFromServerFiltered.map(
          (item, index) =>
            dataFromServerFiltered[index].likes.some(
              (id) => id === login._id
            ) && (
              <Grid item lg={3} md={6} xs={12} key={"cards" + index}>
                <MovieComponent
                  id={item._id}
                  title={item.title}
                  img={item.image.url}
                  liked={item.liked}
                  onDelete={handleDeleteMovie}
                  onEdit={handleEditeMovie}
                  onFavorite={handleFavoriteMovie}
                />
              </Grid>
            )
        )}
      </Grid>
    </>
  );
};
export default FavMoviesPage;
