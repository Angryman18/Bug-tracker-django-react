import React from "react";

const SelectBox = ({
  name,
  placeholder,
  onChange,
  value,
  disabled,
  error,
  labelText,
  children,
}) => {
  return (
    <div className='flex gap-y-1 font-semibold text-sideBarText flex-col'>
      <label className='text-sm px-2 my-0' htmlFor={name}>
        {labelText}
      </label>
    <select
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      disabled={disabled}
      className={`rounded-md bg-white placeholder:text-slate-100 ${
        error
          ? "border-red-600 focus:border-red-600"
          : "border-sideBarBorder focus:border-deepSky"
      } outline-none px-3 py-2 my-0 border shadow-sm`}
    >
      {children}
    </select>
    </div>
  );
};

SelectBox.defaultProps = {
  placeholder: "Select an option",
  name: "select",
  disabled: false,
  error: false,
};

export default SelectBox;
