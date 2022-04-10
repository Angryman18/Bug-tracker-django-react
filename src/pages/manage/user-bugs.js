import React, { useEffect } from "react";
import { connect } from "react-redux";

// components
import Table from "@components/table/table.jsx";

// utils
import useDateFormat from "@hooks/useFormat";

const BUGS = "BUGS";
const FEATURES = "FEATURES";

// id(pin):7
// title(pin):"website hacked by hacker"
// description(pin):"website hacked by hacker"
// priority(pin):"High"
// status(pin):"Pending"
// msg(pin):""
// reportDate(pin):"2022-03-18"

const UserBugs = (props) => {
  const { userBugs, dispatch, view } = props;

  if (view !== BUGS) return null;

  const { formatDate } = useDateFormat();

  const columns = [
    {
      Header: "Title",
      accessor: "title",
    },
    {
      Header: "Priority",
      accessor: "priority",
    },
    {
      Header: "Date",
      accessor: "reportDate",
      Cell: (props) => {
        return formatDate(props.value);
      },
    },
    {
      Header: "msg",
      accessor: "msg",
    },
    {
      Header: "Status",
      accessor: "status",
    },
  ];

  return (
    <div>
      <Table columns={columns} data={userBugs} pagination />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userBugs: state?.ManageReducer || [],
  };
};

export default connect(mapStateToProps)(UserBugs);
