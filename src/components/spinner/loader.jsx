import React from "react";
import image from "./loader.svg";

const Loader = () => {
  return (
    <div className='w-screen h-screen fixed top-0 left-0 right-0 bottom-0 bg-gray-900/50 flex items-center justify-center z-60'>
      <img src={image} alt='loading' className='z-70 w-20 h-20' />
    </div>
  );
};

export default Loader;
