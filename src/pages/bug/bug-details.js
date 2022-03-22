// vendors
import React from "react";
import { Button, Icon } from "@material-tailwind/react";
import useDateFormat from "../../hooks/useFormat";
import SinglePara from "./components/single-para";

// 
import ProfileView from "./profile-view";

const BugDetails = ({ toggle, data, profileToggle, mountAndToggle }) => {
  const { formatDate } = useDateFormat();
  const { reportedBy, project } = data;

  const openProfileModal = (e) => {
    // profileToggle()
    mountAndToggle(e, reportedBy.username);
  }



  return (
    <div className='sm:mx-4 mx-0.5 text-sm'>
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
        <p className='text-sm text-sideBarText py-2'>
          {formatDate(data?.reportDate ?? new Date())}
        </p>
        <div className='border-l-8 border-cardBorder bg-cardbg'>
          <div className='px-6 py-4'>
            <h1 className='text-2xl'>{data.title}</h1>
            <div className='text-sideBarText'>
              <SinglePara
                fieldName='Reported by'
                value={reportedBy?.username}
                onClick={openProfileModal}
              />
              <SinglePara
                fieldName='Project Title'
                value={project?.projectName}
                nolink={true}
              />
              <SinglePara
                fieldName='Project Link'
                value={project?.liveSiteLink}
              />
              <SinglePara fieldName='Github Link' value={project?.githubLink} />
              {/* <SinglePara fieldName='Reported by' value={reportedBy?.username} /> */}
            </div>
          </div>
        </div>
        <div className='py-6'>
          <h1 className='text-2xl'>Description</h1>
          <p className='text-justify text-sideBarText'>{data?.description}</p>
        </div>
      </div>
    </div>
  );
};


export default BugDetails;
