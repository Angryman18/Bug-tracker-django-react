// vendors
import React, { useState } from "react";
import {
  AiFillHome,
  AiFillBug,
  AiTwotoneSliders,
  AiTwotoneGold,
} from "react-icons/ai";
import { BsFillPeopleFill, BsFillGridFill } from "react-icons/bs";
import { BiUserCircle, BiMenu, BiLogOutCircle } from "react-icons/bi";
import { Outlet } from "react-router-dom";
import { NavLink, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { LOGOUT } from "../../actions/types";
import { useNavigate } from "react-router-dom";

// css
import "./layout.css";

// assets
import Profile from "@images/user.png";

const PrimaryLayout = () => {
  const dispatch = useDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const user = useSelector((state) => state?.AuthReducer?.user);

  const toggle = (e) => {
    setSidebarOpen(!sidebarOpen);
  };

  const logoutHandler = () => {
    dispatch({ type: LOGOUT });
  };

  return (
    <div className='md:flex relative h-full sm:h-screen'>
      <div className='w-full z-30 sticky top-0 flex justify-between items-center px-3 h-12 md:hidden bg-sideBarBg border-b border-sideBarBorder shadow-sm'>
        <button className='focus:bg-black focus:text-white' onClick={toggle}>
          <BiMenu className='text-4xl' />
        </button>
        <div className='text-lg'>Bug Tracer</div>
      </div>
      {/* backdrop */}
      {sidebarOpen && (
        <div
          onClick={toggle}
          className='bg-black fixed overflow-hidden top-0 bottom-0 left-0 right-0 opacity-50 z-20 md:hidden pointer-events-auto'
        />
      )}
      {/* nav */}
      <div
        className={`w-52 fixed overflow-hidden z-30 opacity-100 transform ${
          !sidebarOpen &&
          "-translate-x-full md:translate-x-0 md:relative h-screen"
        } transition-all duration-200 top-0 h-screen bottom-0 left-0 bg-sideBarBg border-r border-sideBarBorder`}
      >
        <div className='py-2'>
          <div className='w-full flex flex-row items-center justify-center'>
            <img
              src={user?.avatar === null || !user?.avatar ? Profile : user?.avatar}
              className='w-16 aspect-square object-cover object-center border-2 border-lightSlate h-16 rounded-full'
              alt='profile'
            />
          </div>
          <p className='text-center font-bold text-sideBarText'>
            <span onClick={() => navigate("profile")} className="cursor-pointer hover:underline hover:text-link">
              {user.user?.username}
            </span>
          </p>
          <p className='text-center text-sideBarText'>
            <span onClick={() => navigate("profile")} className="cursor-pointer hover:underline hover:text-link">
              ({user?.signedAs})
            </span>
          </p>
        </div>
        <NavLink
          to='/dashboard'
          onClick={() => setSidebarOpen(false)}
          className={({ isActive }) =>
            isActive ? "element active" : "element"
          }
        >
          <AiFillHome className='text-lg' />
          Dashboard
        </NavLink>
        <NavLink
          to='/manage'
          onClick={() => setSidebarOpen(false)}
          className={({ isActive }) =>
            isActive ? "element active" : "element"
          }
        >
          <AiTwotoneSliders className='text-lg' />
          Manage
        </NavLink>
        <NavLink
          to='/bug-traced'
          onClick={() => setSidebarOpen(false)}
          className={({ isActive }) =>
            isActive ? "element active" : "element"
          }
        >
          <AiFillBug className='text-lg' />
          Bug Traced
        </NavLink>
        <NavLink
          to='/projects'
          onClick={() => setSidebarOpen(false)}
          className={({ isActive }) =>
            isActive ? "element active" : "element"
          }
        >
          <AiTwotoneGold className='text-lg' />
          Projects
        </NavLink>
        <NavLink
          to='/users'
          onClick={() => setSidebarOpen(false)}
          className={({ isActive }) =>
            isActive ? "element active" : "element"
          }
        >
          <BsFillPeopleFill className='text-lg' />
          Users
        </NavLink>
        <NavLink
          to='/feature-request'
          onClick={() => setSidebarOpen(false)}
          className={({ isActive }) =>
            isActive ? "element active" : "element"
          }
        >
          <BsFillGridFill className='text-lg' />
          Feature Request
        </NavLink>
        <a onClick={logoutHandler} className='element absolute bottom-2'>
          <BiLogOutCircle className='text-lg' />
          Logout
        </a>
      </div>
      {/* content */}
      <div className='flex-1 md:overflow-y-auto'>
        <Outlet />
      </div>
    </div>
  );
};

export default PrimaryLayout;
