import React, { forwardRef } from "react";

const DefaultTextArea = forwardRef(
  (
    {
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
    },
    ref
  ) => {
    return (
      <div className='flex gap-y-1 font-semibold text-sideBarText flex-col'>
        <label className='text-sm px-2 my-0' htmlFor={name}>
          {labelText}
        </label>
        <textarea
          type={type}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          ref={ref}
          value={value}
          disabled={disabled}
          className={`rounded-md resize-none h-24 ${
            error
              ? "border-red-600 focus:border-red-600"
              : "border-sideBarBorder focus:border-deepSky"
          } outline-none px-3 py-2 my-0 border shadow-sm`}
        />
        {!!extraText && (
          <p className='py-0 flex items-center text-xs font-normal pl-2 text-slate-400'>
            * {extraText}
          </p>
        )}
      </div>
    );
  }
);

// const DefaultTextArea = ({
//   placeholder,
//   onChange,
//   onBlur,
//   error,
//   disabled,
//   value,
//   type,
//   name,
//   labelText,
//   extraText
// }) => {
//   return (
//     <div className='flex gap-y-1 font-semibold text-sideBarText flex-col'>
//       <label className='text-sm px-2 my-0' htmlFor={name}>
//         {labelText}
//       </label>
//       <textarea
//         type={type}
//         name={name}
//         placeholder={placeholder}
//         onChange={onChange}
//         onBlur={onBlur}
//         value={value}
//         disabled={disabled}
//         className={`rounded-md resize-none h-24 ${
//           error
//             ? "border-red-600 focus:border-red-600"
//             : "border-sideBarBorder focus:border-deepSky"
//         } outline-none px-3 py-2 my-0 border shadow-sm`}
//       />
//       {!!extraText && (
//         <p className='py-0 flex items-center text-xs font-normal pl-2 text-slate-400'>
//           * {extraText}
//         </p>
//       )}
//     </div>
//   );
// };

export default DefaultTextArea;
