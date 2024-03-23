import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";
import { useContext } from "react";
import movieContext from "../../store/movieContext";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#dedede",
  width: "100%",
  [theme.breakpoints.up("md")]: {
    // Adjust width for desktop screens
    width: "35%",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#c1071e",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "#131834",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(10)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "50ch", // Adjust width for desktop screens
    },
  },
}));

const SearchDiv = () => {
  let { setDataFromServer, copyMovies } = useContext(movieContext);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    if (!inputValue || inputValue.length < 1) {
      setDataFromServer(copyMovies);
      return;
    }
    const moviesSearch = copyMovies.filter((movie) => {
      return movie.title.includes(inputValue);
    });
    setDataFromServer(moviesSearch);
  };

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search Movie Name From Here..."
        inputProps={{ "aria-label": "search" }}
        onChange={handleInputChange}
      />
    </Search>
  );
};

export default SearchDiv;
