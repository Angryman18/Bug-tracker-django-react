// vendors
import React, { useState, useEffect } from "react";
import { Button } from "@material-tailwind/react";

// components
import SearchProject from "./search-project";
import ProjectCard from "./project-card";
import Spinner from "@components/spinner/spinner.jsx";
import SingleProject from "./single-project";
import AddProjectModal from "./add-project";
import Loader from "@components/spinner/loader.jsx";
import FilterProject from "./filter-project";
import Wrapper from "@components/wrapper/wrapper";

// services
import projectService from "@service/project.service";
import { isEmpty, update } from "ramda";

// hoooks
import useFilter from "@hooks/useFilter";

// utils
import { NEWESET_FIRST } from "@helpers/filters";

const Projects = () => {
  const [projects, setProjects] = useState({ lastPage: false, data: [] });
  const [pageNo, setPageNo] = useState(1);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [overlayLoading, setOverLayLoading] = useState(false);
  const [updatelist, setUpdateList] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [filterBy, setFilterBy] = useState(NEWESET_FIRST);
  const [masterFilter] = useFilter();
  const [displayProjectDetails, setDisplayProjectDetails] = useState(false);
  const [projectDetails, setProjectDetails] = useState({
    project: {},
    reportedBy: {},
  });
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);

  const toggleAddProjectModal = () => {
    setShowAddProjectModal(!showAddProjectModal);
  };

  const getSelectedFilter = (value) => {
    setFilterBy(value);
  };

  const filterProjects = (response = [], clear = false) => {
    const data = () => {
      if (clear) return [...response] ;
      return [...projects.data, ...response]
    };
    const filteredData = masterFilter(filterBy, data());
    return filteredData;
  };

  useEffect(() => {
    const Obj = { page: pageNo };
    setFetchLoading(true);
    projectService
      .getProjectPage(Obj)
      .then((res) => {
        setProjects({ lastPage: isEmpty(res), data: filterProjects(res)});
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        return setFetchLoading(false);
      });
  }, [pageNo]);

  useEffect(() => {
    const Obj = { page: pageNo };
    setFetchLoading(true);
    projectService
      .getProjectPage(Obj)
      .then((res) => {
        setProjects({ lastPage: isEmpty(res), data: filterProjects(res, true)});
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        return setFetchLoading(false);
      });
  }, [updatelist]);

  useEffect(() => {
    setProjects({ ...projects, data: filterProjects() });
  }, [filterBy]);

  const searchProjectClickHandler = (e, value) => {
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

  const forceOverlayLoading = (value) => {
    setOverLayLoading(value);
  };

  const forceRefresh = () => {
    setUpdateList(!updatelist);
  };

  const content = (
    <>
      {overlayLoading && <Loader />}
      <div className='py-12 flex w-full justify-center flex-col items-center'>
        <h1 className='text-3xl text-sideBarText py-2'>
          Search For your Favourite Project
        </h1>
        <div className='flex flex-1 w-full justify-center'>
          <div className='flex flex-col justify-center sm:w-128 md:160 w-full box-border'>
            <SearchProject
              searchProjectClickHandler={searchProjectClickHandler}
            />
          </div>
        </div>
      </div>
      <div className='block'>
        <div className='flex justify-between flex-col sm:flex-row gap-y-2 sm:items-center'>
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
            onClick={toggleAddProjectModal}
          >
            Add Project
          </Button>
        </div>
        <hr className='mx-6' />
      </div>
      <div className='flex flex-row gap-x-3 items-center py-4'>
        Filter Project
        <FilterProject
          getSelectedFilter={getSelectedFilter}
          defaultSelect={filterBy}
        />
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
        {!fetchLoading ? (
          projects.lastPage ? (
            <p className='text-sideBarText pointer-events-none text-lg'>
              Thats all for now
            </p>
          ) : (
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
          )
        ) : (
          <Spinner />
        )}
      </div>
    </>
  );

  return (
    <Wrapper>
    <div className='overflow-x-hidden'>
      {displayProjectDetails ? (
        <SingleProject
          toggle={handleClick}
          projectObj={projectDetails}
          forceLoading={forceLoading}
        />
      ) : (
        content
      )}
      <AddProjectModal
        toggle={toggleAddProjectModal}
        showModal={showAddProjectModal}
        forceOverlayLoading={forceOverlayLoading}
        forceReloading={forceRefresh}
      />
    </div>
    </Wrapper>
  );
};

export default Projects;
