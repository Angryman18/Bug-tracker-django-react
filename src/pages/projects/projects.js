import React, { useState, useEffect } from "react";

// components
import SearchProject from "./search-project";
import ProjectCard from "./project-card";

// services
import projectService from "../../services/project.service";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [pageNo, setPageNo] = useState(1);

  useEffect(() => {
    const Obj = { page: pageNo };
    projectService
      .getAllProjects(Obj)
      .then((res) => setProjects((pre) => [...pre, ...res]))
      .catch((err) => {
        console.log(err);
      });
  }, [pageNo]);

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

        {/* <div className='w-80'>
          <ProjectCard />
        </div>
        <div className='w-80'>
          <ProjectCard />
        </div>
        <div className='w-80'>
          <ProjectCard />
        </div>
        <div className='w-80'>
          <ProjectCard />
        </div>
        <div className='w-80'>
          <ProjectCard />
        </div> */}
      </div>
    </div>
  );
};

export default Projects;
