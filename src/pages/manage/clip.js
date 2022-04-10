import React from "react";

const Clip = ({ text, setText }) => {
  return (
    <div
      onClick={() => setText(text)}
      className='px-3 py-1 border-lightIndigo rounded-full border text-lightIndigo cursor-pointer active:bg-opacity-20 hover:bg-lightIndigo hover:bg-opacity-5'
    >
      {text}
    </div>
  );
};

export default Clip;
