import React from "react";

const SinglePara = ({ fieldName, value, onClick }) => {
  return (
    <li className='py-0.5'>
      {fieldName}
      {" - "}
      <span
        className={`${
          value
            ? "cursor-pointer text-link hover:underline"
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
