import Slideshow from "./Slideshow";
import { Typography, Grid, Box, Button } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import movieContext from "../../store/movieContext";
import MovieComponent from "../../Components/MovieComponent";
import loginContext from "../../store/loginContext";
import normalizemovies from "./normalizeMovies";
import MovieIcon from "@mui/icons-material/Movie";
import useFavoritemovie from "../../hooks/useFavoriteMovie";
import useDeleteMovie from "../../hooks/useDeleteMovie";
import ROUTES from "../../routes/ROUTES";
const HomePage = () => {
  let { setDataFromServer, dataFromServer, setCopyMovies } =
    useContext(movieContext);
  let { login } = useContext(loginContext);
  const handleFavorite = useFavoritemovie();
  const handleDelete = useDeleteMovie();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("/movies")
      .then(({ data }) => {
        setDataFromServer(normalizemovies(data));
        setCopyMovies(data);
      })
      .catch((err) => {
        console.log("error from axios", err);
      });
  }, []);
  let dataFromServerFiltered = normalizemovies(
    dataFromServer,
    login ? login._id : undefined
  );
  if (!dataFromServerFiltered || !dataFromServerFiltered.length) {
    return (
      <Typography
        variant="h6"
        style={{
          fontFamily:
            "'Netflix Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif",
          fontWeight: 400,
          color: "#fff", // Adjust the color to match Netflix's theme
          textAlign: "center",
          marginTop: "20px", // Add spacing from the top
        }}
      >
        Could not find any items
      </Typography>
    );
  }
  const handleDeleteMovie = (id) => {
    handleDelete(id);
  };
  const handleEditeMovie = (id) => {
    navigate(`${ROUTES.EDITMOVIES}/${id}`);
  };

  const handleFavoriteMovie = (id) => {
    handleFavorite(id);
  };
  const handleCreateMovie = () => {
    navigate(`${ROUTES.CREATEMOVIES}`);
  };

  return (
    <div>
      <Slideshow />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          p: 3,
        }}
      >
        <MovieIcon sx={{ mr: 3, fontSize: "50px", color: "#db0000" }} />
        <Typography variant="h5" color="blsck" sx={{ fontWeight: "bold" }}>
          Movies
        </Typography>
      </Box>
      {(login.isBusiness || login.isAdmin) && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateMovie}
          sx={{
            position: "fixed",
            bottom: "80px",
            right: "20px",
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            backgroundColor: "#db0000",
            color: "#ffffff",
            "&:hover": {
              backgroundColor: "#ff0000",
            },
            zIndex: 1000,
          }}
        >
          +
        </Button>
      )}
      <Grid container spacing={2} mt={2}>
        {dataFromServerFiltered.map((item, index) => (
          <Grid item lg={3} md={6} xs={12} key={"movies" + index}>
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
export default HomePage;
