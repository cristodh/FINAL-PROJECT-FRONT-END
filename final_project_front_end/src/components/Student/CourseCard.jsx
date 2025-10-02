import React from "react";
import "../../styles/Student/CourseCard.css";

function CourseCard({ course, onSelect }) {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  const getPendingTasksCount = () => {
    return course.tasks.filter(task => task.status === 'pendiente').length;
  };

  return (
    <div className="course-card" onClick={onSelect}>
      <div className="course-image">
        <img src={course.image} alt={course.name} />
        <div className="course-overlay">
          <span className="view-course">Ver Curso</span>
        </div>
      </div>
      
      <div className="course-info">
        <h3 className="course-name">{course.name}</h3>
        <p className="course-professor">{course.professorName}</p>
        <p className="course-description">{course.description}</p>
        
        <div className="course-dates">
          <div className="date-item">
            <span className="date-label">Inicio:</span>
            <span className="date-value">{formatDate(course.startDate)}</span>
          </div>
          <div className="date-item">
            <span className="date-label">Fin:</span>
            <span className="date-value">{formatDate(course.endDate)}</span>
          </div>
        </div>
        
        <div className="course-stats">
          <div className="stat-item">
            <span className="stat-number">{course.tasks.length}</span>
            <span className="stat-label">Tareas</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{getPendingTasksCount()}</span>
            <span className="stat-label">Pendientes</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{course.recordings.length}</span>
            <span className="stat-label">Grabaciones</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;