import React, { useState } from "react";
import { connect } from "react-redux";
import { Label } from "@material-tailwind/react";
import { BiCalendarCheck } from "react-icons/bi";

// components
import Table from "@components/table/table.jsx";

// services

// hooks
import useDateFormat from "@hooks/useFormat";

const BUGS = "BUGS";
const FEATURES = "FEATURES";

const UserFeature = (props) => {
  const { features, dispatch, view, setMountObject, setShowFeatureModal } =
    props;

  const [nodes, setNodes] = useState([]);

  if (view !== FEATURES) return null;

  const { formatDate } = useDateFormat();

  const modalOn = (value) => (e) => {
    e.preventDefault();
    setMountObject(value);
    setShowFeatureModal(true);
  };

  const handleRead = (value) => (e) => {
    const findNode = nodes.find((item) => item.id === value);
    console.log(findNode);
    if (!findNode?.more) {
      const updateNode = nodes.filter((item) => {
        return item.id !== value;
      });
      setNodes([...updateNode, { id: value, more: true }]);
    } else {
      const updateNode = nodes.filter((item) => {
        return item.id !== value;
      });
      setNodes([...updateNode, { id: value, more: false }]);
    }
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
              {formatDate(row?.row?.original?.apealDate)}
            </p>
          </div>
        );
      },
    },
    {
      Header: "Description",
      accessor: "description",
      Cell: (row) => {
        const findNode = nodes.find(
          (node) => node?.id === row?.row?.original?.id
        );
        if (row.value.length > 50 && !findNode?.more) {
          return (
            <span>
              {row.value.substring(0, 50)}...
              <span
                onClick={handleRead(row?.row?.original?.id)}
                className='link cursor-pointer'
              >
                Read More
              </span>
            </span>
          );
        } else if (row.value.length > 50 && findNode?.more) {
          return (
            <span>
              {row.value}...
              <span
                onClick={handleRead(row?.row?.original?.id)}
                className='link cursor-pointer'
              >
                Read Less
              </span>
            </span>
          );
        } else {
          return row.value;
        }
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
              <b>
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
      Header: "User",
      accessor: "apealedBy.username",
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
        switch (row.value) {
          case "Unverified":
            return <Label color='deepOrange'>{row.value}</Label>;
          case "in Talk":
            return <Label color='blue'>{row.value}</Label>;
          case "Accepted":
            return <Label color='green'>{row.value}</Label>;
          case "Rejected":
            return <Label color='red'>{row.value}</Label>;
          default:
            return null;
        }
      },
    },
  ];

  return (
    <div>
      <Table columns={columns} data={features} pagination />
    </div>
  );
};

const mapStateToProps = (state) => {
  const features = state?.ManageReducer?.features ?? [];
  return {
    features,
  };
};

export default connect(mapStateToProps)(UserFeature);
