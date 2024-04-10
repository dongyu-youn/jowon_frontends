import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import NotFound from "./pages/NotFound";

import Pictures from "./pages/Pictures";
import PictureDetail from "./pages/PictureDetail";
import Lists from "./pages/Lists";
import Message from "./components/Message";
import Conversation from "./components/Conversation";
import Profile from "./pages/Profile";
import PictureAbc from "./pages/PictureAbc";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Pictures />} />
          <Route path="pictures" element={<Lists />} />
          <Route path="pictures/detail" element={<PictureDetail />} />
          <Route path="pictures/abc" element={<PictureAbc />} />

          <Route path="pictures/messages" element={<Message />} />
          <Route path="pictures/conversations" element={<Conversation />} />
          <Route path="pictures/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);
