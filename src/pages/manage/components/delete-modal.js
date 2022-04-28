import React from "react";
import { Button } from "@material-tailwind/react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

// components
import Modal from "@components/modal/Modal.jsx";

// service
import manageService from "@service/manage.service";

// actions
import { getUserSpeceficContent } from "@actions/manage.action";

const BUGS = "BUGS";
const FEATURES = "FEATURES";

const DeleteConfirmation = ({
  openModal,
  toggle,
  apiConfig,
  deleteDetails,
  deleteHandler,
  setLoading,
  view,
}) => {
  const dispatch = useDispatch();

  const handleFeatureDelete = (val) => {
    setLoading(true);
    manageService
      .deleteFeature(val)
      .then(async (res) => {
        await dispatch(getUserSpeceficContent());
        toast.success(res.message ?? "Feature Request Deleted successfully", {
          theme: "colored",
        });
      })
      .catch((err) => {
        toast.error(err.message ?? "Failed to Update", {
          theme: "colored",
        });
      })
      .finally(() => {
        setLoading(false);
        toggle();
      });
  };

  const handleBugDelete = (val) => {
    setLoading(true);
    manageService
      .deleteBug(val)
      .then(async (res) => {
        await dispatch(getUserSpeceficContent());
        toast.success(res.message ?? "Bug Report Deleted successfully", {
          theme: "colored",
        });
      })
      .catch((err) => {
        console.log(err)
        toast.error(err.message ?? "Failed to Update", {
          theme: "colored",
        });
      })
      .finally(() => {
        setLoading(false);
        toggle();
      });
  };

  const handleSubmit = (val) => (e) => {
    e.preventDefault();
    console.log("delete button clicked", val);
    if (view === FEATURES) {
      return handleFeatureDelete(val);
    } else if (view === BUGS) {
      return handleBugDelete(val);
    }
  };

  return (
    <Modal size='sm' showModal={openModal} toggle={toggle}>
      <Modal.Header toggler={toggle}>Delete Item</Modal.Header>
      <div className='py-4 px-3 sm:px-8 flex flex-col gap-y-4'>
        <h1 className='text-center text-lg'>Are you sure want to delete?</h1>
        <div className='flex flex-row justify-between items-center gap-x-2'>
          <Button
            color='lightBlue'
            buttonType='filled'
            size='regular'
            rounded={false}
            block={false}
            iconOnly={false}
            className='py-2'
            ripple='dark'
            onClick={toggle}
          >
            No
          </Button>
          <Button
            color='red'
            buttonType='filled'
            size='regular'
            rounded={false}
            block={false}
            iconOnly={false}
            ripple='light'
            className='py-3'
            onClick={handleSubmit(deleteDetails?.id)}
          >
            Yes
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmation;
