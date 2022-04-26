import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

// components
import Modal from "@components/modal/Modal.jsx";
import DefaultTextArea from "@components/textarea/textarea";
import SelectBox from "@components/select/select";
import { Button, Label } from "@material-tailwind/react";
import Clip from "./clip";

// services
import manageService from "@service/manage.service";

// actions
import { getUserSpeceficBugs } from "@actions/manage.action";

const initialFormData = {
  msg: "",
  status: "",
};

const FeatureModal = ({ openModal, toggle, featureDetails }) => {
  const msgRef = useRef();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ ...initialFormData });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (openModal) {
      msgRef.current.focus();
    }
  }, [openModal]);

  useEffect(() => {
    setFormData({
      msg: featureDetails?.msg ?? "",
      status: featureDetails?.status ?? "Unverified",
    });
  }, [featureDetails]);

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     console.log(formData);
  //     const Obj = {
  //       ...formData,
  //       featureId: featureDetails?.id,
  //     };
  //     manageService
  //       .updateBugStatus(Obj)
  //       .then(async (res) => {
  //         await dispatch(getUserSpeceficBugs());
  //         toast.success("Bug updated successfully", {
  //           theme: "colored",
  //         });
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         toast.error("You are not authorized to update this bug", {
  //           theme: "colored",
  //         });
  //       })
  //       .finally(() => {
  //         toggle();
  //       });
  //   };

  return (
    <Modal size='md' showModal={openModal} toggle={toggle}>
      <Modal.Header toggler={toggle}>Manage Feature Request</Modal.Header>
      <div className='py-4 px-3 sm:px-8 flex flex-col gap-y-4'>
        <DefaultTextArea
          name='msg'
          ref={msgRef}
          labelText='Display Message'
          placeholder='Write Message'
          type='text'
          value={formData?.msg}
          onChange={handleInputChange}
          extraText={`Maximum 25 characters (${formData?.msg?.length}/25)`}
        />
        <div className='flex flex-row gap-x-2 gap-y-1'>
          <Clip
            text='In Discussion.'
            setText={(val) => setFormData({ ...formData, msg: val })}
          />
          <Clip
            text='Feature Request Accepted.'
            setText={(val) => setFormData({ ...formData, msg: val })}
          />
          <Clip
            text='Not Required.'
            setText={(val) => setFormData({ ...formData, msg: val })}
          />
        </div>
        <SelectBox
          name='status'
          value={formData?.status}
          labelText='Current Bug Status'
          onChange={handleInputChange}
        >
          <option value='Unverified'>Unverified</option>
          <option value='in Talk'>in Talk</option>
          <option value='Accepted'>Accepted</option>
          <option value='Rejected'>Rejected</option>
        </SelectBox>
        <div className='flex justify-between py-2'>
          <div>
            <Button
              color='red'
              buttonType='filled'
              size='regular'
              rounded={false}
              block={false}
              iconOnly={false}
              ripple='light'
              className='py-3'
            >
              Delete
            </Button>
          </div>
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
              onClick={() => null}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default FeatureModal;
