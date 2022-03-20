import React from "react";
import Modal from "../../components/modal/Modal.jsx";
import ModalFooter from "../../components/modal/ModalFooter.jsx";
import ModalHeader from "../../components/modal/ModalHeader.jsx";
import profile from "../../images/profile.png";
import useDateFormat from "../../hooks/useFormat";

// utils
import format from "date-fns/format";

const ProfileView = ({ showModal, toggle, profileObj }) => {
  const {formatDate} = useDateFormat()
  const {user} = profileObj
  return (
    <div className='w-fullwidth'>
      <Modal size='md' toggle={toggle} showModal={showModal}>
        <ModalHeader toggler={toggle}>Profile</ModalHeader>
        <div className='h-full border rounded-md'>
          <div className='py-3 sm:py-6 px-4 sm:px-12 flex justify-start items-center'>
            <div className='flex flex-row gap-x-4'>
              <div className='w-24 h-24 sm:w-28 sm:h-28 rounded-full'>
                <img src={profile} alt='profile' />
              </div>
              <div className='flex-1 justify-start items-center flex-col'>
                <p className='text-xl sm:text-2xl font-bold text-deepSlate'>
                  {user?.username}
                </p>
                <p className='text-lg text-sideBarText'>{profileObj?.signedAs}</p>
                <p className='text-sm text-sideBarText'>{profileObj?.technology}</p>
                <p className='text-xs sm:text-sm text-slate-500 italic'>
                {format(new Date(user?.date_joined ?? new Date()), "do MMM, yyyy hh:mm a")}
                </p>
              </div>
            </div>
          </div>
          <div className='px-4 sm:px-12 text-sideBarText text-justify flex justify-center items-center'>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution
          </div>
          <div className='px-4 sm:px-12 grid grid-flow-row grid-cols-6 py-4'>
            <div className='col-span-2 border-r pr-2 border-sideBarBorder'>
              <div className='flex text-xs sm:text-sm flex-col gap-y-0.5 sm:gap-y-1'>
                <p className='text-slate-600 hover:underline cursor-pointer'>
                  total posts (31)
                </p>
                <p className='text-slate-600 hover:underline cursor-pointer'>
                  comments (28)
                </p>
                <p className='text-slate-600 hover:underline cursor-pointer'>
                  bug reported (26)
                </p>
                <hr className='mr-8 my-2 border-sideBarBorder' />
                <p className='text-link underline cursor-pointer'>Portfolio</p>
                <p className='text-link underline cursor-pointer'>Github</p>
                <p className='text-link underline cursor-pointer'>LinkedIn</p>
              </div>
            </div>
            <div className='col-span-4 pl-4'>
              <p className='text-sideBarBorder'>No Activity</p>
            </div>
          </div>
          <div className='sm:px-12 px-4 text-xs pb-4 text-sideBarText'>
            Last Login: {user?.last_login ? formatDate(user?.last_login) : 'Not Updated'}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProfileView;
