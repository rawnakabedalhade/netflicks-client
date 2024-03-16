import Box from "@mui/material/Box";
import {
  alwaysLinks,
  loggedInLinks,
  loggedOutLinks,
  bizLinks,
  adminLinks,
} from "../headerLinks.js";
import ActiveLink from "./ActiveLink.jsx";
import loginContext from "../../store/loginContext.js";
import { useContext } from "react";
const Links = () => {
  const { login } = useContext(loginContext);
  const loggedIn = login;
  return (
    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
      {alwaysLinks.map((myItem, index) => (
        <ActiveLink to={myItem.to} key={"linksnav" + index}>
          {myItem.children}
        </ActiveLink>
      ))}
      {loggedIn &&
        loggedInLinks.map((myItem, index) => (
          <ActiveLink to={myItem.to} key={"linksnav2" + index}>
            {myItem.children}
          </ActiveLink>
        ))}
      {loggedIn &&
        loggedIn.isBusiness &&
        bizLinks.map((myItem, index) => (
          <ActiveLink to={myItem.to} key={"linksnav2" + index}>
            {myItem.children}
          </ActiveLink>
        ))}
      {!loggedIn &&
        loggedOutLinks.map((myItem, index) => (
          <ActiveLink to={myItem.to} key={"linksnav3" + index}>
            {myItem.children}
          </ActiveLink>
        ))}
      {loggedIn &&
        loggedIn.isAdmin &&
        adminLinks.map((myItem, index) => (
          <ActiveLink to={myItem.to} key={"linksnav4" + index}>
            {myItem.children}
          </ActiveLink>
        ))}
    </Box>
  );
};

export default Links;
