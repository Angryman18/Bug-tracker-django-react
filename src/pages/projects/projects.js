import React, { useState, useEffect } from "react";
import isEmpty from "ramda/src/isEmpty";

// components
import DefaultInput from "../../components/input/input";

// services
import projectService from "../../services/project.service";

const Projects = () => {
  const [searchedText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [displayResult, setDisplayResult] = useState(false);

  const SearchResult = (
    <div className='border-x border-b max-h-40 scrollbar-thin scrollbar-thumb-slate-200  overflow-y-scroll rounded-sm border-sideBarBorder block shadow-md'>
      {searchResult?.map((item) => {
        return (
          <p
            key={item.projectName}
            className='py-1 px-2 cursor-pointer hover:bg-sideBarBorder text-sideBarText'
          >
            {item.projectName}
          </p>
        );
      })}
    </div>
  );

  const handleInput = e => {
    setDisplayResult(true)
    setSearchText(e.target.value)
  }

  useEffect(() => {
    setSearchResult([])
    const timer = setTimeout(() => {
      if (searchedText.length > 0) {
        projectService
          .getSearchedProject({ slug: searchedText })
          .then((res) => {
            setSearchResult(res);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        return;
      }
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [searchedText]);

  return (
    <div>
      Projects
      <div className='py-6 flex justify-center'>
        <div className='flex flex-col justify-center sm:w-96 w-full'>
          <DefaultInput
            type='search'
            className='py-3'
            placeholder='Search Project'
            value={searchedText}
            onChange={handleInput}
            onBlur={() => setDisplayResult(false)}
          />
          {!isEmpty(SearchResult) && displayResult && SearchResult}
        </div>
      </div>
    </div>
  );
};

export default Projects;
