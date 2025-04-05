import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout";
import Home from "../pages/Home";
import Login from "../auth/login";
import Register from "../auth/register";
import ResetPassword from "../auth/ResetPassword";
import ProfileContainer from "../components/UserProfile/ProfileContainer";
import MyAccount from "../components/UserProfile/MyAccount";
import AddProfile from "../components/UserProfile/AddProfile";
import ChangePassword from "../components/UserProfile/ChangePassword";
import Deleteaccount from "../components/UserProfile/DeleteAccount";
import Settings from "../components/UserProfile/Settings";
import Uploadprofilephoto from "../components/UserProfile/UploadProfilePhoto";
import Admincontainer from "../Admin/Admincontainer";
import CreateAlbum from "../Admin/Album/CreateAlbum";
import AlbumlandingContainer from "../AlbumLanding/AlbumlandingContainer";
import PopularAlbum from "../AlbumLanding/PopularAlbum";
import AlbumDetails from "../AlbumLanding/AlbumDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <AlbumlandingContainer />,
        children: [
          {
            index: true,
            element: <PopularAlbum />,
          },
          {
            path: "popular-album",
            element: <PopularAlbum />,
          },
          {
            path: "album-details/:albumTitle",
            element: <AlbumDetails />,
          },
        ],
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
        path: "/auth/reset-password",
        element: <ResetPassword />,
      },
      {
        path: "/admin",
        element: <Admincontainer />,
        children: [
          {
            index: true,
            element: <CreateAlbum />,
          },
        ],
      },
      {
        path: "/user/profile",
        element: <ProfileContainer />,
        children: [
          {
            index: true,
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
            path: "upload-profile-photo",
            element: <Uploadprofilephoto />,
          },
          {
            path: "delete",
            element: <Deleteaccount />,
          },
          {
            path: "settings",
            element: <Settings />,
          },
        ],
      },
    ],
  },
]);

export default router;
