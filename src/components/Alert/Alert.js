import React from "react";
import { FiAlertTriangle } from "react-icons/fi";

const Alert = ({ children }) => {
  return (
    <div className='flex justify-center mt-2'>
      <div className='text-deepRed py-2 text-center  rounded-md px-2 min-w-160 flex flex-col md:flex-row items-center gap-x-3'>
        <FiAlertTriangle className="inline" size={25} /> {children}
      </div>
    </div>
  );
};

export default Alert;
