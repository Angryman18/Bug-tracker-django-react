// vendors
import tw from "tailwind-styled-components";
import React from "react";
import { AiFillHome, AiFillBug } from "react-icons/ai";
import { BsFillPeopleFill, BsFillGridFill } from "react-icons/bs";
import { BiUserCircle } from "react-icons/bi";
import { Outlet } from "react-router-dom";
import { NavLink, Link } from "react-router-dom";
import "./layout.css";

const PrimaryLayout = () => {
  return (
    <Container>
      <LeftBar>
        <Welcome>
          {/* <BiUserCircle className='h-16 w-16' /> */}
          <Name>
            Welcome,
            <Text>Shyam,</Text>
          </Name>
        </Welcome>
        <Wrapper>
          <NavLink to='/bug' className='element'>
            <AiFillHome className='text-lg' />
            Dashboard
          </NavLink>
          <NavLink to='/reportbug' className='element'>
            <AiFillBug className='text-lg' />
            Report Bug
          </NavLink>
          <NavLink to='/users' className='element'>
            <BsFillPeopleFill className='text-lg' />
            Users
          </NavLink>
          <NavLink to='/feature-request' className='element'>
            <BsFillGridFill className='text-lg' />
            Feature Request
          </NavLink>
          {/* <Element>Others</Element> */}
        </Wrapper>
      </LeftBar>
      <aside className='w-full overflow-y-auto'>
        <Outlet />
      </aside>
    </Container>
  );
};

export default PrimaryLayout;

const LeftBar = tw.aside`
    w-52
    bg-sideBarBg
    absolute
    left-0
    top-0
    bottom-0
    border-r
    border-sideBarBorder
    overflow-y-hidden

`;

const Wrapper = tw.div`
    w-full
    flex
    flex-col
    justify-start
    items-center
    gap-x-2
`;

const Welcome = tw.div`
    w-full
    flex
    flex-row
    justify-start
    items-center
    h-20
    text-sideBarText
    gap-y-1
`;
const Name = tw.div`
    flex-1
    h-full
    w-full
    flex
    flex-col
    items-center
    justify-start
    mt-2
`;
const Text = tw.div`
    text-2xl
    text-violet-600
`;

const Container = tw.div`
  w-full
  h-screen
  relative
  pl-52
`;
