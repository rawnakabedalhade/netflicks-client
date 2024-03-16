import ROUTES from "../routes/ROUTES";

const alwaysLinks = [
  { to: ROUTES.ABOUT, children: "About" },
  { to: ROUTES.HOME, children: "Movies" },
  { to: ROUTES.CONTACT, children: "Contact" },
];
const loggedInLinks = [{ to: ROUTES.FAVMOVIES }];
const bizLinks = [{ to: ROUTES.MYMOVIES, children: "MyMovies" }];
const loggedOutLinks = [
  { to: ROUTES.REGISTER, children: "SignUp" },
  { to: ROUTES.LOGIN, children: "LogIn" },
];
const adminLinks = [{ to: ROUTES.CRM, children: "CRM" }];

export { alwaysLinks, loggedInLinks, bizLinks, loggedOutLinks, adminLinks };
