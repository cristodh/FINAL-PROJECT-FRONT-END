import React, { useState } from "react";
import TaskUpload from "./TaskUpload";
import "../../styles/Student/TaskList.css";

function TaskList({ tasks, courseId }) {
  const [selectedTask, setSelectedTask] = useState(null);

  const getStatusBadge = (status) => {
    const badges = {
      'pendiente': { class: 'status-pending', text: 'Pendiente' },
      'entregada': { class: 'status-submitted', text: 'Entregada' },
      'calificada': { class: 'status-graded', text: 'Calificada' }
    };
    return badges[status] || badges['pendiente'];
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  const isOverdue = (dueDate, status) => {
    const today = new Date();
    const due = new Date(dueDate);
    return status === 'pendiente' && due < today;
  };

  const handleTaskClick = (task) => {
    if (task.status === 'pendiente') {
      setSelectedTask(task);
    }
  };

  const handleCloseUpload = () => {
    setSelectedTask(null);
  };

  const handleTaskSubmitted = () => {
    setSelectedTask(null);
    // Aquí podrías actualizar el estado de las tareas
    window.location.reload(); // Temporal, mejor usar estado
  };

  return (
    <div className="task-list">
      <h3>Tareas del Curso</h3>
      
      {tasks.length === 0 ? (
        <div className="no-tasks">
          <p>No hay tareas disponibles para este curso.</p>
        </div>
      ) : (
        <div className="tasks-grid">
          {tasks.map((task) => {
            const statusInfo = getStatusBadge(task.status);
            const overdue = isOverdue(task.dueDate, task.status);
            
            return (
              <div
                key={task.id}
                className={`task-card ${task.status === 'pendiente' ? 'clickable' : ''} ${overdue ? 'overdue' : ''}`}
                onClick={() => handleTaskClick(task)}
              >
                <div className="task-header">
                  <h4 className="task-title">{task.title}</h4>
                  <span className={`status-badge ${statusInfo.class}`}>
                    {statusInfo.text}
                  </span>
                </div>
                
                <p className="task-description">{task.description}</p>
                
                <div className="task-details">
                  <div className="task-due-date">
                    <span className="label">Fecha de entrega:</span>
                    <span className={`date ${overdue ? 'overdue-date' : ''}`}>
                      {formatDate(task.dueDate)}
                      {overdue && <span className="overdue-text"> (Vencida)</span>}
                    </span>
                  </div>
                  
                  {task.githubRequired && (
                    <div className="github-required">
                      <span className="github-icon">📁</span>
                      <span>Requiere repositorio GitHub</span>
                    </div>
                  )}
                  
                  {task.githubLink && (
                    <div className="github-link">
                      <span className="label">Repositorio:</span>
                      <a href={task.githubLink} target="_blank" rel="noopener noreferrer">
                        Ver en GitHub
                      </a>
                    </div>
                  )}
                  
                  {task.professorComments && (
                    <div className="professor-comments">
                      <span className="label">Comentarios del profesor:</span>
                      <p className="comments-text">{task.professorComments}</p>
                    </div>
                  )}
                </div>
                
                {task.status === 'pendiente' && (
                  <div className="task-actions">
                    <button className="submit-btn">
                      Entregar Tarea
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
      
      {selectedTask && (
        <TaskUpload
          task={selectedTask}
          onClose={handleCloseUpload}
          onSubmitted={handleTaskSubmitted}
        />
      )}
    </div>
  );
}

export default TaskList;