import React from "react";
import { useRoutes } from "react-router-dom";

// components
import PrimaryLayout from "../components/primarylayout/primarylayout.jsx";
import BugPage from "../pages/bug/bug.js";


const PublicRoutes = () => {
  const routes = [
    {
      path: "/",
      element: <PrimaryLayout />,
      children: [
        {
          path: "/bug",
          element: <BugPage />,
        },
      ],
    },
  ];
  return useRoutes(routes);
};

export default PublicRoutes;
