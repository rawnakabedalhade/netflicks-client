import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Grid, Button } from "@mui/material";
import axios from "axios";
import TextInputComponent from "../../Components/TextInputComponent.jsx";
import validateMovieSchema from "../../validation/movieValidation";
import LoginContext from "../../store/loginContext";
import fromServer from "./fromServer.js";
import { toast } from "react-toastify";
import ROUTES from "../../routes/ROUTES.js";
import toServer from "./toServer.js";

const EditMoviesPage = () => {
  const [inputsValue, setInputsValue] = useState({
    title: "",
    description: "",
    year: "",
    director: "",
    category: [""],
    actors: [""],
    trailer: "",
    watchLink: "",
    url: "",
    alt: "",
  });
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    year: "",
    director: "",
    category: [""],
    actors: [""],
    trailer: "",
    watchLink: "",
    url: "",
    alt: "",
  });
  const navigate = useNavigate();

  let { id } = useParams(); //get id from url
  const { login } = useContext(LoginContext);
  useEffect(() => {
    if (!id || !login) {
      return;
    }
    axios
      .get("/movies/" + id)
      .then(({ data }) => {
        if (data.user_id === login._id || login.isBusiness) {
          setInputsValue(fromServer(data));
          setErrors({});
        } else {
          //not the same user
          toast.error("Oops...try again!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          navigate(ROUTES.HOME);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, login]);

  let keysArray = Object.keys(inputsValue);

  const handleInputsChange = (e) => {
    // If the field is 'category' or 'actors', ensure the value is an array
    const value = ["category", "actors"].includes(e.target.id)
      ? [e.target.value]
      : e.target.value;

    setInputsValue((cInputsValue) => ({
      ...cInputsValue,
      [e.target.id]: value,
    }));
  };

  const handleInputsBlur = (e) => {
    let { error } = validateMovieSchema[e.target.id]({
      [e.target.id]: inputsValue[e.target.id],
    });
    if (error) {
      setErrors((cErrors) => ({
        ...cErrors,
        [e.target.id]: error.details[0].message,
      }));
    } else {
      setErrors((cErrors) => {
        delete cErrors[e.target.id];
        return { ...cErrors };
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let { data } = await axios.put(`/movies/${id}`, toServer(inputsValue));
      toast.success("Edit Card Done!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate(ROUTES.HOME);
    } catch (error) {
      toast.error("Oops...try again!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log("error from update", error);
    }
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        aligninputsValues: "center",
      }}
    >
      <Typography component="h1" variant="h5" color="	#db0000">
        Edit Movies
      </Typography>
      <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {keysArray.map((keyName) => (
            <TextInputComponent
              key={"inputs" + keyName}
              id={keyName}
              label={keyName}
              value={inputsValue[keyName]}
              onChange={handleInputsChange}
              onBlur={handleInputsBlur}
              errors={errors[keyName]}
              required={true}
            />
          ))}
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, bgcolor: "	#db0000" }}
          disabled={Object.keys(errors).length > 0}
        >
          Edit Movie
        </Button>
      </Box>
    </Box>
  );
};
export default EditMoviesPage;
