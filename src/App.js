// vendors
import React from "react";
import { BrowserRouter, Routes } from "react-router-dom";
import "@material-tailwind/react/tailwind.css";


// components
import PublicRoutes from "./routes/publicRoutes.js";

const App = () => {
  return (
    <BrowserRouter>
        <PublicRoutes />
    </BrowserRouter>
  );
};

export default App;
