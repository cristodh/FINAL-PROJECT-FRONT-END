import React from "react";
import "../../styles/Student/ModalPDFTerms.css";

const ModalPDFTerms = ({ pdfUrl, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modalOverlay" onClick={onClose}>
      <div className="modalContent" onClick={(e) => e.stopPropagation()}>
        <button className="closeBtn" onClick={onClose}>✖</button>
        <iframe 
          src={pdfUrl} 
          title="Documento PDF" 
          className="pdfViewer"
        />
      </div>
    </div>
  );
};

export default ModalPDFTerms;