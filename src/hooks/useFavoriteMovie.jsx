import { useContext, useEffect } from "react";
import movieContext from "../store/movieContext";
import axios from "axios";
import favMoviesCountContext from "../store/favMoviesCount";
import loginContext from "../store/loginContext";

const useFavoritemovie = () => {
  let { setDataFromServer } = useContext(movieContext);
  const { favMoviesCount, setFavMoviesCount } = useContext(
    favMoviesCountContext
  );
  const { login } = useContext(loginContext);

  useEffect(() => {
    // Retrieve the count from local storage on component mount
    const storedCount =
      parseInt(localStorage.getItem(`favMoviesCount_${login._id}`)) || 0;
    setFavMoviesCount(storedCount);
  }, [login]);

  // Function to update the local storage with the updated count
  const updateLocalStorageCount = (count) => {
    localStorage.setItem(`favMoviesCount_${login._id}`, count.toString());
    setFavMoviesCount(count);
  };

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
              updateLocalStorageCount(newCount); // Update local storage
              return newCount;
            });
          } else {
            setFavMoviesCount((prevCount) => {
              const newCount = prevCount - 1;
              updateLocalStorageCount(newCount); // Update local storage
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
