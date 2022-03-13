import React from "react";

const ModalFooter = ({ children }) => {
  return (
    <div className='w-full flex items-center py-4'>
      <span className='flex-1 flex flex-row justify-end'>{children}</span>
    </div>
  );
};

export default ModalFooter;
