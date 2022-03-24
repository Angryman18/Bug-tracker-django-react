import React, { useState, useEffect } from "react";
import isEmpty from "ramda/src/isEmpty";

// components
import DefaultInput from "../../components/input/input";

// services
import projectService from "../../services/project.service";

function SearchProject({searchProjectClickHandler}) {
  const [searchedText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [displayResult, setDisplayResult] = useState(false);

  const SearchResult = (
    <div className='border-x border-b absolute w-full max-h-40 scrollbar-thin scrollbar-thumb-slate-200  overflow-y-scroll rounded-sm border-sideBarBorder block shadow-md'>
      {searchResult?.map((item) => {
        return (
          <p
            key={item.projectName}
            className='py-1 px-2 cursor-pointer bg-white hover:bg-sideBarBorder text-sideBarText'
            onClick={e => searchProjectClickHandler(e, item)}
          >
            {item.projectName}
          </p>
        );
      })}
    </div>
  );

  const handleInput = (e) => {
    setDisplayResult(true);
    setSearchText(e.target.value);
  };

  useEffect(() => {
    setSearchResult([]);
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
      <DefaultInput
        type='search'
        className='py-3'
        placeholder='Search Project'
        value={searchedText}
        onChange={handleInput}
        // onBlur={() => setDisplayResult(false)}
      />
      <div className='relative'>
        {!isEmpty(SearchResult) && displayResult && SearchResult}
      </div>
    </div>
  );
}

export default SearchProject;
