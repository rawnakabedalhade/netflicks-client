import { useContext, useEffect } from "react";
import movieContext from "../store/movieContext";
import axios from "axios";
import favMoviesCountContext from "../store/favMoviesCount";
import loginContext from "../store/loginContext";

const useFavoritemovie = () => {
  let { setDataFromServer, dataFromServer } = useContext(movieContext);
  const { favMoviesCount, setFavMoviesCount } = useContext(
    favMoviesCountContext
  );
  const { login } = useContext(loginContext);

  useEffect(() => {
    const storedCount = dataFromServer.filter((movie) =>
      movie.likes.includes(login._id)
    ).length;
    setFavMoviesCount(storedCount);
  }, [login._id]);

  const handleFavorite = async (id) => {
    try {
      let { data } = await axios.patch("/movies/" + id);
      setDataFromServer((cDataFromServer) => {
        let movieIndex = cDataFromServer.findIndex((movie) => movie._id === id);
        if (movieIndex >= 0) {
          cDataFromServer[movieIndex] = data;

          let isLiked = data.likes.some((userId) => userId === login._id);
          if (isLiked) {
            setFavMoviesCount((prevCount) => {
              const newCount = prevCount + 1;
              return newCount;
            });
          } else {
            setFavMoviesCount((prevCount) => {
              const newCount = prevCount - 1;
              return newCount;
            });
          }
        }
        return [...cDataFromServer];
      });
    } catch (err) {
      console.log("error from axios (like)", err);
    }
  };
  return handleFavorite;
};
export default useFavoritemovie;
