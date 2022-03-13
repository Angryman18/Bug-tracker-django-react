import loader from "./loader.svg";
import React from 'react'

const Spinner = ({width}) => {
  return <img className={width} src={loader} alt='Loading...' />;
};

Spinner.defaultProps = {
    width: 'w-16'
}

export default Spinner;
