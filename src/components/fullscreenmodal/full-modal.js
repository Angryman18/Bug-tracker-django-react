
import React from 'react'

const FullScreenModal = () => {
  return (
    <div className='absolute z-50 top-0 left-0 right-0 bottom-0 w-screen bg-slate-300'>
      <div className='flex justify-center items-center'>
        <p className='text-2xl sm:text-4xl'>Welcome, User</p>
      </div>
    </div>
  );
};

export default FullScreenModal;
