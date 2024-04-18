import React from "react";
import { useLocation } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";

const FooterComponent = () => {
  let location = useLocation();
  return (
    // Check if the current path is not the login route
    location.pathname !== ROUTES.LOGIN && (
      <footer
        style={{
          backgroundColor: "#000000",
          padding: "4px",
          textAlign: "center",
          color: "white",
          marginBottom: 0,
        }}
      >
        <p>&copy; {new Date().getFullYear()} NetFlicks. All rights reserved.</p>
      </footer>
    )
  );
};

export default FooterComponent;
