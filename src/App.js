// vendors
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@material-tailwind/react/tailwind.css";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

// css
import "react-datepicker/dist/react-datepicker.css";

// components
import PrivateRoutes from "./routes/privateRoutes.js";
import LoginPage from "./pages/login/login.js";
import SignupPage from "./pages/signup/signup.js";
import PublicRoutes from "./routes/publicRoutes.js";

const App = (props) => {
  const { isLoggedIn, user } = props;
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <PublicRoutes Component={LoginPage} isLoggedIn={isLoggedIn} />
          }
        />
        <Route
          path='login'
          element={
            <PublicRoutes Component={LoginPage} isLoggedIn={isLoggedIn} />
          }
        />
        <Route
          path='signup'
          element={
            <PublicRoutes Component={LoginPage} isLoggedIn={SignupPage} />
          }
        />
        {!isLoggedIn && <Route path='/*' element={<Navigate to='/' />} />}
      </Routes>
      {isLoggedIn && <PrivateRoutes />}
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => {
  const isLoggedIn = state?.AuthReducer?.isLoggedIn;
  const user = state?.AuthReducer?.user;
  return { isLoggedIn, user };
};

export default connect(mapStateToProps)(App);
