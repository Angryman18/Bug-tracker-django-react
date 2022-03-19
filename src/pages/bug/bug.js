// vendors
import React, { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import formatDistance from "date-fns/formatDistance";
import { subDays, format } from "date-fns";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// actions
import { retrieveAllProject } from "../../actions/project.action.js";
import { filterAllBugs } from "../../actions/bugs.action.js";

// services
import bugServices from "../../services/bug.services.js";
import userService from "../../services/user.service.js";

// components
import Table from "../../components/table/table.jsx";
import AddBugModal from "./addbug-modal.js";
import Spinner from "../../components/spinner/spinner.jsx";
import ReactDatePicker from "../../components/datepicker/datepicker.jsx";
import ProfileView from "./profile-view.js";
import Loader from "../../components/spinner/loader.jsx";
import BugDetails from "./bug-details.js";

function BugPage(props) {
  const { dispatch, projects, bugs } = props;
  // const [bugs, setBugs] = useState([]);
  const [updatelist, setUpdatelist] = useState(false);
  const [displayProfile, setDisplayProfile] = useState(false);
  const [displayAddBug, setDisplayAddBug] = useState(false);
  const [date, setDate] = useState({
    startDate: subDays(new Date(), 30),
    endDate: new Date(),
  });
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [moutedData, setMoutedData] = useState({ mount: false, data: {} });

  const toggleBugDetails = () => {
    setMoutedData({ ...moutedData, mount: !moutedData.mount });
  };

  const profileToggle = () => {
    setDisplayProfile(!displayProfile);
  };

  const addBugToggle = () => {
    setDisplayAddBug(!displayAddBug);
  };

  const forceRefresh = () => {
    setUpdatelist(!updatelist);
  };

  const mountAndToggle = (e, value) => {
    setLoading(true);
    userService
      .getUserDetails({ username: value })
      .then((response) => {
        setUserInfo(response);
        profileToggle();
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const mountBugObjectView = (e, value) => {
    setMoutedData({ mount: true, data: value });
  };

  const columns = [
    {
      Header: "Title",
      accessor: "title",
      Cell: (row) => {
        return (
          <p
            className='text-link cursor-pointer hover:underline'
            onClick={(e) => mountBugObjectView(e, row.row.original)}
          >
            {row.value}
          </p>
        );
      },
    },
    {
      Header: "Project",
      accessor: "project.projectName",
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
            <span className='text-xs italic text-slate-400'>
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
      Cell: (row) => {
        return (
          <p
            onClick={(e) => mountAndToggle(e, row.value)}
            className='underline text-blue-500 cursor-pointer'
          >
            {row.value}
          </p>
        );
      },
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
    const { startDate, endDate } = date;
    if (startDate && endDate) {
      const Obj = {
        startDate: format(startDate, "yyyy-MM-dd"),
        endDate: format(endDate, "yyyy-MM-dd"),
      };
      setLoading(true);
      dispatch(filterAllBugs(Obj))
        .then((res) => {
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
      // bugServices
      //   .getFilteredBugs(Obj)
      //   .then((res) => {
      //     setBugs(res?.data);
      //   })
      //   .then(() => {
      //     setLoading(false);
      //   })
      //   .catch((err) => {
      //     setLoading(false);
      //   });
    }
  }, [date, dispatch, updatelist]);

  const getDate = (value) => {
    setDate(value);
  };

  const tableContent = (
    <div className='relative mt-4'>
      <div className='lg:absolute right-0 top-4'>
        <div className='flex gap-x-4 flex-row z-50'>
          <ReactDatePicker
            startDate={date?.startDate}
            endDate={date?.endDate}
            getDate={getDate}
          />
          <Button
            color='lightBlue'
            buttonType='filled'
            size='regular'
            rounded={false}
            block={false}
            iconOnly={false}
            ripple='light'
            onClick={addBugToggle}
          >
            Add Bug
          </Button>
        </div>
      </div>
      {<Table columns={columns} data={bugs ?? []} pagination={true} />}
    </div>
  );

  return (
    <div className='mx-4 text-sm'>
      {loading && <Loader />}
      {!moutedData.mount ? (
        tableContent
      ) : (
        <BugDetails
          toggle={toggleBugDetails}
          data={moutedData?.data}
          profileToggle={profileToggle}
          mountAndToggle={mountAndToggle}
        />
      )}
      <ProfileView
        showModal={displayProfile}
        toggle={profileToggle}
        profileObj={userInfo}
      />
      <AddBugModal
        showModal={displayAddBug}
        toggle={addBugToggle}
        projects={projects}
        forceRefresh={forceRefresh}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  const projects = state?.ProjectReducer?.data;
  const bugs = state?.BugReducer?.data;
  return {
    projects,
    bugs: bugs ?? [],
  };
};

export default connect(mapStateToProps)(BugPage);
