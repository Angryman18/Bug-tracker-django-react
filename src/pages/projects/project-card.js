// vendors
import React from "react";
import { Card, CardBody } from "@material-tailwind/react";

// hooks
import useDateFormat from "../../hooks/useFormat";

const ProjectCard = ({ projectName, description, uploadData }) => {
  const { formatDate } = useDateFormat();

  // [
  //   {
  //     "id": 1,
  //     "user": {
  //       "id": 1,
  //       "username": "shyam",
  //       "email": "imsmahanta@gmail.com",
  //       "date_joined": "2022-03-18T09:23:13.250887Z",
  //       "last_login": "2022-03-18T09:23:21.871346Z"
  //     },
  //     "projectName": "Bug Tracker App",
  //     "description": "to track all type bug",
  //     "image": null,
  //     "uploadData": "2022-03-18T09:25:52.557071Z",
  //     "githubLink": null,
  //     "liveSiteLink": "https://www.google.com",
  //     "contributers": null,
  //     "message": null,
  //     "recruiting": false
  //   }
  // ]

  return (
    <Card>
      <CardBody>
        <h1 className='text-xl'>{projectName}</h1>
        <p className='text-sm text-disbaledText py-0.5'>
          {formatDate(uploadData)}
        </p>
        <p className='text-sm text-sideBarText'>{description}</p>
      </CardBody>
    </Card>
  );
};

export default ProjectCard;
