import React from "react";
import Modal from "../../components/modal/Modal";
import ModalFooter from "../../components/modal/ModalFooter";
import ModalHeader from "../../components/modal/ModalHeader";

const ProfileView = ({ size, showModal, toggle, children }) => {
  return (
    <div className='w-fullwidth'>
      <Modal size='lg' toggle={toggle} showModal={showModal}>
        <ModalHeader toggler={toggle}>Profile</ModalHeader>
        <div className=''>
          <div className='h-24 bg-sky-500'>
            <p className='text-2xl text-white'>Profile</p>
          </div>
          <div className='bg-white w-25 h-25'>
            {/* <div className='flex flex-col w-25 h-25 bg-white'></div> */}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProfileView;
