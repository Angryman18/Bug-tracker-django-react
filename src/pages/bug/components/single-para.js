import React from "react";

const SinglePara = ({ fieldName, value, onClick, nolink }) => {
  return (
    <li className='py-0.5'>
      {fieldName}
      {" - "}
      <span
        className={`${
          value
            ? `${!nolink ? 'text-link hover:underline cursor-pointer' : 'text-sideBarText'}`
            : "text-disbaledText pointer-events-none italic"
        } `}
        onClick={onClick}
      >
        {value ?? "Not Available"}
      </span>
    </li>
  );
};

export default SinglePara;
