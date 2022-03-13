import React from "react";
import {BiX} from 'react-icons/bi'

const ModalHeader = ({ children, toggler }) => {
  return (
    <>
      <div className='w-full flex items-center justify-center py-2'>
          <span className="text-2xl font-bold px-2">{children}</span>
      </div>
      <div className='absolute right-1 top-1' onClick={toggler}>
        <BiX className="cursor-pointer text-3xl" />
      </div>
    </>
  );
};

export default ModalHeader;
