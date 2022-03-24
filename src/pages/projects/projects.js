import React, { useState, useEffect } from "react";
import { Button } from "@material-tailwind/react";

// components
import SearchProject from "./search-project";
import ProjectCard from "./project-card";
import Spinner from '../../components/spinner/spinner.jsx';

// services
import projectService from "../../services/project.service";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [fetchLoading, setFetchLoading] = useState(false);

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

  const loadMoreHandler = (e) => {
    e.preventDefault();
    setPageNo(pageNo + 1);
  };

  return (
    <div>
      <div className='py-6 flex justify-center'>
        <div className='flex flex-col justify-center sm:w-96 w-96 px-4 box-border'>
          <SearchProject />
        </div>
      </div>
      <div className='flex flex-row gap-x-6 gap-y-3 flex-wrap justify-center items-center py-6 pl-6'>
        {projects?.map((project) => {
          return (
            <div key={`${project.projectName}-${project.id}`} className='w-80'>
              <ProjectCard {...project} />
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
    </div>
  );
};

export default Projects;
