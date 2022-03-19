import React from "react";
import { BiX } from "react-icons/bi";

const ModalHeader = ({ children, toggler }) => {
  return (
    <>
      <div className='w-full flex items-center justify-start py-2'>
        <span className='text-2xl px-2'>{children}</span>
      </div>
      <div className='absolute right-2 top-2' onClick={toggler}>
        <BiX className='cursor-pointer text-3xl' />
      </div>
    </>
  );
};

export default ModalHeader;
