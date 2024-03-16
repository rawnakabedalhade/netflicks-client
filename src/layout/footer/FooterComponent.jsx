import React from "react";

const FooterComponent = () => {
  return (
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
  );
};

export default FooterComponent;
