// vendors
import React from "react";
import { Button, Icon } from "@material-tailwind/react";

const SingleProject = ({toggle}) => {

    const BackButton = (<div className='sm:ml-8 my-6 block '>
    <Button
      color='blueGray'
      buttonType='link'
      size='regular'
      rounded={false}
      block={false}
      iconOnly={false}
      ripple='dark'
      className='h-10 px-0'
      onClick={toggle}
    >
      <Icon name='keyboard_backspace' size='50' /> Back
    </Button>        
  </div>)

  return (
    <div className='sm:mx-4 mx-0.5 text-sm'>
      {toggle && BackButton}
      Welcome to Bug Details BugPage
    </div>
  );
};

SingleProject.defaultProps = {
    toggle: false
}

export default SingleProject;
