import { Routes, Route } from "react-router-dom";
import ROUTES from "./ROUTES";
import Login from "../pages/LogInPage";
import HomePage from "../pages/Home/HomePage";
import RegisterPage from "../pages/Register/RegisterPage";
import ContactUs from "../pages/ContactUs";
import AboutUs from "../pages/AboutUs";
import FavMoviesPage from "../pages/FavMovies/FavMoviesPage";
import ProfilePage from "../pages/Profile/ProfilePage";
import AuthGuard from "../guard/AuthGuard";
import BizGuard from "../guard/BizGuard";
import AdminGuard from "../guard/AdminGuard";
import CreateMoviesPage from "../pages/CreateMovies/CreateMoviesPage";
import EditMoviesPage from "../pages/EditMovies/EditMoviesPage";
import MovieDetailsPage from "../pages/MoviesDetails/MoviesDetailsPage";
import CRMPage from "../pages/CRM/CrmPage";
import MyMovies from "../pages/MyMovies/MyMoviesPage";
import ForgotPasswprd from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";

const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      <Route path={ROUTES.CONTACT} element={<ContactUs />} />
      <Route path={ROUTES.ABOUT} element={<AboutUs />} />
      <Route path={ROUTES.FAVMOVIES} element={<FavMoviesPage />} />
      <Route path={ROUTES.MYMOVIES} element={<MyMovies />} />
      <Route path={ROUTES.FORGOTPASSWORD} element={<ForgotPasswprd />} />
      <Route
        path={`${ROUTES.RESETPASSWORD}/:id/:token`}
        element={<ResetPassword />}
      />
      <Route
        path={`${ROUTES.MOVIEDETAILS}/:id`}
        element={<MovieDetailsPage />}
      />
      <Route
        path={ROUTES.PROFILE}
        element={
          <AuthGuard>
            <ProfilePage />
          </AuthGuard>
        }
      />
      <Route
        path={ROUTES.CREATEMOVIES}
        element={
          <BizGuard>
            <CreateMoviesPage />
          </BizGuard>
        }
      />
      <Route
        path={`${ROUTES.EDITMOVIES}/:id`}
        element={
          <BizGuard>
            <EditMoviesPage />
          </BizGuard>
        }
      />
      <Route
        path={ROUTES.CRM}
        element={
          <AdminGuard>
            <CRMPage />
          </AdminGuard>
        }
      />
    </Routes>
  );
};
export default Router;
