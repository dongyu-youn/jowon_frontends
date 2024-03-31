import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import NotFound from "./pages/NotFound";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Pictures from "./pages/Pictures";
import PictureDetail from "./pages/PictureDetail";
import Lists from "./pages/Lists";
import Message from "./components/Message";
import Conversation from "./components/Conversation";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <NotFound></NotFound>,
    children: [
      { index: true, element: <Pictures /> },
      { path: "pictures", element: <Lists /> },

      { path: "pictures/detail", element: <PictureDetail /> },
      { path: "pictures/messages", element: <Message /> },
      { path: "pictures/conversations", element: <Conversation /> },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
