import { Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const ActiveLink = ({ to, children }) => {
  return (
    <NavLink to={to} style={{ textDecoration: "none" }}>
      {({ isActive }) => (
        <Typography
          color={isActive ? "	#db0000" : "white"}
          sx={{ p: 2, fontSize: "1em" }}
        >
          {children}
        </Typography>
      )}
    </NavLink>
  );
};
export default ActiveLink;
