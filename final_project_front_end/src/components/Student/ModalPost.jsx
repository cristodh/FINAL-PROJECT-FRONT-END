import React, { useState } from "react";
import { postData } from "../../services/fetchs";
import "../../styles/Student/TaskUpload.css";

function ModalPost({ open, onClose }){
  if (!open) return null;
  const [tituloPublicacion, setTituloPublicacion] = useState('');
  const [descripcionPublicacion, setDescripcionPublicacion] = useState('');
  const [topicoPublicacion, setTopicoPublicacion] = useState('');
  const [usuario,setUsuario] = useState(
    JSON.parse(localStorage.getItem("estudianteRegistrado")) || {}
  );

  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      title: tituloPublicacion,
      description: descripcionPublicacion,
      topic: topicoPublicacion,
      userId: usuario.id,
      date: new Date().toISOString(),
      userName: usuario.name + " " + usuario.lastName
    };
    await postData(data,"posts");
    onClose();
  }


  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  return (
    <div className="task-upload-overlay" onClick={onClose}>
      <div className="task-upload-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3></h3>
          <button className="close-btn" onClick={onClose}>×</button>
          <input type="text" placeholder="Titulo de publicacion" value={tituloPublicacion} onChange={(e) => setTituloPublicacion(e.target.value)} />
          <input type="text" placeholder="Descripcion de publicacion" value={descripcionPublicacion} onChange={(e) => setDescripcionPublicacion(e.target.value)} />
          <select value={topicoPublicacion} onChange={(e) => setTopicoPublicacion(e.target.value)}>
            <option value="" disabled selected>Topico de la publicación</option>
            <option value="fe">Front-End</option>
            <option value="be">Back-End</option>
            <option value="op">Abierto</option>
          </select>
        </div>

        <div className="modal-body">
          <div>
            <h3>{tituloPublicacion}</h3>
            <p className="task-description">{descripcionPublicacion}</p>
            <p className="topic">{topicoPublicacion}</p>
            <p className="date">{formatDate(new Date())}</p>
          </div>
        </div>

      </div>

      <div className="modal-footer">
        <button type="button" className="cancel-btn" onClick={onClose}>
          Cancelar
        </button>
        <button
          type="submit"
          className="submit-btn"
          onClick={handleSubmit}
          
          >
        Agregar publicación
        </button>
      </div>
    </div>
  );
}

export default ModalPost;