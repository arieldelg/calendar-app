import React from "react";
import ReactDOM from "react-dom";

const Modal = ({ children }: { children: React.ReactNode }) => {
  return ReactDOM.createPortal(
    <div className="Modal w-screen h-screen absolute top-0 left-0 z-10">
      {children}
    </div>,
    document.getElementById("modal") as Element
  );
};

export default Modal;
