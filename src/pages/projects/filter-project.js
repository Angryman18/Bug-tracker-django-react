// vendors
import React, { useState } from "react";

// components
import SelectBox from "../../components/select/select";

// filter data
import { filter } from "../../helpers/filters";

const FilterProject = ({ getSelectedFilter, defaultSelect }) => {
  const [filteredSelection, setFilteredSelection] = useState(defaultSelect);

  const onChangeFilter = (e) => {
    setFilteredSelection(e.target.value);
    getSelectedFilter(e.target.value);
  };

  return (
    <SelectBox
      name='Filter By'
      value={filteredSelection}
      onChange={onChangeFilter}
    >
      {filter?.map((item) => {
        return <option key={item.value} value={item.value}>{item.name}</option>;
      })}
      {/* <option value='newest_first'>Newest First</option>
        <option value='date_asc'>Date Asc</option>
        <option value='date_desc'>Date Desc</option>
        <option value='a-z'>A-Z</option> */}
    </SelectBox>
  );
};

export default FilterProject;
