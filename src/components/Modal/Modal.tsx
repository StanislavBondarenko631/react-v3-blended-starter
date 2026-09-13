import type React from "react";
import styled from "./Modal.module.css";
import { useEffect } from "react";

interface ModalProps{
  children: React.ReactNode
  onClose: () => void
}

export default function Modal({children, onClose}:ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
   if(event.currentTarget === event.target){
    onClose();
   }
  }
  return (
    <div onClick={handleClick} className={styled.backdrop} role="dialog" aria-modal="true">
      <div className={styled.modal}>
        <button onClick={() => onClose()} className={styled.closeButton} aria-label="Close modal">
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}
