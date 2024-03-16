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
    category: [""],
    actors: [""],
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
          {keysArray.map((keyName, index) => {
            if (keyName === "image") {
              return inputsValue[keyName].map((image, imgIndex) => (
                <Grid item xs={12} sm={6}>
                  <TextInputComponent
                    key={`input_${keyName}_${imgIndex}_url`}
                    id={`image_${imgIndex}_url`}
                    label={`Image ${imgIndex + 1}`}
                    value={image.url}
                    onChange={handleInputsChange}
                    onBlur={handleInputsBlur}
                    errors={errors[`image_${imgIndex}`]}
                    required={true}
                  />
                  <TextInputComponent
                    key={`input_${keyName}_${imgIndex}_alt`}
                    id={`image_${imgIndex}_alt`}
                    label={`Image ${imgIndex + 1} alt`}
                    value={image.alt}
                    onChange={handleInputsChange}
                    onBlur={handleInputsBlur}
                    errors={errors[`image_${imgIndex}`]}
                    required={true}
                  />
                </Grid>
              ));
            } else {
              return (
                <Grid item xs={12} sm={6}>
                  <TextInputComponent
                    key={`input_${keyName}_${index}`}
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
