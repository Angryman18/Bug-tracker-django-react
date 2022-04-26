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
  const { userBugs, dispatch, view, setMountObject, setShowBugModal } = props;

  if (view !== BUGS) return null;

  const { formatDate } = useDateFormat();

  const modalOn = (value) => (e) => {
    e.preventDefault();
    setMountObject(value);
    setShowBugModal(true);
  };

  const columns = [
    {
      Header: "Title",
      accessor: "title",
      Cell: (row) => {
        return (
          <div onClick={modalOn(row.row.original)} className='link'>
            {row.value}
          </div>
        );
      },
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
      Header: "User",
      accessor: "reportedBy.username",
    },
    {
      Header: "Message",
      accessor: "msg",
      width: 150,
      Cell: (row) => {
        if (!row.value) {
          return (
            <p className='text-slate-400 pointer-events-none italic text-sm'>
              No Message Yet.
            </p>
          );
        }
        return row.value;
      },
    },
    {
      Header: "Status",
      accessor: "status",
      Cell: (row) => {
        if (row.value === "Resolved") {
          return <p className='success'>{row.value}</p>;
        } else if (row.value === "Pending") {
          return <p className='warning'>{row.value}</p>;
        } else if (row.value === "Rejected") {
          return <p className='danger'>{row.value}</p>;
        }
        return <p className='secondary w-24'>{row.value}</p>;
      },
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
    userBugs: state?.ManageReducer?.bugs || [],
  };
};

export default connect(mapStateToProps)(UserBugs);
