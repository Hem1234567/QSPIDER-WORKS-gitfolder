import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import Layout from "./Layout";
import { RouterProvider } from "react-router-dom";
import myRoutes from "./routes/routes";
// import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    {/* <Layout /> */}
    <RouterProvider router={myRoutes}/>
  </>
);
