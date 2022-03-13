import React from "react";
import { useRoutes } from "react-router-dom";

// components
import PrimaryLayout from "../components/primarylayout/primarylayout.jsx";
import BugPage from "../pages/bug/bug.js";
import Features from "../pages/feature/feature.js";
import Projects from "../pages/projects/projects.js";
import UsersList from "../pages/users/users.js";
import Dashboard from "../pages/dashboard/dashboard.js";

const PublicRoutes = () => {
  const routes = [
    {
      path: "/",
      element: <PrimaryLayout />,
      children: [
        {
          path: "/bug-traced",
          element: <BugPage />,
        },
        {
          path: "/users",
          element: <UsersList />,
        },
        {
          path: "/projects",
          element: <Projects />,
        },
        {
          path: "/feature-request",
          element: <Features />,
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
        }
      ],
    },
  ];
  return useRoutes(routes);
};

export default PublicRoutes;
