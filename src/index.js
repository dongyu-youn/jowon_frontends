import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import NotFound from "./pages/NotFound";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <NotFound></NotFound>,
    children: [
      { index: true, element: <Home /> },
      // { path: "products", element: < },

      { path: "detail/1", element: <ProductDetail /> },
      // { path: "pictures/:pictureId", element: <PictureDetail /> },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
