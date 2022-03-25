import React, { useState, useEffect } from "react";
import { Button } from "@material-tailwind/react";

// components
import SearchProject from "./search-project";
import ProjectCard from "./project-card";
import Spinner from "../../components/spinner/spinner.jsx";
import SingleProject from "./single-project";

// services
import projectService from "../../services/project.service";
import { isEmpty } from "ramda";

const Projects = () => {
  const [projects, setProjects] = useState({lastPage: false, data: []});
  const [pageNo, setPageNo] = useState(1);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [displayProjectDetails, setDisplayProjectDetails] = useState(false);
  const [projectDetails, setProjectDetails] = useState({
    project: {},
    reportedBy: {},
  });

  useEffect(() => {
    const Obj = { page: pageNo };
    setFetchLoading(true);
    projectService
      .getProjectPage(Obj)
      .then((res) => {
        setProjects((pre) => ({lastPage: isEmpty(res), data:[...pre.data, ...res]}))
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        return setFetchLoading(false);
      });
  }, [pageNo]);

  const searchProjectClickHandler = (e, value) => {
    console.log(value);
    setProjectDetails({ project: value, reportedBy: value?.user });
    setDisplayProjectDetails(!displayProjectDetails);
  };

  const loadMoreHandler = (e) => {
    e.preventDefault();
    setPageNo(pageNo + 1);
  };

  const handleClick = (e, data) => {
    e.preventDefault();
    setProjectDetails({ project: data, reportedBy: data?.user });
    setDisplayProjectDetails(!displayProjectDetails);
  };

  const forceLoading = (value) => {
    setPageLoading(value);
  };

  const content = (
    <>
      <div className='py-12 flex justify-center flex-col items-center'>
        <h1 className='text-3xl text-sideBarText py-2 pl-6'>
          Search For your Favourite Project
        </h1>
        <div className='flex justify-center'>
          <div className='flex flex-col justify-center sm:w-160 w-screen px-4 box-border'>
            <SearchProject
              searchProjectClickHandler={searchProjectClickHandler}
            />
          </div>
        </div>
      </div>
      <div className='block'>
        <div className='flex justify-between flex-col sm:flex-row gap-y-2 sm:items-center px-12'>
          <h1 className='py-4 text-3xl'>Recent Projects</h1>
          <Button
            color='lightBlue'
            buttonType='filled'
            className='h-10'
            size='regular'
            rounded={false}
            block={false}
            iconOnly={false}
            ripple='light'
            // onClick={loadMoreHandler}
          >
            Add Project
          </Button>
        </div>
        <hr className='mx-12' />
      </div>
      <div className='flex flex-row gap-x-6 gap-y-3 flex-wrap justify-center items-center py-6 sm:pl-6'>
        {projects?.data?.map((project) => {
          return (
            <div key={`${project.projectName}-${project.id}`} className='w-80'>
              <ProjectCard onClick={handleClick} projectObj={project} />
            </div>
          );
        })}
      </div>
      <div className='py-6 flex justify-center items-center'>
        {!fetchLoading ? projects.lastPage ? 
        <p className="text-sideBarText pointer-events-none text-lg">Thats all for now</p>
        : (
          <Button
            color='lightBlue'
            buttonType='filled'
            size='regular'
            className='h-10'
            rounded={false}
            block={false}
            iconOnly={false}
            ripple='light'
            onClick={loadMoreHandler}
          >
            Load More
          </Button>
        ) : (
          <Spinner />
        )}
      </div>
    </>
  );

  return (
    <div className="overflow-x-hidden">
      {displayProjectDetails ? (
        <SingleProject
          toggle={handleClick}
          projectObj={projectDetails}
          forceLoading={forceLoading}
        />
      ) : (
        content
      )}
    </div>
  );
};

export default Projects;
