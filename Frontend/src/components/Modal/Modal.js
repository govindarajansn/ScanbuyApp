import React from "react";
import ReactDOM from "react-dom";
import "./modal.scss";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  console.log("hello");
  return ReactDOM.createPortal(
    <div className="modal-container">
      <div className="modal-overlay" onClick={onClose} />
      <div className="modal-content">
        <div className="modal-button-container">
          {" "}
          <button className="modal-close" onClick={onClose}>
            x
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Modal;
