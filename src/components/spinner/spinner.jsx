import loader from "./spinner.svg";
import React from "react";

const Spinner = ({ width }) => {
  return (
    <div className="flex justify-center items-center w-full">
      <img className={width} src={loader} alt='Loading...' />
    </div>
  );
};

Spinner.defaultProps = {
  width: "w-16",
};

export default Spinner;
