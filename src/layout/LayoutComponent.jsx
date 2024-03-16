import FooterComponent from "./footer/FooterComponent";
import HeaderComponent from "./header/HeaderComponent";
import MainComponent from "./main/MainComponent";
import { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import useAutoLogin from "../hooks/useAutoLogin";
import Typography from "@mui/material/Typography";

const LayoutComponent = ({ children }) => {
  const [isDarkTheme, setDarkTheme] = useState(false);
  const finishAutoLogin = useAutoLogin();

  // Define your dark and light themes
  const darkMode = createTheme({
    palette: {
      mode: "dark", // Set theme mode to dark
    },
    body: {
      backgroundColor: "#333333", // Set background color of the body to black
    },
  });

  const lightMode = createTheme({
    palette: {
      mode: "light", // Set theme mode to light
    },
    body: {
      backgroundColor: "#FFFFFF", // Set background color of the body to white
    },
  });

  // Function to handle theme change
  const handleThemeChange = (checked) => {
    setDarkTheme(checked);
  };

  return (
    <div style={{ backgroundColor: isDarkTheme ? "#333333" : "#FFFFFF" }}>
      {/* Provide the selected theme based on isDarkTheme */}
      <ThemeProvider theme={isDarkTheme ? darkMode : lightMode}>
        {/* Pass down isDarkTheme and handleThemeChange to HeaderComponent */}
        <HeaderComponent
          isDarkTheme={isDarkTheme}
          onThemeChange={handleThemeChange}
        />
        <MainComponent>
          {" "}
          {finishAutoLogin ? (
            children
          ) : (
            <Typography variant="h1" color="initial">
              Loading
            </Typography>
          )}
        </MainComponent>
        <FooterComponent />
      </ThemeProvider>
    </div>
  );
};

export default LayoutComponent;
