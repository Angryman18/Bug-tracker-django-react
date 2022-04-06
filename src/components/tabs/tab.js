import React, { useState } from "react";

import menu from "./menu.json";

const Element = ({ text, onClick, name, active }) => {
  return (
    <button
      name={name}
      onClick={onClick}
      className={`py-2.5 px-4 ${
        active
          ? "text-lightIndigo border-lightIndigo duration-200"
          : "text-sideBarText border-lightSlate"
      } outline-none border-b-4 `}
    >
      {text}
    </button>
  );
};

const Tab = ({ selectedOption, defaultTab }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const tabClickHandler = (e) => {
    setActiveTab(e.target.name);
    selectedOption(e.target.name);
  };

  const checkActive = (name) => activeTab === name;

  return (
    <div className='flex flex-row border-lightSlate'>
      {menu.map((item) => {
        return (
          <Element
            key={item.id}
            name={item.id}
            active={checkActive(item.id)}
            onClick={tabClickHandler}
            text={item.title}
          />
        );
      })}
    </div>
  );
};

Tab.defaultProps = {
  defaultTab: "1",
};

export default Tab;
