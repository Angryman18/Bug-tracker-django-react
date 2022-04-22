// vendors
import React from "react";
import { Card, CardBody } from "@material-tailwind/react";

// hooks
import useDateFormat from "@hooks/useFormat";

import './card.css'

const ProjectCard = ({ projectObj, onClick }) => {
  const { formatDate } = useDateFormat();
  return (
    <Card className='h-44 my-4'>
      <CardBody>
        <h1 onClick={(e) => onClick(e, projectObj)} className='link cursor-pointer text-xl'>
          {projectObj?.projectName}
        </h1>
        <p className='text-sm text-disbaledText py-0.5'>
          {formatDate(projectObj?.uploadData)}
        </p>
        <p className='text-sm text-sideBarText content'>
          {projectObj?.description}
        </p>
      </CardBody>
    </Card>
  );
};

export default ProjectCard;
