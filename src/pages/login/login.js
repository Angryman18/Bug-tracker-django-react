// vendors
import React, { useState } from "react";
import { Button, ClosingAlert } from "@material-tailwind/react";
import { useNavigate, Link } from "react-router-dom";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";

// files
import Background from "../../images/background.svg";

// components
import DefaultInput from "../../components/input/input";

// actions
import { UserLogin, GetLoggedInUserInfo } from "../../actions/auth.action";

const initialState = {
  username: "",
  password: "",
};

const initialMsgState = {
  status: false,
  msg: "",
};

const LoginPage = (props) => {
  const { isLoggedIn, dispatch } = props;
  const Navigate = useNavigate();
  const [formData, setFormData] = useState({ ...initialState });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ username: false, password: false });
  const [msg, setMsg] = useState({ ...initialMsgState });

  if (isLoggedIn) {
    Navigate("/dashboard");
    return false;
  }

  const getUsername = (e) => {
    setError({ ...error, username: false });
    setFormData({ ...formData, username: e.target.value });
  };

  const getPassword = (e) => {
    setError({ ...error, password: false });
    setFormData({ ...formData, password: e.target.value });
  };

  const loginHandler = (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      setError({ username: true, password: true });
      return;
    }
    setLoading(true);
    dispatch(UserLogin(formData))
      .then((res) => {
        const { user_id } = jwt_decode(res?.access);
        dispatch(GetLoggedInUserInfo(user_id, res)).then(() => {
          // Navigate("/dashboard");
          window.location.reload()
        });
      })
      .catch((err) => {
        setMsg({ status: true, msg: err.message });
        setLoading(false);
      });
  };

  return (
    <div>
      <img
        src={Background}
        className='relative object-cover object-right w-full h-screen'
      />
      <div className='w-full absolute top-0 flex justify-center items-center h-full'>
        <div className='bg-white sm:w-104 max-w-104 w-full mx-4 rounded-lg shadow-md border-sideBarBorder'>
          <div className='flex justify-center items-center px-4 my-4 text-2xl font-bold'>
            Login
          </div>

          <div className='py-2 w-full px-6 flex flex-col gap-y-4'>
            {msg.status && (
              <ClosingAlert
                className='flex items-center justify-center'
                color='deepOrange'
              >
                Login Failed
              </ClosingAlert>
            )}
            <DefaultInput
              placeholder='Enter Username'
              type='text'
              name='username'
              labelText='Enter Username'
              onChange={getUsername}
              error={error.username}
            />

            <DefaultInput
              placeholder='Enter Username'
              type='password'
              name='password'
              labelText='Enter Password'
              onChange={getPassword}
              error={error.password}
            />
            <div className='py-2 w-full flex flex-col'>
              <Button
                color={loading ? "gray" : "lightBlue"}
                className={loading && "pointer-events-none cursor-not-allowed"}
                buttonType={loading ? "outline" : "filled"}
                size='Regular'
                // className='h-12'
                rounded={false}
                block={false}
                iconOnly={false}
                ripple='light'
                onClick={!loading ? loginHandler : null}
                disabled={loading}
              >
                {!loading ? "Log In" : "Logging In..."}
              </Button>
            </div>
            <div className='flex flex-row gap-x-1 justify-center items-center'>
              <hr className='flex-1 ml-4 border-sideBarBorder' />
              <span className='px-2 text-sideBarText'>or</span>
              <hr className='flex-1 mr-4 border-sideBarBorder' />
            </div>
            <div className='pb-4'>
              <Link className='text-sideBarText hover:underline' to='/signup'>
                Create an Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const isLoggedIn = state?.AuthReducer?.isLoggedIn;
  return { isLoggedIn };
};

export default connect(mapStateToProps)(LoginPage);
