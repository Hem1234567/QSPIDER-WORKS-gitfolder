import { createBrowserRouter } from "react-router-dom";
import Navbarcontainer from "../components/Navbarblock/Navbarcontainer";
import Layout from "../Layout";
import Home from "../pages/Home";
import Login from "../auth/login";
import Register from "../auth/register";
import ResetPassword from "../auth/ResetPassword";
import MyProfile from "../components/UserProfile/MyProfile";






let myRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/register",
        element: <Register />,
      },
      {
        path: "/auth/ResetPassword",
        element: <ResetPassword />,
      },
      {
        path: "/user/profile",
        element:<MyProfile/>
      },
      {
        path: "*",
        element: <h1>404! Page Not Found</h1>,
      },
    ],
  },
]);

export default myRoutes;