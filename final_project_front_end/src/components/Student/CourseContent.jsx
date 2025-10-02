import React, { useState } from "react";
import TaskList from "./TaskList";
import ClassRecording from "./ClassRecording";
import "../../styles/Student/CourseContent.css";

function CourseContent({ course, onBack }) {
  const [activeTab, setActiveTab] = useState('overview');

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  const getProgressPercentage = () => {
    const totalTasks = course.tasks.length;
    const completedTasks = course.tasks.filter(task => 
      task.status === 'entregada' || task.status === 'calificada'
    ).length;
    return totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="overview-content">
            <div className="course-summary">
              <div className="summary-grid">
                <div className="summary-card">
                  <div className="summary-icon">📚</div>
                  <div className="summary-info">
                    <h4>Total de Tareas</h4>
                    <p className="summary-number">{course.tasks.length}</p>
                  </div>
                </div>
                
                <div className="summary-card">
                  <div className="summary-icon">✅</div>
                  <div className="summary-info">
                    <h4>Completadas</h4>
                    <p className="summary-number">
                      {course.tasks.filter(t => t.status === 'calificada').length}
                    </p>
                  </div>
                </div>
                
                <div className="summary-card">
                  <div className="summary-icon">⏳</div>
                  <div className="summary-info">
                    <h4>Pendientes</h4>
                    <p className="summary-number">
                      {course.tasks.filter(t => t.status === 'pendiente').length}
                    </p>
                  </div>
                </div>
                
                <div className="summary-card">
                  <div className="summary-icon">🎥</div>
                  <div className="summary-info">
                    <h4>Grabaciones</h4>
                    <p className="summary-number">{course.recordings.length}</p>
                  </div>
                </div>
              </div>
              
              <div className="progress-section">
                <h4>Progreso del Curso</h4>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${getProgressPercentage()}%` }}
                  ></div>
                </div>
                <p className="progress-text">{getProgressPercentage()}% completado</p>
              </div>
            </div>
            
            <div className="recent-activity">
              <h4>Actividad Reciente</h4>
              <div className="activity-list">
                {course.tasks.slice(0, 3).map((task) => (
                  <div key={task.id} className="activity-item">
                    <div className="activity-icon">
                      {task.status === 'pendiente' ? '📝' : 
                       task.status === 'entregada' ? '📤' : '✅'}
                    </div>
                    <div className="activity-info">
                      <p className="activity-title">{task.title}</p>
                      <p className="activity-status">
                        Estado: {task.status === 'pendiente' ? 'Pendiente' :
                                task.status === 'entregada' ? 'Entregada' : 'Calificada'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'tasks':
        return <TaskList tasks={course.tasks} courseId={course.id} />;
      
      case 'recordings':
        return <ClassRecording recordings={course.recordings} />;
      
      default:
        return null;
    }
  };

  return (
    <div className="course-content">
      <div className="course-header">
        <button className="course-back-btn" onClick={onBack}>
          ← Volver a Cursos
        </button>
        
        <div className="course-title-section">
          <div className="course-image-small">
            <img src={course.image} alt={course.name} />
          </div>
          <div className="course-title-info">
            <h1>{course.name}</h1>
            <p className="course-professor">{course.professorName}</p>
            <p className="course-duration">
              {formatDate(course.startDate)} - {formatDate(course.endDate)}
            </p>
          </div>
        </div>
      </div>
      
      <div className="course-tabs">
        <button 
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          📊 Resumen
        </button>
        <button 
          className={`tab-btn ${activeTab === 'tasks' ? 'active' : ''}`}
          onClick={() => setActiveTab('tasks')}
        >
          📝 Tareas ({course.tasks.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'recordings' ? 'active' : ''}`}
          onClick={() => setActiveTab('recordings')}
        >
          🎥 Grabaciones ({course.recordings.length})
        </button>
      </div>
      
      <div className="course-tab-content">
        {renderTabContent()}
      </div>
    </div>
  );
}

export default CourseContent;