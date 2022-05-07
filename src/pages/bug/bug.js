// vendors
import React, { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import formatDistance from "date-fns/formatDistance";
import { subDays, format } from "date-fns";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { BiCalendarCheck } from "react-icons/bi";

// actions
import { retrieveAllProject } from "@actions/project.action.js";
import { filterAllBugs } from "@actions/bugs.action.js";

// services
import bugServices from "@service/bug.services.js";
import userService from "@service/user.service.js";

// components
import Table from "@components/table/table.jsx";
import AddBugModal from "./addbug-modal.js";
import Spinner from "@components/spinner/spinner.jsx";
import ReactDatePicker from "@components/datepicker/datepicker.jsx";
import ProfileView from "./profile-view.js";
import Loader from "@components/spinner/loader.jsx";
import BugDetails from "./bug-details.js";
import SingleProject from "../projects/single-project.js";
import Wrapper from "@components/wrapper/wrapper.js";

// hooks
import useDateFormat from "@hooks/useFormat.js";

function BugPage(props) {
  const { dispatch, projects } = props;
  const { formatDate } = useDateFormat();

  const [bugs, setBugs] = useState([]);
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
  const [mountedProjectData, setMountedProjectData] = useState({
    mount: false,
    data: {},
  });

  const toggleBugDetails = () => {
    setMoutedData({ ...moutedData, mount: !moutedData.mount });
  };

  const toggleProjectDetails = () => {
    setMountedProjectData({
      ...mountedProjectData,
      mount: !mountedProjectData.mount,
    });
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

  const forceLoading = (value) => {
    setLoading(value);
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

  const mountProjectObejctView = (e, value) => {
    setMountedProjectData({ mount: true, data: value });
  };

  const columns = [
    {
      Header: "Title",
      accessor: "title",
      Cell: (row) => {
        return (
          <div>
            <p
              onClick={(e) => mountBugObjectView(e, row.row.original)}
              className='link'
            >
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
            <p
              className='link'
              onClick={(e) => mountProjectObejctView(e, row.row.original)}
            >
              {row.value}
            </p>
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
      width: 100,
      Cell: (row) => {
        if (row.value === "High") {
          return <p className='danger'>{row.value}</p>;
        } else if (row.value === "Medium") {
          return <p className='warning'>{row.value}</p>;
        } else if (row.value === "Low") {
          return <p className='primary'>{row.value}</p>;
        } else {
          return <p className='secondary'>{row.value}</p>;
        }
      },
    },
    {
      Header: "Reported By",
      accessor: "reportedBy.username",
      width: 120,
      Cell: (row) => {
        return (
          <p onClick={(e) => mountAndToggle(e, row.value)} className='link'>
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
          setBugs(res);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
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
    <Wrapper>
      {loading && <Loader />}
      {moutedData.mount && !mountedProjectData.mount ? (
        <BugDetails
          toggle={toggleBugDetails}
          data={moutedData?.data}
          profileToggle={profileToggle}
          mountAndToggle={mountAndToggle}
        />
      ) : !moutedData.mount && mountedProjectData.mount ? (
        <SingleProject
          toggle={toggleProjectDetails}
          projectObj={{
            project: mountedProjectData.data.project,
            reportedBy: mountedProjectData.data.project.user,
          }}
          forceRefresh={forceRefresh}
          forceLoading={forceLoading}
        />
      ) : !moutedData.mount && !mountedProjectData.mount ? (
        <>
          <div className='my-6'>
            <h1 className='text-3xl pb-6 text-sideBarText'>Bugs Summary</h1>
            <hr />
          </div>
          {tableContent}
        </>
      ) : null}

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
        forceLoading={forceLoading}
      />
    </Wrapper>
  );
}

const mapStateToProps = (state) => {
  const projects = state?.ProjectReducer?.data;
  const bugs = state?.BugReducer?.data;
  return {
    projects,
    // bugs: bugs ?? [],
  };
};

export default connect(mapStateToProps)(BugPage);
