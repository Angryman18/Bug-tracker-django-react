import React from "react";
import { useRoutes } from "react-router-dom";

// components
import PrimaryLayout from "../components/primarylayout/primarylayout.jsx";
import BugPage from "../pages/bug/bug.js";
import Features from "../pages/feature/feature.js";
import Projects from "../pages/projects/projects.js";
import UsersList from "../pages/users/users.js";
import Dashboard from "../pages/dashboard/dashboard.js";
import LoginPage from "../pages/login/login.js";
import SignupPage from "../pages/signup/signup.js";
import BugDetails from "../pages/bug/bug-details.js";
import ManagePage from "../pages/manage/manage.js";


const PrivateRoutes = () => {
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
        },
        {
          path: "/bug-details/:id",
          element: <BugDetails />,
        },
        {
          path: '/manage',
          element: <ManagePage />,
        }
      ],
    },
  ];
  return useRoutes(routes);
};

export default PrivateRoutes;
