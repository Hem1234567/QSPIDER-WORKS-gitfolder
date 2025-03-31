import { createBrowserRouter } from "react-router-dom";
import Navbarcontainer from "../components/Navbarblock/Navbarcontainer";
import Layout from "../Layout";
import Home from "../pages/Home";
import Login from "../auth/login";
import Register from "../auth/register";
import ResetPassword from "../auth/ResetPassword";

import MyAccount from "../components/UserProfile/MyAccount";
import AddProfile from "../components/UserProfile/AddProfile"; // Imported missing component
import ChangePassword from "../components/UserProfile/ChangePassword"; // Imported missing component
import Settings from "../components/UserProfile/Settings"; // Imported missing component
import UploadProfilePhoto from "../components/UserProfile/Uploadprofilephoto";
import Deleteaccount from "../components/UserProfile/Deleteaccount";
import Profilecontainer from "../components/UserProfile/Profilecontainer";


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
        element: <ResetPassword/>,
      },
      {
        path: "/user/profile/",
        element: <Profilecontainer/>,
        children: [
          {
            path: "/user/profile/my-account",
            element: <MyAccount />,
          },
          {
            path: "add-profile",
            element: <AddProfile />,
          },
          {
            path: "change-password",
            element: <ChangePassword />,
          },
          {
            path: "/user/profile/upload-profile-photo",
            element: <UploadProfilePhoto/>,
          },
          {
            path: "/user/profile/delete",
            element: <Deleteaccount/>,
          },
          {
            path: "settings",
            element: <Settings />, // Added settings route
          },
        ],
      },
    ],
  },
]);

export default myRoutes;
