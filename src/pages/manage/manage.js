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

const BUGS = 'BUGS'
const FEATURES  = 'FEATURES'

const ManagePage = () => {
  const dispatch = useDispatch();
  const [tab, setTab] = useState("1");
  const [view, setView] = useState("");

  const selectedOption = (value) => {
    setTab(value);
  };

  useEffect(() => {
    if (tab === "1") {
      setView(BUGS);
    } else if (tab === "2") {
      setView(FEATURES);
    } else {
      setView(null);
    }
  }, [tab]);

  useEffect(async () => {
    await dispatch(getUserSpeceficBugs());
  }, []);

  return (
    <Wrapper>
      <h1 className='text-3xl my-3'>Manage Your Contents</h1>
      <Tab selectedOption={selectedOption} />
      <div className='my-6'>
        <UserBugs view={view} />
      </div>
    </Wrapper>
  );
};

export default ManagePage;
