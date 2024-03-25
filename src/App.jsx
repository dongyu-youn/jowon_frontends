import logo from "./logo.svg";
import "./App.css";
import { Outlet, useLocation } from "react-router-dom";

import { useEffect, useState } from "react";

function App() {
  return (
    <div>
      <Outlet></Outlet>
    </div>
  );
}

export default App;
