// vendors
import React, { useEffect } from "react";
import Table from "../../components/table/table.jsx";
import { useSelector, useDispatch } from "react-redux";
import { Label } from "@material-tailwind/react";
import H1 from "@material-tailwind/react/Heading1";
import format from "date-fns/format";
import formatDistance from "date-fns/formatDistance";
import subDays from "date-fns/subDays";

// services
import saveAllBugs from "../../actions/bugs.action";

// css
// import './design.css'

function BugPage() {
  const dispatch = useDispatch();
  const [bugs, setBugs] = React.useState([]);

  const columns = [
    {
      Header: "Title",
      accessor: "title",
    },
    {
      Header: "Project",
      accessor: "project.projectName",
    },
    {
      Header: "Desc",
      accessor: "description",
      Cell: (row) => {
        return row.value.slice(0, 50);
      },
      width: 150,
    },
    {
      Header: "Report Date",
      accessor: "reportDate",
      maxWidth: 120,
      Cell: (row) => {
        return (
          <p>
            <span className='block'>
              {format(new Date(row.value), "do MMM, yyyy")}
            </span>
            <span className="text-xs italic text-slate-400">
              {formatDistance(subDays(new Date(row.value), 0), new Date(), {
                addSuffix: true,
              })}
            </span>
          </p>
        );
      },
    },
    {
      Header: "Priority",
      accessor: "priority",
      width: 100,
      headerStyle: { textAlign: "center" },
      Cell: (row) => {
        if (row.value === "High") {
          return <p className='danger mx-auto'>{row.value}</p>;
        } else if (row.value === "Medium") {
          return <p className='warning mx-auto'>{row.value}</p>;
        } else if (row.value === "Low") {
          return <p className='primary mx-auto'>{row.value}</p>;
        } else {
          return <p className='secondary mx-auto'>{row.value}</p>;
        }
      },
    },
    {
      Header: "Reported By",
      accessor: "reportedBy.username",
      width: 100,
    },
    {
      Header: "Message",
      accessor: "msg",
      width: 150,
      Cell: (row) => {
        if (!row.value) {
          return (
            <p className='text-slate-400 pointer-events-none italic text-sm'>
              Wait for Message.
            </p>
          );
        }
        return row.value;
      },
    },
    {
      Header: "Status",
      accessor: "status",
      width: 110,
      Cell: (row) => {
        if (row.value === "Resolved") {
          return <p className='success mx-auto'>{row.value}</p>;
        } else if (row.value === "Pending") {
          return <p className='warning mx-auto'>{row.value}</p>;
        } else if (row.value === "Rejected") {
          return <p className='danger mx-auto'>{row.value}</p>;
        }
        return <p className='secondary w-24 mx-auto'>{row.value}</p>;
      },
    },
  ];

  useEffect(() => {
    dispatch(saveAllBugs())
      .then((res) => {
        setBugs(res.data);
      })
      .catch((err) => {
        console.log("here is the error", err);
      });
  }, []);

  return (
    <div className='mx-4 text-sm'>
      <h1 className='text-4xl text-slate-700 py-3'>Recent Bugs</h1>
      <Table columns={columns} data={bugs} pagination={true} />
      {/* {bugs.data} */}
    </div>
  );
}

export default BugPage;
