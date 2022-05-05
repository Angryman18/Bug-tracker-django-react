import React, { useEffect } from "react";
import { connect } from "react-redux";
import { BiCalendarCheck } from "react-icons/bi";

// components
import Table from "@components/table/table.jsx";

// utils
import useDateFormat from "@hooks/useFormat";

const BUGS = "BUGS";
const FEATURES = "FEATURES";

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
          <div>
            <p onClick={modalOn(row.row.original)} className='link'>
              {row.value}
            </p>
            <p className='text-xs text-sideBarText'>
              {formatDate(row?.row?.original?.reportDate)}
            </p>
          </div>
        );
      },
    },
    {
      Header: "Project",
      accessor: "project.projectName",
      Cell: (row) => {
        return (
          <div>
            <p>{row.value}</p>
            <p className='text-xs flex flex-row items-center gap-x-1 text-green-700'>
              <span>
                <BiCalendarCheck size={17} />
              </span>
              <b className="text-sm">
                {row?.row?.original?.project?.user?.username === "shyam"
                  ? "Admin"
                  : row?.row?.original?.project?.user?.username}
              </b>
            </p>
          </div>
        );
      },
    },
    {
      Header: "Priority",
      accessor: "priority",
    },
    {
      Header: "Reported By",
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
