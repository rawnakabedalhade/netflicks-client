import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Grid, Button } from "@mui/material";
import axios from "axios";
import TextInputComponent from "../../Components/TextInputComponent.jsx";
import validateMovieSchema from "../../validation/movieValidation";
import LoginContext from "../../store/loginContext";
import { toast } from "react-toastify";
import ROUTES from "../../routes/ROUTES.js";
import toServer from "./toServer.js";

const CreateMoviesPage = () => {
  const [inputsValue, setInputsValue] = useState({
    title: "",
    description: "",
    year: "",
    director: "",
    category: [],
    actors: [],
    trailer: "",
    watchLink: "",
    image: [
      {
        url: "",
        alt: "",
      },
    ],
  });
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    year: "",
    director: "",
    category: "",
    actors: "",
    trailer: "",
    watchLink: "",
    image: [
      {
        url: "",
        alt: "",
      },
    ],
  });
  const navigate = useNavigate();
  const { login } = useContext(LoginContext);
  let keysArray = Object.keys(inputsValue);
  const handleInputsChange = (e) => {
    setInputsValue((cInputsValue) => ({
      ...cInputsValue,
      [e.target.id]: e.target.value,
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
      let { data } = await axios.post("/movies/", toServer(inputsValue));
      toast.success("Create Card Done!", {
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
        alignItems: "center",
      }}
    >
      <Typography component="h1" variant="h5" color="#db0000">
        Create Movies
      </Typography>
      <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {keysArray.map((keyName, index) => {
            if (keyName === "image") {
              <Grid item xs={12} sm={6}>
                <TextInputComponent
                  id={`image_url`}
                  label={`image_url`}
                  value={inputsValue[keyName][0].url}
                  onChange={handleInputsChange}
                  onBlur={handleInputsBlur}
                  errors={errors[keyName][0].url}
                  required={true}
                />
              </Grid>;
              <Grid item xs={12} sm={6}>
                <TextInputComponent
                  id={`image_alt`}
                  label={`image_alt`}
                  value={inputsValue[keyName][0].alt}
                  onChange={handleInputsChange}
                  onBlur={handleInputsBlur}
                  errors={errors[keyName][0].alt}
                  required={true}
                />
              </Grid>;
            } else {
              return (
                <Grid item xs={12} sm={6} key={`input_${keyName}_${index}`}>
                  <TextInputComponent
                    id={keyName}
                    label={keyName}
                    value={inputsValue[keyName]}
                    onChange={handleInputsChange}
                    onBlur={handleInputsBlur}
                    errors={errors[keyName]}
                    required={true}
                  />
                </Grid>
              );
            }
          })}
        </Grid>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, bgcolor: "#db0000" }}
          disabled={Object.keys(errors).length > 0}
        >
          Create Movie
        </Button>
      </Box>
    </Box>
  );
};
export default CreateMoviesPage;
