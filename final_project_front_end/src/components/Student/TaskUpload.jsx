import React, { useState } from "react";
import { postData } from "../../services/fetchs";
import "../../styles/Student/TaskUpload.css";

function TaskUpload({ task, onClose, onSubmitted }) {
  const [githubLink, setGithubLink] = useState('');
  const [comments, setComments] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateGithubLink = (url) => {
    const githubRegex = /^https?:\/\/(www\.)?github\.com\/[\w\-\.]+\/[\w\-\.]+\/?$/;
    return githubRegex.test(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!githubLink.trim()) {
      alert('Por favor, ingresa el enlace del repositorio de GitHub');
      return;
    }
    
    if (!validateGithubLink(githubLink)) {
      alert('Por favor, ingresa un enlace válido de GitHub');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Obtener datos del estudiante
      const studentData = JSON.parse(localStorage.getItem("estudianteRegistrado")) || {};
      
      // Crear objeto de submission
      const submissionData = {
        taskId: task.id,
        studentId: studentData.id,
        courseId: task.courseId,
        githubLink: githubLink.trim(),
        comments: comments.trim(),
        submittedDate: new Date().toISOString(),
        status: "entregada",
        score: null,
        professorFeedback: ""
      };
      
      // Enviar al backend
      await postData(submissionData, "taskSubmissions");
      
      alert('Tarea entregada exitosamente');
      onSubmitted();
    } catch (error) {
      console.error('Error submitting task:', error);
      alert('Error al entregar la tarea. Por favor, intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  return (
    <div className="task-upload-overlay" onClick={onClose}>
      <div className="task-upload-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Entregar Tarea</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body">
          <div className="task-info">
            <h4>{task.title}</h4>
            <p className="task-description">{task.description}</p>
            <p className="due-date">
              <strong>Fecha de entrega:</strong> {formatDate(task.dueDate)}
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="upload-form">
            <div className="form-group">
              <label htmlFor="githubLink">
                Enlace del repositorio de GitHub *
              </label>
              <input
                type="url"
                id="githubLink"
                value={githubLink}
                onChange={(e) => setGithubLink(e.target.value)}
                placeholder="https://github.com/tu-usuario/nombre-repositorio"
                required
              />
              <small className="help-text">
                Asegúrate de que el repositorio sea público o hayas dado acceso al profesor
              </small>
            </div>
            
            <div className="form-group">
              <label htmlFor="comments">
                Comentarios adicionales (opcional)
              </label>
              <textarea
                id="comments"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Agrega cualquier comentario sobre tu entrega..."
                rows={4}
              />
            </div>
            
            <div className="github-instructions">
              <h5>📋 Instrucciones:</h5>
              <ul>
                <li>Asegúrate de que tu código esté bien documentado</li>
                <li>Incluye un archivo README.md con instrucciones de instalación</li>
                <li>Haz commits descriptivos durante el desarrollo</li>
                <li>El repositorio debe ser público o compartido con el profesor</li>
              </ul>
            </div>
          </form>
        </div>
        
        <div className="modal-footer">
          <button type="button" className="cancel-btn" onClick={onClose}>
            Cancelar
          </button>
          <button 
            type="submit" 
            className="submit-btn"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Entregando...' : 'Entregar Tarea'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskUpload;