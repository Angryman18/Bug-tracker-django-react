import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// components
import Wrapper from "@components/wrapper/wrapper";
import Tab from "@components/tabs/tab";
import UserBugs from "./user-bugs";

// actions
import { getUserSpeceficBugs } from "@actions/manage.action";

// tab - 1 => BUGS
// tab - 2 => FEATURES
// tab - 3 => OTHER CONTENT

const ManagePage = () => {
  const dispatch = useDispatch();
  const [tab, setTab] = useState("1");
  const [data, setData] = useState("");

  const selectedOption = (value) => {
    setTab(value);
  };

  useEffect(() => {
    if (tab === "1") {
      setData("BUGS");
    } else if (tab === "2") {
      setData("FEATURES");
    } else {
      setData(null);
    }
  }, [tab]);

  useEffect(async () => {
    await dispatch(getUserSpeceficBugs());
  }, []);

  return (
    <Wrapper>
      <h1 className='text-3xl my-3'>Manage Your Contents</h1>
      <Tab selectedOption={selectedOption} />
      <div className='my-6'>{data}</div>
    </Wrapper>
  );
};

export default ManagePage;
