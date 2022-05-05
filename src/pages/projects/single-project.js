// vendors
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  Fragment,
} from "react";
import { Button, Icon } from "@material-tailwind/react";
import { RiFireLine, RiFireFill } from "react-icons/ri";
import { useDispatch } from "react-redux";

// components
import AddBugModal from "../bug/addbug-modal";
import Spinner from "@components/spinner/spinner.jsx";
import BugDetails from "../bug/bug-details";
import ProfileView from "../bug/profile-view";
import Wrapper from "@components/wrapper/wrapper";
import AddFeatureModal from "../feature/components/add-feature-modal";
import Comments from "./comments";
import Loader from "@components/spinner/loader.jsx";

// utils
import useDateFormat from "@hooks/useFormat";

// services
import bugServices from "@service/bug.services";
import userService from "@service/user.service";
import projectService from "@service/project.service";

// dispatch types
import { ADD_LIKE_QUERY } from "@actions/types";

const SingleProject = ({ toggle, projectObj, forceRefresh, forceLoading }) => {
  const dispatch = useDispatch();
  const [showAddBugModal, setAddBugModal] = useState(false);
  const [showBugDetails, setShowBugDetails] = useState({
    show: false,
    data: {},
  });

  const [showProfile, setShowProfile] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const { formatDate, formatText } = useDateFormat();
  const [loading, setLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [recentData, setRecentData] = useState({ bugs: [] });
  const [showFeatureModal, setShowFeatureModal] = useState(false);

  const { project, reportedBy } = projectObj;

  const addBugToggle = () => {
    setAddBugModal(!showAddBugModal);
  };

  const getRecentData = useCallback(() => {
    setLoading(true);
    bugServices
      .recentBugs()
      .then((res) => {
        setRecentData({ bugs: res });
      })
      .catch((err) => {
        console.log(err.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [recentData]);

  useEffect(() => {
    getRecentData();
  }, []);

  const mountBugDetails = (e, value) => {
    toggleBugDetails();
    setShowBugDetails({ show: true, data: value });
  };

  const toggleBugDetails = () => {
    setShowBugDetails({ show: !showBugDetails.show, data: {} });
  };

  const showProfileToggle = () => {
    setShowProfile(!showProfile);
  };

  const mountAndToggle = (e, value) => {
    setProfileLoading(true);
    userService
      .getUserDetails({ username: value })
      .then((response) => {
        setUserInfo(response);
        showProfileToggle();
        setProfileLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setProfileLoading(false);
      });
  };

  const RecentBugs = (
    <div className='sm:ml-8 py-6'>
      <h1 className='text-2xl'>Recent Bugs</h1>
      {recentData?.bugs?.map((item) => {
        return (
          <li key={item.id}>
            <p
              className='link cursor-pointer inline-block'
              onClick={(e) => mountBugDetails(e, item)}
            >
              {formatText(item.title)}
            </p>
            {"  "}
            <span className='text-disbaledText text-xs'>
              <p
                style={{ fontSize: "12px" }}
                className={`${
                  item.status === "Pending"
                    ? "warning"
                    : item.status === "Resolved"
                    ? "success"
                    : item.status === "Rejected"
                    ? "danger"
                    : "secondary"
                } inline`}
              >
                {item.status}
              </p>
              - {formatDate(item?.reportDate)})
            </span>
          </li>
        );
      })}
    </div>
  );

  const BackButton = (
    <div className='sm:ml-8 my-6 block '>
      <Button
        color='blueGray'
        buttonType='link'
        size='regular'
        rounded={false}
        block={false}
        iconOnly={false}
        ripple='dark'
        className='h-10'
        onClick={toggle}
      >
        <Icon name='keyboard_backspace' size='50' /> Back
      </Button>
    </div>
  );

  const likeProjectHandler = (id) => async (e) => {
    e.preventDefault();
    dispatch({ type: ADD_LIKE_QUERY, payload: { id } });
    await projectService.addLike({ projectId: id })
      
  };

  const ProjectDetails = (
    <div className='sm:mx-4 mx-0.5 text-sm'>
      {toggle && BackButton}
      <div className='sm:ml-8 my-6 block'>
        <div className='flex justify-end items-center pb-3 gap-x-2'>
          <Button
            color='red'
            buttonType='filled'
            size='regular'
            rounded={false}
            block={false}
            iconOnly={false}
            ripple='light'
            onClick={addBugToggle}
          >
            Report Bug
          </Button>
          <Button
            color='lightBlue'
            buttonType='filled'
            size='regular'
            rounded={false}
            block={false}
            iconOnly={false}
            ripple='light'
            onClick={() => setShowFeatureModal(true)}
          >
            Feature Request
          </Button>
        </div>
        <p className='text-sideBarText'>{formatDate(project?.uploadData)}</p>
        <h1 className='text-2xl py-2'>{project?.projectName}</h1>
        <p className='text-sideBarText'>
          Added By{" - "}
          <span
            onClick={(e) => mountAndToggle(e, reportedBy.username)}
            className='link cursor-pointer'
          >
            {reportedBy?.username}
          </span>
        </p>
        <p className='text-sideBarText py-4'>{project?.description}</p>
        <p className='text-sideBarText'>
          Live Site Link: {" - "}
          <a href={project.liveSiteLink} className='link' target='_blank'>
            {project?.liveSiteLink}
          </a>
        </p>
        <p className='text-sideBarText'>
          Github Link: {" - "}
          <a href={project?.githubLink ?? "#"} className='link' target='_blank'>
            {project?.githubLink ?? "Not Available"}
          </a>
        </p>
        <div>
        </div>
        <hr className='border-disabledText mt-4' />
      </div>
      {!loading ? RecentBugs : <Spinner />}
      <div>
        <Comments project={project?.id} />
      </div>
      <Wrapper className='text-base'>
        <AddBugModal
          showModal={showAddBugModal}
          toggle={addBugToggle}
          projects={[projectObj.project]}
          disableSelection={projectObj?.project}
          forceRefresh={forceRefresh}
          forceLoading={forceLoading}
        />
        <AddFeatureModal
          showModal={showFeatureModal}
          toggle={() => setShowFeatureModal(!showFeatureModal)}
          projects={[projectObj.project]}
          disableSelection={projectObj?.project}
          forceLoading={forceLoading}
        />
      </Wrapper>
    </div>
  );

  return (
    <Fragment>
      {showBugDetails?.show ? (
        <BugDetails
          toggle={toggleBugDetails}
          data={showBugDetails?.data}
          profileToggle={showProfileToggle}
          mountAndToggle={mountAndToggle}
        />
      ) : (
        ProjectDetails
      )}
      <ProfileView
        showModal={showProfile}
        profileObj={userInfo}
        toggle={showProfileToggle}
      />
      {profileLoading && <Loader />}
    </Fragment>
  );
};

SingleProject.defaultProps = {
  toggle: false,
  forceRefresh: (value) => value,
};

export default SingleProject;
