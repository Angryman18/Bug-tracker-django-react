// vendors

import React, { useEffect, useState } from "react";

// components
import Modal from "../../components/modal/Modal.jsx";
import DefaultInput from "../../components/input/input.js";
import SelectBox from "../../components/select/select.js";
import DefaultTextArea from "../../components/textarea/textarea.js";
import { Button } from "@material-tailwind/react";

// hooks
import useFormValid from "../../hooks/useFormvalid.js";

// services
import bugServices from "../../services/bug.services.js";

const initialFormData = {
  title: "",
  description: "",
  priority: "Low",
  project: "",
};

const initialErrorState = {
  title: false,
  description: false,
  project: false,
  priority: false,
};

const AddBugModal = ({ toggle, showModal, projects, forceRefresh }) => {
  const [formData, setFormData] = useState({ ...initialFormData });
  const [error, setError] = useState({ ...initialErrorState });

  const { checkFieldLength, blankCheck } = useFormValid();

  const getAllInputValue = (e) => {
    setError({ ...error, [e.target.name]: false });
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setFormData({ ...initialFormData });
    setError({ ...initialErrorState });
  }, [showModal]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      checkFieldLength(formData.title, 5) &&
      checkFieldLength(formData.description, 10) &&
      !blankCheck(formData.project) &&
      !blankCheck(formData.priority)
    ) {
      console.log({...formData, reportdate: new Date()})
      bugServices
        .addBug({...formData, reportdate: new Date()})
        .then((response) => {
          console.log(response);
          toggle();
          forceRefresh()
        })
        .catch((err) => {
          console.log(err)
        });
    } else {
      return setError({
        title: !checkFieldLength(formData.title, 5),
        description: !checkFieldLength(formData.description, 10),
        project: blankCheck(formData.project),
        priority: blankCheck(formData.priority),
      });
    }
  };

  return (
    <Modal size='md' toggle={toggle} showModal={showModal}>
      <Modal.Header toggler={toggle}>Report Bug</Modal.Header>
      <div className='py-4 px-3 sm:px-8 flex flex-col gap-y-4'>
        <DefaultInput
          name='title'
          labelText='Title'
          placeholder='Bug Title'
          type='text'
          value={formData.title}
          onChange={getAllInputValue}
          extraText='minimum 5 characters'
          error={error.title}
        />
        <DefaultTextArea
          name='description'
          labelText='Description'
          placeholder='Description'
          type='text'
          value={formData.description}
          onChange={getAllInputValue}
          extraText='minimum 10 characters'
          error={error.description}
        />
        <SelectBox
          name='project'
          value={formData.project}
          labelText='Project'
          onChange={getAllInputValue}
          error={error.project}
        >
          <option className='text-sideBarText' hidden>
            Select Project
          </option>
          {projects?.map((item) => {
            return (
              <option key={item.projectName} value={item.id}>
                {item.projectName}
              </option>
            );
          })}
        </SelectBox>
        <SelectBox
          name='priority'
          labelText='Select Priority'
          value={formData.priority}
          onChange={getAllInputValue}
          error={error.priority}
        >
          <option value='Low'>Low</option>
          <option value='Medium'>Medium</option>
          <option value='High'>High</option>
        </SelectBox>
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
  );
};

export default AddBugModal;
