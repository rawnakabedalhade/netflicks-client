import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import fromServer from "./fromServer.js";
import useDeleteMovie from "../../hooks/useDeleteMovie";
import useFavoriteMovie from "../../hooks/useFavoriteMovie";
import loginContext from "../../store/loginContext";
import MoviesDetailsComponent from "../../Components/MoviesDetailsComponent";
import ROUTES from "../../routes/ROUTES";

const MovieDetailsPage = () => {
  const handleDelete = useDeleteMovie();
  const handleFavorite = useFavoriteMovie();
  const navigate = useNavigate();
  const { login } = useContext(loginContext);
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState({
    title: "",
    description: "",
    year: "",
    director: "",
    category: [""],
    actors: [""],
    trailer: "",
    watchLink: "",
    url: "",
  });
  useEffect(() => {
    axios.get("/movies/" + id).then(({ data }) => {
      setMovieDetails({
        ...fromServer(data),
        likes: data.likes || [],
      });
    });
  }, [id]);

  const handleDeleteMovie = (id) => {
    handleDelete(id);
  };

  const handleEditMovie = (id) => {
    navigate(`${ROUTES.EDITMOVIES}/${id}`);
  };

  const handleFavoriteMovie = (id) => {
    handleFavorite(id);
  };

  let liked = false; // Initialize 'liked' as false by default
  if (movieDetails.likes && movieDetails.likes.find((id) => id === login._id)) {
    liked = true;
  }

  return (
    <MoviesDetailsComponent
      id={id}
      title={movieDetails.title}
      description={movieDetails.description}
      year={movieDetails.year}
      director={movieDetails.director}
      category={movieDetails.category}
      actors={movieDetails.actors}
      trailer={movieDetails.trailer}
      watchLink={movieDetails.watchLink}
      image={movieDetails.url}
      liked={liked}
      onDelete={handleDeleteMovie}
      onEdit={handleEditMovie}
      onFavorite={handleFavoriteMovie}
    />
  );
};

export default MovieDetailsPage;
