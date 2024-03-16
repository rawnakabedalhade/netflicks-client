import React from "react";
import LayoutComponent from "./layout/LayoutComponent";
import Router from "./routes/Router";
import { useState } from "react";
import loginContext from "./store/loginContext";
import movieContext from "./store/movieContext";
import favMoviesCountContext from "./store/favMoviesCount";
import userContext from "./store/userContext";
import { ToastContainer } from "react-toastify";

function App() {
  const [login, setLogin] = useState(null);
  const [dataFromServer, setDataFromServer] = useState([]);
  const [copyMovies, setCopyMovies] = useState([]);
  const [user, SetUser] = useState([]);
  const [favMoviesCount, setFavMoviesCount] = useState(0);
  return (
    <movieContext.Provider
      value={{ dataFromServer, setDataFromServer, copyMovies, setCopyMovies }}
    >
      <userContext.Provider value={{ user, SetUser }}>
        <favMoviesCountContext.Provider
          value={{ favMoviesCount, setFavMoviesCount }}
        >
          <loginContext.Provider value={{ login, setLogin }}>
            <ToastContainer />
            <LayoutComponent>
              <Router />
            </LayoutComponent>
          </loginContext.Provider>
        </favMoviesCountContext.Provider>
      </userContext.Provider>
    </movieContext.Provider>
  );
}

export default App;
