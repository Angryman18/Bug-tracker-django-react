import React from "react";
import { ToastContainer, toast } from "react-toastify";

const Notification = () => {
  return (
    <ToastContainer
      position='top-right'
      autoClose={5000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover={false}
    />
  );
};

export default Notification;
