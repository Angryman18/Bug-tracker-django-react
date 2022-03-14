import React from "react";
import Background from "../../images/background.jpg";
import { Button } from "@material-tailwind/react";
import DefaultInput from "../../components/input/input";
import { Link } from "react-router-dom";

const SignupPage = () => {
  return (
    <div>
      <img
        src={Background}
        className='absolute object-cover object-right w-full h-screen'
      />
      <div className='w-full box-border overflow-y-scroll absolute top-0 flex justify-center items-center h-full'>
        <div className='bg-white  sm:w-104 max-w-104 w-full mx-4 rounded-lg shadow-md border-sideBarBorder'>
          <div className='flex justify-center items-center px-4 my-4 text-2xl font-bold'>
            Create An Account
          </div>
          <div className='py-2 w-full px-6 flex flex-col gap-y-4'>
            <DefaultInput
              placeholder='Enter Your Username'
              type='text'
              name='username'
              labelText='Enter Username'
            />

            <DefaultInput
              placeholder='Enter Your Password'
              type='text'
              name='password'
              labelText='Enter Password'
            />
            <DefaultInput
              placeholder='Email Address'
              type='text'
              name='email'
              labelText='Email Address'
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
                Already have an Account? Login Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
