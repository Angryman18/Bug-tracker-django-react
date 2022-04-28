import React, { useRef, useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

// components
import Modal from "@components/modal/Modal.jsx";
import DefaultInput from "@components/input/input.js";
import DefaultTextArea from "@components/textarea/textarea.js";
import SelectBox from "@components/select/select";

// services
import featureService from "@service/feature.service";

// actions
import { retrieveAllFeature } from "@actions/feature.action";

const initialState = {
  title: "",
  description: "",
  project: "",
};

// apealdate

const AddFeatureModal = ({ showModal, toggle, projects, forceLoading, disableSelection }) => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [formData, setFormData] = useState({
    ...initialState,
    project: disableSelection?.id ?? '',
  });
  const [error, setError] = useState({
    title: false,
    description: false,
    project: false,
  });

  useEffect(() => {
    inputRef.current.focus();
    setFormData({...initialState, project: disableSelection?.id ?? ''});
  }, [showModal]);

  const getAllInputValue = (e) => {
    setError({ ...error, [e.target.name]: false });
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (
      formData.title.length < 5 ||
      formData.description.length < 20 ||
      !formData.project
    ) {
      return setError({
        title: formData.title.length < 5,
        description: formData.description.length < 20,
        project: !formData.project,
      });
    } else if (!error.title && !error.description && !error.project) {
        console.log(formData)
      forceLoading();
      try {
        await featureService.addFeature({ ...formData, apealdate: new Date() });
        await dispatch(retrieveAllFeature());
        toggle();
        forceLoading();
        return toast.success("Feature Request Submitted Successfully", {
          theme: "colored",
        });
      } catch (err) {
        toggle();
        forceLoading();
        return toast.error(err.details ?? "Error Adding Feature", {
          theme: "colored",
        });
      }
    }
  };

  return (
    <Modal size='md' showModal={showModal} toggle={toggle}>
      <Modal.Header toggler={toggle}>Submit Feature Request</Modal.Header>
      <div className='py-4 px-3 sm:px-8 flex flex-col gap-y-4'>
        <DefaultInput
          name='title'
          labelText='Title'
          placeholder='Feature Title'
          type='text'
          value={formData.title}
          onChange={getAllInputValue}
          extraText='Minimum 5 characters'
          error={error.title}
          ref={inputRef}
        />
        <DefaultTextArea
          name='description'
          labelText='Description'
          placeholder='Description'
          type='text'
          value={formData.description}
          onChange={getAllInputValue}
          extraText={`'Minimum 20 characters' ${formData.description.length}/20`}
          error={error.description}
        />
        <SelectBox
          name='project'
          value={formData.project}
          labelText='Project'
          error={error.project}
          onChange={!!disableSelection ? null : getAllInputValue}
          disabled={!!disableSelection}
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

export default AddFeatureModal;
