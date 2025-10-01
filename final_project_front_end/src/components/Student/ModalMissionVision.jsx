import React from "react";
import "../../styles/Student/ModalMissionVision.css";
import logo from "../../images/Student/LOGOPORTAL.png";

function ModalMissionVision({ open, onClose }) {
  if (!open) return null;
  return (
    <div className="mmv-modal-overlay" onClick={onClose}>
      <div className="mmv-modal" onClick={e => e.stopPropagation()}>
        <img src={logo} alt="Logo OneConnect" className="mmv-logo" />
        <h2 className="mmv-title">Misión</h2>
        <p className="mmv-text">
          Facilitar al alumno el aprendizaje y la interacción con las herramientas del curso, eliminando barreras y promoviendo una experiencia educativa accesible y eficiente.
        </p>
        <h2 className="mmv-title">Visión</h2>
        <p className="mmv-text">
          Ir implementando más funcionalidades para llegar a ser la mejor plataforma educativa, cubriendo cada vez más necesidades de los alumnos y evolucionando junto a ellos.
        </p>
        <button className="mmv-close-btn" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}

export default ModalMissionVision;
