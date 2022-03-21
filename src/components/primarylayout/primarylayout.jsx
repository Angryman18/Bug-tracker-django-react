// vendors
import React, { useState } from "react";
import { AiFillHome, AiFillBug, AiTwotoneSliders, AiTwotoneGold } from "react-icons/ai";
import { BsFillPeopleFill, BsFillGridFill } from "react-icons/bs";
import { BiUserCircle, BiMenu, BiLogOutCircle } from "react-icons/bi";
import { Outlet } from "react-router-dom";
import { NavLink, Link } from "react-router-dom";
import "./layout.css";
import { useDispatch } from "react-redux";
import { LOGOUT } from "../../actions/types";

const PrimaryLayout = () => {
  const dispatch = useDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggle = (e) => {
    setSidebarOpen(!sidebarOpen);
  };

  const logoutHandler = () => {
    console.log('dispatched logout')
    dispatch({ type: LOGOUT });
  };

  return (
    <div className='md:flex relative h-screen'>
      <div className='w-full sticky top-0 flex justify-between items-center px-3 h-12 md:hidden bg-sideBarBg border-b border-sideBarBorder shadow-sm'>
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
        className={`w-52 fixed h-full overflow-hidden sm:absolute z-30 opacity-100 transform ${
          !sidebarOpen && "-translate-x-full md:translate-x-0 md:relative"
        } transition-all duration-200 top-0 bottom-0 left-0 bg-sideBarBg border-r border-sideBarBorder`}
      >
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
      <div className='flex-1 md:overflow-y-scroll'>
        <Outlet />
      </div>
    </div>
  );
};

export default PrimaryLayout;
