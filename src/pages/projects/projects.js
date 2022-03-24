import React, { useState, useEffect } from "react";
import { Button } from "@material-tailwind/react";

// components
import SearchProject from "./search-project";
import ProjectCard from "./project-card";
import Spinner from "../../components/spinner/spinner.jsx";
import SingleProject from "./single-project";

// services
import projectService from "../../services/project.service";

const Projects = () => {
  const [projects, setProjects] = useState([]);
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
      .then((res) => setProjects((pre) => [...pre, ...res]))
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        return setFetchLoading(false);
      });
  }, [pageNo]);

  const searchProjectClickHandler = (e, value) => {
    console.log(value)
    setProjectDetails({project: value, reportedBy: value?.user});
    setDisplayProjectDetails(!displayProjectDetails);
  }

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
      <div className='py-6 flex justify-center'>
        <div className='flex flex-col justify-center sm:w-96 w-96 px-4 box-border'>
          <SearchProject searchProjectClickHandler={searchProjectClickHandler} />
        </div>
      </div>
      <div className='block'>
        <h1 className='py-4 text-3xl px-12'>Recent Projects</h1>
        <hr className='mx-12' />
      </div>
      <div className='flex flex-row gap-x-6 gap-y-3 flex-wrap justify-center items-center py-6 pl-6'>
        {projects?.map((project) => {
          return (
            <div key={`${project.projectName}-${project.id}`} className='w-80'>
              <ProjectCard onClick={handleClick} projectObj={project} />
            </div>
          );
        })}
      </div>
      <div className='py-6 flex justify-center items-center'>
        {!fetchLoading ? (
          <Button
            color='lightBlue'
            buttonType='filled'
            size='regular'
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
    <div>
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
