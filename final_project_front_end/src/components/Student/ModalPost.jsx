import React, { useState } from "react";
import { postData } from "../../services/fetchs";
import "../../styles/Student/ModalPost.css";

function ModalPost({ open, onClose }){
  if (!open) return null;
  
  const [tituloPublicacion, setTituloPublicacion] = useState('');
  const [descripcionPublicacion, setDescripcionPublicacion] = useState('');
  const [topicoPublicacion, setTopicoPublicacion] = useState('');
  const [usuario, setUsuario] = useState(
    JSON.parse(localStorage.getItem("estudianteRegistrado")) || {}
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      title: tituloPublicacion,
      description: descripcionPublicacion,
      topic: topicoPublicacion,
      userId: usuario.id,
      date: new Date().toISOString(),
      userName: usuario.name + " " + usuario.lastName
    };
    await postData(data, "posts");
    onClose();
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  const isFormValid = tituloPublicacion.trim() && descripcionPublicacion.trim() && topicoPublicacion;

  return (
    <div className="modal-post-overlay" onClick={onClose}>
      <div className="modal-post-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-post-header">
          <h2 className="modal-post-title">Nueva Publicación</h2>
          <button className="close-btn" onClick={onClose}>×</button>
          
          <input 
            type="text" 
            className="form-input"
            placeholder="Título de publicación" 
            value={tituloPublicacion} 
            onChange={(e) => setTituloPublicacion(e.target.value)} 
          />
          
          <input 
            type="text" 
            className="form-input"
            placeholder="Descripción de publicación" 
            value={descripcionPublicacion} 
            onChange={(e) => setDescripcionPublicacion(e.target.value)} 
          />
          
          <select 
            className="form-select"
            value={topicoPublicacion} 
            onChange={(e) => setTopicoPublicacion(e.target.value)}
          >
            <option value="" disabled>Tópico de la publicación</option>
            <option value="fe">Front-End</option>
            <option value="be">Back-End</option>
            <option value="op">Abierto</option>
          </select>
        </div>

        <div className="modal-post-body">
          <div className="preview-section">
            <h3 className="preview-title">{tituloPublicacion || "Vista previa del título"}</h3>
            <p className="preview-description">{descripcionPublicacion || "Vista previa de la descripción"}</p>
            {topicoPublicacion && <span className="preview-topic">{topicoPublicacion}</span>}
            <p className="preview-date">{formatDate(new Date())}</p>
          </div>
        </div>

        <div className="modal-post-footer">
          <button type="button" className="btn-cancel" onClick={onClose}>
            Cancelar
          </button>
          <button
            type="submit"
            className="btn-submit"
            onClick={handleSubmit}
            disabled={!isFormValid}
          >
            Agregar Publicación
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalPost;