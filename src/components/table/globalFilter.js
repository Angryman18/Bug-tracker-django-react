import { Input } from "@material-tailwind/react";
import React from "react";

const GlobalFilterInput = ({ filter, setGlobalFilter }) => {
  return (
    <Input
      type='search'
      color='lightBlue'
      size='regular'
      outline={true}
      placeholder='Search'
      value={filter || ""}
      onChange={(e) => setGlobalFilter(e.target.value)}
    />
  );
};

export default GlobalFilterInput;
