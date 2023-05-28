import React from "react";
import "./ScrollableModal.css";
import ScrollableDetail from "./ScrollableDetail";

const ScrollableModal = ({isOpen, onClose, children, detail}) => {
  return (
    <>
      {isOpen && (
         <ScrollableDetail isOpen={isOpen} onClose={onClose} children={children} detail={detail}/>
      )}
    </>
  );
};

export default ScrollableModal;
