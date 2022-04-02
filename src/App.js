// vendors
import React from "react";
import { Routes, Route } from "react-router-dom";
import "@material-tailwind/react/tailwind.css";
import { connect, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";

// css
import "react-datepicker/dist/react-datepicker.css";

// components
import PrivateRoutes from "./routes/privateRoutes.js";
import LoginPage from "./pages/login/login.js";
import SignupPage from "./pages/signup/signup.js";
import PublicRoutes from "./routes/publicRoutes.js";

// services
// import { GetLoggedInUserInfo } from "./actions/auth.action";

const App = (props) => {
  const { isLoggedIn, user } = props;
  const dispatch = useDispatch();
  console.log(isLoggedIn)
  // const ref = useRef(() => {
  //   if (user?.user?.id && user?.user?.token) {
  //     dispatch(GetLoggedInUserInfo(user?.user?.id, user?.user?.token))
  //       .then((res) => {
  //         console.log("we got this", res);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         return Navigate('/login')
  //       });
  //   }
  // });

  // useEffect(() => {
  //   ref.current();
  // }, [ref]);

  return (
      <>
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
              <PublicRoutes Component={SignupPage} isLoggedIn={isLoggedIn} />
            }
          />
          {!isLoggedIn && <Route path='/*' element={<Navigate to='/' />} />}
        </Routes>
        {isLoggedIn && <PrivateRoutes />}
      </>
  );
};

const mapStateToProps = (state) => {
  const isLoggedIn = state?.AuthReducer?.isLoggedIn;
  const user = state?.AuthReducer?.user;
  return { isLoggedIn, user };
};

export default connect(mapStateToProps)(App);
