// vendors
import React from "react";

// sub components
import ModalHeader from "./ModalHeader.jsx";
import ModalFooter from "./ModalFooter.jsx";

import "./Modal.css";

const Modal = ({ size, showModal, toggle, children }) => {
  let className;
  if (size === "sm") {
    className = "base-modal modal-sm";
  } else if ((size = "md")) {
    className = "base-modal modal-md";
  } else if ((size = "lg")) {
    className = "base-modal modal-lg";
  } else {
    className = "modal-sm";
  }

  return (
    <div className={`${!showModal ? "showModal" : "px-4"}`}>
      <div className={className}>{children}</div>
      <div onClick={toggle} className='backdrop'></div>
    </div>
  );
};

Modal.Header = ModalHeader;
Modal.Footer = ModalFooter

export default Modal;
