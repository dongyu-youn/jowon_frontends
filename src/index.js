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
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Favs from "./pages/Favs";
import Apply from "./pages/Apply";
import UserDetail from "./components/UserDetail";
import Notifications from "./pages/Notifications";
import NotiMe from "./components/NotiMe";
import FormPage from "./pages/FormPage";
import Chart from "./pages/Chart";
import Activate from "./pages/Active";
import PointShop from "./components/PointShop";
import Ranking from "./components/Ranking";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <NotFound></NotFound>,
    children: [
      { index: true, element: <Pictures /> },
      { path: "pictures", element: <Lists /> },

      { path: "pictures/:keyword", element: <PictureDetail /> },
      { path: "pictures/:id", element: <PictureDetail /> },
      { path: "pictures/messages", element: <Message /> },
      { path: "pictures/conversations/:id", element: <Conversation /> },
      { path: "pictures/profile", element: <Profile /> },
      { path: "pictures/search", element: <Search /> },
      { path: "pictures/favs", element: <Favs /> },
      { path: "pictures/apply/:id", element: <Apply /> },
      { path: "users/:id", element: <UserDetail /> },
      { path: "notifications", element: <Notifications /> },
      { path: "notifications/me", element: <NotiMe /> },
      { path: "profile/form", element: <FormPage /> },
      { path: "chart", element: <Chart /> },
      { path: "activate/:token", element: <Activate /> },
      { path: "pointshop", element: <PointShop /> },
      { path: "ranking", element: <Ranking /> },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
