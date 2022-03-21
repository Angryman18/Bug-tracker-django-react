// vendors
import React, { useState, useEffect } from "react";
import { Button, Icon } from "@material-tailwind/react";
import { Link } from "react-router-dom";

// components
import AddBugModal from "../bug/addbug-modal";
import Spinner from "../../components/spinner/spinner";

// utils
import useDateFormat from "../../hooks/useFormat";
import bugServices from "../../services/bug.services";

// services

const SingleProject = ({ toggle, projectObj, forceRefresh, forceLoading }) => {
  const [showAddBugModal, setAddBugModal] = useState(false);
  const { formatDate, formatText } = useDateFormat();
  const [loading, setLoading] = useState(false);
  const [recentData, setRecentData] = useState({ bugs: [] });

  const { project, reportedBy } = projectObj;

  const addBugToggle = () => {
    setAddBugModal(!showAddBugModal);
  };

  useEffect(() => {
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
  }, []);

  console.log(recentData);

  const RecentBugs = (
    <div className='sm:ml-8 py-6'>
      <h1 className='text-2xl'>Recent Bugs</h1>
      {recentData?.bugs?.map((item) => {
        return (
          <li key={item.id}>
            <Link className='link' to={`/bug-details/${item.id}`}>
              {formatText(item.title)}
            </Link>
            {"  "}
            <span className='text-disbaledText italic text-xs'>
              ({item.status} - {formatDate(item?.reportDate)})
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

  return (
    <div className='sm:mx-4 mx-0.5 text-sm'>
      {toggle && BackButton}
      <div className='sm:ml-8 my-6 block'>
        <div className='flex justify-end items-center pb-3'>
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
            Report Bug
          </Button>
        </div>
        <p className='text-sideBarText'>{formatDate(project?.uploadData)}</p>
        <h1 className='text-2xl py-2'>{project?.projectName}</h1>
        <p className='text-sideBarText'>
          Added By{" - "}
          <span className='link cursor-pointer'>{reportedBy?.username}</span>
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
      </div>
        {!loading ? RecentBugs : <Spinner />}
      <AddBugModal
        showModal={showAddBugModal}
        toggle={addBugToggle}
        projects={[projectObj.project]}
        disableSelection={projectObj?.project}
        forceRefresh={forceRefresh}
        forceLoading={forceLoading}
      />
    </div>
  );
};

SingleProject.defaultProps = {
  toggle: false,
};

export default SingleProject;
