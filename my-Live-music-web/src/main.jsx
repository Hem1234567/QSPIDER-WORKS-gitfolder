import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import Layout from "./Layout";
import { RouterProvider } from "react-router-dom";
import myRoutes from "./routes/routes";
import AuthContextApi from "./Context/AuthContextApi";
import FetchUserContext from "./Context/FetchUserContext";
// import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <AuthContextApi>
      {" "}
      <FetchUserContext>
        <RouterProvider router={myRoutes} />
      </FetchUserContext>
    </AuthContextApi>
    {/* <Layout /> */}
  </>
);
