import axios from "axios";
import movieContext from "../store/movieContext";
import { useContext } from "react";
const useDeleteMovie = () => {
  let { setDataFromServer } = useContext(movieContext);
  const handleDelete = async (id) => {
    axios
      .delete("/movies/" + id)
      .then(({ data }) => {
        setDataFromServer((cDataFromServer) => {
          return cDataFromServer.filter((movie) => movie._id !== id);
        });
      })
      .catch((err) => {
        console.log("error from axios (delete)", err);
      });
  };
  return handleDelete;
};
export default useDeleteMovie;
