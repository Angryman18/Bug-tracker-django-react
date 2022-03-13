import React, { useState, forwardRef } from "react";
import DatePicker from "react-datepicker";
import { Input } from "@material-tailwind/react";

const ReactDatePicker = ({ startDate, endDate, getDate }) => {
  const [date, setDate] = useState({start: startDate, end: endDate});

  const onChange = (dates) => {
    const [start, end] = dates;
    setDate({start, end});
    getDate({startDate: start, endDate: end});
  };

  const CustomDatePicker = forwardRef(({ value, onClick }, ref) => {
    return (
      <div ref={ref}>
        <Input
          type='text'
          color='lightBlue'
          size='regular'
          outline={true}
          value={value}
          onClick={onClick}
          readOnly
          placeholder='Select Date'
        />
      </div>
    );
  });

  return (
    <div className="z-20">
      <DatePicker
        selected={date.start}
        onChange={onChange}
        startDate={date.start}
        endDate={date.end}
        dateFormat='dd/MM/yyyy'
        selectsRange
        customInput={<CustomDatePicker />}
      />
    </div>
  );
};

ReactDatePicker.defaultProps = {
  startDate: new Date(),
  endDate: new Date(),
};

export default ReactDatePicker;
