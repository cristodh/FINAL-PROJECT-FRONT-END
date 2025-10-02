import React, { useState } from "react";
import ModalMissionVision from "./ModalMissionVision";
import "../../styles/Student/HomeStudent.css";

function FooterStudent() {
  const [openModal, setOpenModal] = useState(false);
  return (
    <footer className="footer">
      <button
        className="btn-mision-vision"
        onClick={() => setOpenModal(true)}
        >
        Misión y Visión
      </button>
      <ModalMissionVision
        open={openModal}
        onClose={() => setOpenModal(false)}
        />
        <p>
          © {new Date().getFullYear()} OneConnect - Creado para estudiantes con
          ❤️
        </p>
    </footer>
  );
}

export default FooterStudent;
