import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import { IconButton, Typography, Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import ROUTES from "../../routes/ROUTES";
import MovieComponent from "../../Components/MovieComponent";
import useDeleteMovie from "../../hooks/useDeleteMovie";
import useFavoriteMovie from "../../hooks/useFavoriteMovie";
import axios from "axios";
// import normalizeCards from "./normalizeMyCards";
import loginContext from "../../store/loginContext";
import movieContext from "../../store/movieContext";
import normalizemovies from "../Home/normalizeMovies";
const MyMovies = () => {
  let { setDataFromServer, dataFromServer, setCopyMovies } =
    useContext(movieContext);
  let { login } = useContext(loginContext);
  const handleDelete = useDeleteMovie();
  const handleFavorite = useFavoriteMovie();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/movies/my-movies")
      .then(({ data }) => {
        setDataFromServer(normalizemovies(data));
        setCopyMovies(normalizemovies(data));
      })
      .catch((err) => {
        console.log("error from axios", err);
      });
  }, []);

  let moviesFromServerFiltered = normalizemovies(
    dataFromServer,
    login ? login._id : undefined
  );
  if (!moviesFromServerFiltered || !moviesFromServerFiltered.length) {
    return <Typography>Could not find any items</Typography>;
  }

  const handleCreateMovie = () => {
    navigate(ROUTES.CREATEMOVIESM);
  };
  const handleDeleteMovie = (id) => {
    handleDelete(id);
  };
  const handleEditeMovie = (id) => {
    navigate(`${ROUTES.EDITMOVIES}/${id}`);
  };
  const handleFavoriteMovie = (id) => {
    handleFavorite(id);
  };

  return (
    <div>
      <Typography
        variant="h2"
        sx={{
          textAlign: "left",
          mb: 1,
          mt: 2,
          color: "	#db0000",
          fontFamily: "cursive",
        }}
      >
        My Movies Page
        <Typography
          variant="h5"
          sx={{ textAlign: "left", mb: 10, color: "	#db0000" }}
        >
          Here you can find your own movies.
        </Typography>
      </Typography>
      <Grid container spacing={2} mt={7}>
        {moviesFromServerFiltered.map((item, index) => (
          <Grid item lg={3} md={3} xs={12} key={"movies" + index}>
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
        ))}
      </Grid>
    </div>
  );
};
export default MyMovies;
