import { Navigate } from "react-router-dom";
import React from 'react'

const PublicRoutes = ({ Component, isLoggedIn }) => {
  return isLoggedIn ? <Navigate to='/dashboard' /> : <Component />;
};

export default PublicRoutes;
