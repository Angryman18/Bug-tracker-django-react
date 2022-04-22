// vendors
import React, { useState, useRef, useEffect } from "react";

// components
import Modal from "@components/modal/Modal.jsx";
import DefaultInput from "@components/input/input";
import DefaultTextArea from "@components/textarea/textarea";
import { Button } from "@material-tailwind/react";
import { toast } from "react-toastify";

// hooks
import useFormValid from "@hooks/useFormvalid";

// services
import projectServices from '@service/project.service'

const initialFormData = {
  projectName: "",
  description: "",
  githubLink: "",
  liveSiteLink: "",
};

const initialErrorFields = {
  projectName: false,
  description: false,
  githubLink: false,
  liveSiteLink: false,
};

const AddProjectModal = ({ toggle, showModal, forceOverlayLoading, forceReloading }) => {
  const [formData, setFormData] = useState({ ...initialFormData });
  const [error, setError] = useState({ ...initialErrorFields });

  const formFocus = useRef()

  const { checkFieldLength, blankCheck } = useFormValid();

  const getAllInputValue = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      checkFieldLength(formData.projectName, 10) &&
      checkFieldLength(formData.description, 20) &&
      !blankCheck(formData.githubLink) &&
      !blankCheck(formData.liveSiteLink)
    ) {
      forceOverlayLoading(true)
      projectServices.addProject(formData)
        .then((res) => {
          toggle();
          forceOverlayLoading(false)
          forceReloading()
          toast.success("Project is Added", {
            theme: "colored",
          });
        })
        .catch((err) => {
          forceOverlayLoading(false)
          forceReloading()
          toast.error(err.message ?? "Project Cannot be Added", {
            theme: "colored",
          });
          toggle();
        });
    } else {
      return setError({
        projectName: !checkFieldLength(formData.projectName, 10),
        description: !checkFieldLength(formData.description, 20),
        githubLink: blankCheck(formData.githubLink),
        liveSiteLink: blankCheck(formData.liveSiteLink),
      });
    }
  };

  useEffect(() => {
    formFocus.current.focus()
    setFormData({ ...initialFormData })
    setError({ ...initialErrorFields })
  },[showModal])

  return (
    <div>
      <Modal size='md' toggle={toggle} showModal={showModal}>
        <Modal.Header toggler={toggle}>Add Project</Modal.Header>
        <div className='py-4 px-3 sm:px-8 flex flex-col gap-y-4'>
          <DefaultInput
            name='projectName'
            labelText='Name of the Project'
            placeholder='Project Name'
            type='text'
            value={formData.projectName}
            onChange={getAllInputValue}
            extraText='minimum 5 characters'
            error={error.projectName}
            ref={formFocus}
          />
          <DefaultTextArea
            name='description'
            labelText='Project Description'
            placeholder='Enter Some Project Description'
            type='text'
            value={formData.description}
            onChange={getAllInputValue}
            extraText='minimum 10 words'
            error={error.description}
          />
          <DefaultInput
            name='githubLink'
            labelText='Project Github Link'
            placeholder='Enter Github URL'
            type='text'
            value={formData.githubLink}
            onChange={getAllInputValue}
            error={error.githubLink}
          />
          <DefaultInput
            name='liveSiteLink'
            labelText='Project Live URL'
            placeholder='Project Link'
            type='text'
            value={formData.liveSiteLink}
            onChange={getAllInputValue}
            error={error.liveSiteLink}
          />

          <div className='flex justify-end py-2'>
            <div className='flex flex-row items-center gap-x-2'>
              <Button
                color='lightBlue'
                buttonType='outline'
                size='regular'
                rounded={false}
                block={false}
                iconOnly={false}
                className='py-3'
                ripple='dark'
                onClick={toggle}
              >
                Cancel
              </Button>
              <Button
                color='lightBlue'
                buttonType='filled'
                size='regular'
                rounded={false}
                block={false}
                iconOnly={false}
                ripple='light'
                className='py-3'
                onClick={submitHandler}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddProjectModal;
