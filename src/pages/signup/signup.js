// vendors
import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ClosingAlert } from "@material-tailwind/react";

// file
import Background from "../../images/background.svg";

// components
import SelectBox from "../../components/select/select";
import DefaultInput from "../../components/input/input";

// hooks
import useFormValid from "../../hooks/useFormvalid";

// services
import { UserSignup } from "../../actions/auth.action";

const initialFormData = {
  username: "",
  password: "",
  cpassword: "",
  email: "",
  signedAs: "User",
};

const initialFormError = {
  username: false,
  password: false,
  cpassword: false,
  email: false,
  signedAs: false,
};

const errorObject = { status: false, msg: null };

const SignupPage = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ ...initialFormData });
  const [formError, setFormError] = useState({ ...initialFormError });
  const [error, setError] = useState({ ...errorObject });
  const navigate = useNavigate();

  const { checkFieldLength, matchField, blankCheck, emailValid } =
    useFormValid(8);

  const getAllInput = (e) => {
    setError({ ...errorObject });
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormError({
      ...formError,
      [e.target.name]:
        blankCheck(e.target.value) ??
        !emailValid(e.target.name, e.target.value),
    });
  };

  const signedAsHandler = (e) => {
    setFormData({ ...formData, signedAs: e.target.value });
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    setError({ ...errorObject });
    const { username, password, cpassword, email, signedAs } = formData;
    setFormError({
      username: blankCheck(username) || !checkFieldLength(username, 3),
      password:
        blankCheck(password) ||
        !checkFieldLength(password, 5) ||
        !matchField(password, cpassword),
      cpassword:
        blankCheck(cpassword) ||
        !checkFieldLength(cpassword, 5) ||
        !matchField(password, cpassword),
      email: blankCheck(email) || !emailValid("email", email),
      signedAs: blankCheck(signedAs),
    });
    if (
      !blankCheck(username) &&
      !blankCheck(password) &&
      !blankCheck(cpassword) &&
      !blankCheck(email) &&
      !blankCheck(signedAs) &&
      checkFieldLength(username, 3) &&
      checkFieldLength(password, 5) &&
      matchField(password, cpassword) &&
      emailValid("email", email)
    ) {
      dispatch(
        UserSignup({ ...formData, technology: "", github: "", linkedIn: "" })
      )
        .then(() => {
          navigate("/dashboard");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
          setError({ status: true, msg: err?.data?.message });
        });
    }
  };

  return (
    <div>
      <img
        src={Background}
        className='fixed object-cover object-right w-full h-screen'
      />
      <div className='w-full box-border overflow-y-scroll h-full absolute flex justify-center items-center'>
        <div className='bg-white !my-12 sm:w-104 max-w-104 w-full mx-4 rounded-lg shadow-md border-sideBarBorder'>
          <div className='flex justify-center items-center px-4 my-4 text-2xl font-bold'>
            Create An Account
          </div>
          <div className='py-2 w-full px-6 flex flex-col gap-y-4'>
            {error.status && (
              <ClosingAlert color='deepOrange'>{error.msg}</ClosingAlert>
            )}
            <DefaultInput
              placeholder='Enter Your Username'
              type='text'
              name='username'
              labelText='Enter Username'
              onChange={getAllInput}
              error={formError.username}
            />

            <DefaultInput
              placeholder='Enter Your Password'
              type='password'
              name='password'
              labelText='Enter Password'
              onChange={getAllInput}
              error={formError.password}
            />
            <DefaultInput
              placeholder='Confirm Password'
              type='password'
              name='cpassword'
              labelText='Confirm Password'
              onChange={getAllInput}
              error={formError.cpassword}
            />
            <DefaultInput
              placeholder='Email Address'
              type='email'
              name='email'
              labelText='Email Address'
              onChange={getAllInput}
              error={formError.email}
            />
            {/* <DefaultInput
              placeholder='LinkedIn Profile'
              type='text'
              name='linkedin'
              labelText='LinkedIn Link'
            />
            <DefaultInput
              placeholder='Github Profile'
              type='text'
              name='github'
              labelText='Github Link'
            /> */}
            <SelectBox
              name='signedAs'
              labelText='Select Role'
              value={formData.signedAs}
              onChange={signedAsHandler}
              error={formError.signedAs}
            >
              <option value='User'>User</option>
              <option value='Developer'>Developer</option>
              <option value='Tester'>Tester</option>
            </SelectBox>
            <div className='py-2 w-full flex flex-col'>
              <Button
                color='lightBlue'
                buttonType='filled'
                size='Regular'
                className='h-12'
                rounded={false}
                block={false}
                iconOnly={false}
                ripple='light'
                onClick={handlerSubmit}
              >
                Sign Up
              </Button>
            </div>
            <div className='flex flex-row gap-x-1 justify-center items-center'>
              <hr className='flex-1 ml-4 border-sideBarBorder' />
              <span className='px-2 text-sideBarText'>or</span>
              <hr className='flex-1 mr-4 border-sideBarBorder' />
            </div>
            <div className='pb-4'>
              <Link className='text-sideBarText hover:underline' to='/login'>
                Login Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
