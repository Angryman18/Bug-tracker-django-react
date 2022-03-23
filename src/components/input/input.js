import React from "react";

const DefaultInput = ({
  placeholder,
  onChange,
  onBlur,
  error,
  disabled,
  value,
  type,
  name,
  labelText,
  extraText,
  className
}) => {
  return (
    <div className='flex gap-y-1 font-semibold text-sideBarText flex-col'>
      <label className='text-sm px-2 my-0' htmlFor={name}>
        {labelText}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        disabled={disabled}
        className={`rounded-md ${
          error
            ? "border-red-600 focus:border-red-600"
            : "border-sideBarBorder focus:border-deepSky"
        } outline-none px-3 py-2 my-0 border shadow-sm ${className}`}
      />
      {!!extraText && <p className="py-0 flex items-center text-xs font-normal pl-2 text-slate-400">* {extraText}</p>}
    </div>
  );
};

DefaultInput.defaultProps = {
  className: ''
}

export default DefaultInput;
