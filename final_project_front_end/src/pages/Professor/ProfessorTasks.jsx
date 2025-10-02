import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ProfessorNavbar from '../../components/Professor/ProfessorNavbar'
import ProfessorSidebar from '../../components/Professor/ProfessorSidebar'
import AddIcon from '@mui/icons-material/Add'
import VisibilityIcon from '@mui/icons-material/Visibility'
import EditIcon from '@mui/icons-material/Edit'
import GradeIcon from '@mui/icons-material/Grade'
import '../../styles/Professor/ProfessorTheme.css'

function ProfessorTasks() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('pending') // 'pending', 'create', 'graded'
  const [tasks, setTasks] = useState([])
  const [submissions, setSubmissions] = useState([])
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    type: 'assignment', // 'assignment', 'project', 'exam'
    points: 100,
    courseId: '1',
    requirements: ''
  })
  const [selectedSubmission, setSelectedSubmission] = useState(null)
  const [showGradingModal, setShowGradingModal] = useState(false)

  useEffect(() => {
    // Verificar autenticación
    const storedData = localStorage.getItem('professorData')
    if (!storedData) {
      navigate('/professor-login')
      return
    }
    
    loadTasksData()
  }, [navigate])

  async function loadTasksData() {
    try {
      const response = await fetch('/src/services/db.json')
      const db = await response.json()
      
      // Simular tareas existentes
      const mockTasks = [
        {
          id: 't1',
          title: 'Proyecto Final - Aplicación Web',
          description: 'Desarrollar una aplicación web completa usando React y Node.js',
          dueDate: '2025-11-15',
          type: 'project',
          points: 200,
          courseId: '1',
          status: 'active',
          createdAt: '2025-10-01'
        },
        {
          id: 't2',
          title: 'Tarea HTML/CSS Responsive',
          description: 'Crear una página web responsive usando Flexbox y Grid',
          dueDate: '2025-10-10',
          type: 'assignment',
          points: 50,
          courseId: '1',
          status: 'active',
          createdAt: '2025-09-25'
        }
      ]

      // Simular entregas de estudiantes
      const mockSubmissions = [
        {
          id: 's1',
          taskId: 't2',
          studentId: '0',
          studentName: 'Christopher Delgado Hidalgo',
          studentEmail: 'cris2314',
          submittedAt: '2025-10-09',
          fileUrl: 'uploads/student_0_task_t2.zip',
          fileName: 'tarea_html_css.zip',
          status: 'submitted', // 'submitted', 'graded', 'late'
          grade: null,
          feedback: '',
          submissionText: 'He completado la tarea responsive. Incluye navbar, grid layout y media queries.'
        },
        {
          id: 's2',
          taskId: 't1',
          studentId: '0',
          studentName: 'Christopher Delgado Hidalgo',
          studentEmail: 'cris2314',
          submittedAt: null,
          status: 'pending'
        }
      ]

      setTasks(mockTasks)
      setSubmissions(mockSubmissions)
    } catch (error) {
      console.error('Error loading tasks:', error)
    }
  }

  function handleCreateTask(e) {
    e.preventDefault()
    
    const taskData = {
      ...newTask,
      id: 't' + Date.now(),
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0]
    }
    
    setTasks([...tasks, taskData])
    alert('Tarea creada exitosamente')
    
    // Limpiar formulario
    setNewTask({
      title: '',
      description: '',
      dueDate: '',
      type: 'assignment',
      points: 100,
      courseId: '1',
      requirements: ''
    })
    
    setActiveTab('pending')
  }

  function handleGradeSubmission(e) {
    e.preventDefault()
    
    if (!selectedSubmission) return
    
    const formData = new FormData(e.target)
    const grade = parseInt(formData.get('grade'))
    const feedback = formData.get('feedback')
    
    // Actualizar la entrega con calificación
    setSubmissions(prev => prev.map(sub => 
      sub.id === selectedSubmission.id 
        ? { ...sub, grade, feedback, status: 'graded', gradedAt: new Date().toISOString() }
        : sub
    ))
    
    setShowGradingModal(false)
    setSelectedSubmission(null)
    alert('Calificación guardada exitosamente')
  }

  function openGradingModal(submission) {
    setSelectedSubmission(submission)
    setShowGradingModal(true)
  }

  function formatDate(dateString) {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES')
  }

  return (
    <div className="professor-home-container">
      <div className="professor-home-overlay">
        <div className="professor-home-content">
          <ProfessorNavbar />
          
          <div className="professor-main-layout">
            <ProfessorSidebar />
            
            <div className="professor-content-area">
              <div className="professor-section">
                <h2 className="professor-section-title">Gestión de Tareas y Proyectos</h2>
                
                {/* Tabs de navegación */}
                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                  <button 
                    className={`professor-button-${activeTab === 'pending' ? 'primary' : 'secondary'}`}
                    onClick={() => setActiveTab('pending')}
                  >
                    Entregas Pendientes ({submissions.filter(s => s.status === 'submitted').length})
                  </button>
                  <button 
                    className={`professor-button-${activeTab === 'create' ? 'primary' : 'secondary'}`}
                    onClick={() => setActiveTab('create')}
                  >
                    <AddIcon style={{ marginRight: '5px' }} />
                    Crear Tarea
                  </button>
                  <button 
                    className={`professor-button-${activeTab === 'graded' ? 'primary' : 'secondary'}`}
                    onClick={() => setActiveTab('graded')}
                  >
                    Calificadas ({submissions.filter(s => s.status === 'graded').length})
                  </button>
                </div>

                {/* Contenido de entregas pendientes */}
                {activeTab === 'pending' && (
                  <div>
                    <h3 style={{ color: 'var(--inkwell)', marginBottom: '15px' }}>
                      Entregas para Revisar
                    </h3>
                    
                    {submissions.filter(s => s.status === 'submitted').length === 0 ? (
                      <div className="professor-card">
                        <p style={{ textAlign: 'center', color: 'var(--lunar-eclipse)' }}>
                          No hay entregas pendientes de revisión
                        </p>
                      </div>
                    ) : (
                      submissions
                        .filter(s => s.status === 'submitted')
                        .map(submission => {
                          const task = tasks.find(t => t.id === submission.taskId)
                          return (
                            <div key={submission.id} className="professor-card">
                              <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'start', marginBottom: '10px' }}>
                                <div style={{ flex: 1 }}>
                                  <h4 style={{ color: 'var(--inkwell)', margin: '0 0 5px 0' }}>
                                    {task?.title || 'Tarea no encontrada'}
                                  </h4>
                                  <p style={{ color: 'var(--lunar-eclipse)', margin: '0 0 5px 0' }}>
                                    <strong>Estudiante:</strong> {submission.studentName}
                                  </p>
                                  <p style={{ color: 'var(--lunar-eclipse)', margin: '0 0 10px 0' }}>
                                    <strong>Entregado:</strong> {formatDate(submission.submittedAt)} | 
                                    <strong> Puntos:</strong> {task?.points || 0}
                                  </p>
                                  {submission.submissionText && (
                                    <p style={{ color: 'var(--inkwell)', fontStyle: 'italic', margin: '0 0 10px 0' }}>
                                      "{submission.submissionText}"
                                    </p>
                                  )}
                                  {submission.fileName && (
                                    <p style={{ color: 'var(--creme-brulee)', margin: '0 0 10px 0' }}>
                                      📎 {submission.fileName}
                                    </p>
                                  )}
                                </div>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                  <button 
                                    className="professor-button-primary"
                                    onClick={() => openGradingModal(submission)}
                                    title="Calificar"
                                  >
                                    <GradeIcon />
                                  </button>
                                  <button 
                                    className="professor-button-secondary"
                                    onClick={() => alert('Funcionalidad de vista previa en desarrollo')}
                                    title="Ver detalles"
                                  >
                                    <VisibilityIcon />
                                  </button>
                                </div>
                              </div>
                            </div>
                          )
                        })
                    )}
                  </div>
                )}

                {/* Formulario para crear tarea */}
                {activeTab === 'create' && (
                  <div>
                    <h3 style={{ color: 'var(--inkwell)', marginBottom: '20px' }}>
                      Crear Nueva Tarea/Proyecto
                    </h3>
                    
                    <form onSubmit={handleCreateTask} className="professor-card">
                      <div className="professor-form-grid">
                        <div className="professor-form-group">
                          <label className="professor-form-label">Título *</label>
                          <input
                            type="text"
                            value={newTask.title}
                            onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                            className="professor-form-input"
                            required
                          />
                        </div>

                        <div className="professor-form-group">
                          <label className="professor-form-label">Tipo *</label>
                          <select
                            value={newTask.type}
                            onChange={(e) => setNewTask({...newTask, type: e.target.value})}
                            className="professor-form-select"
                          >
                            <option value="assignment">Tarea</option>
                            <option value="project">Proyecto</option>
                            <option value="exam">Examen</option>
                          </select>
                        </div>

                        <div className="professor-form-group">
                          <label className="professor-form-label">Fecha de Entrega *</label>
                          <input
                            type="date"
                            value={newTask.dueDate}
                            onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                            className="professor-form-input"
                            required
                          />
                        </div>

                        <div className="professor-form-group">
                          <label className="professor-form-label">Puntos *</label>
                          <input
                            type="number"
                            value={newTask.points}
                            onChange={(e) => setNewTask({...newTask, points: parseInt(e.target.value)})}
                            className="professor-form-input"
                            min="1"
                            max="500"
                            required
                          />
                        </div>
                      </div>

                      <div className="professor-form-group">
                        <label className="professor-form-label">Descripción *</label>
                        <textarea
                          value={newTask.description}
                          onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                          className="professor-form-textarea"
                          rows="4"
                          required
                        />
                      </div>

                      <div className="professor-form-group">
                        <label className="professor-form-label">Requisitos y Especificaciones</label>
                        <textarea
                          value={newTask.requirements}
                          onChange={(e) => setNewTask({...newTask, requirements: e.target.value})}
                          className="professor-form-textarea"
                          rows="3"
                          placeholder="Detallar requisitos específicos, formato de entrega, criterios de evaluación, etc."
                        />
                      </div>

                      <button type="submit" className="professor-button-primary">
                        Crear Tarea
                      </button>
                    </form>
                  </div>
                )}

                {/* Lista de tareas calificadas */}
                {activeTab === 'graded' && (
                  <div>
                    <h3 style={{ color: 'var(--inkwell)', marginBottom: '15px' }}>
                      Entregas Calificadas
                    </h3>
                    
                    {submissions.filter(s => s.status === 'graded').length === 0 ? (
                      <div className="professor-card">
                        <p style={{ textAlign: 'center', color: 'var(--lunar-eclipse)' }}>
                          No hay entregas calificadas aún
                        </p>
                      </div>
                    ) : (
                      submissions
                        .filter(s => s.status === 'graded')
                        .map(submission => {
                          const task = tasks.find(t => t.id === submission.taskId)
                          return (
                            <div key={submission.id} className="professor-card">
                              <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'start' }}>
                                <div style={{ flex: 1 }}>
                                  <h4 style={{ color: 'var(--inkwell)', margin: '0 0 5px 0' }}>
                                    {task?.title || 'Tarea no encontrada'}
                                  </h4>
                                  <p style={{ color: 'var(--lunar-eclipse)', margin: '0 0 5px 0' }}>
                                    <strong>Estudiante:</strong> {submission.studentName}
                                  </p>
                                  <p style={{ color: 'var(--lunar-eclipse)', margin: '0 0 10px 0' }}>
                                    <strong>Calificación:</strong> 
                                    <span style={{ 
                                      color: submission.grade >= 70 ? 'green' : 'red',
                                      fontWeight: 'bold',
                                      marginLeft: '5px'
                                    }}>
                                      {submission.grade}/{task?.points || 0}
                                    </span>
                                  </p>
                                  {submission.feedback && (
                                    <p style={{ color: 'var(--inkwell)', fontStyle: 'italic' }}>
                                      <strong>Retroalimentación:</strong> {submission.feedback}
                                    </p>
                                  )}
                                </div>
                                <button 
                                  className="professor-button-secondary"
                                  onClick={() => openGradingModal(submission)}
                                  title="Editar calificación"
                                >
                                  <EditIcon />
                                </button>
                              </div>
                            </div>
                          )
                        })
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para calificar */}
      {showGradingModal && selectedSubmission && (
        <div className="professor-modal-overlay">
          <div className="professor-modal-content">
            <div className="professor-modal-header">
              <h3 className="professor-modal-title">
                Calificar Entrega - {selectedSubmission.studentName}
              </h3>
              <button 
                className="professor-modal-close"
                onClick={() => setShowGradingModal(false)}
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleGradeSubmission}>
              <div className="professor-form-group">
                <label className="professor-form-label">
                  Calificación (de {tasks.find(t => t.id === selectedSubmission.taskId)?.points || 100} puntos)
                </label>
                <input
                  type="number"
                  name="grade"
                  defaultValue={selectedSubmission.grade || ''}
                  className="professor-form-input"
                  min="0"
                  max={tasks.find(t => t.id === selectedSubmission.taskId)?.points || 100}
                  required
                />
              </div>

              <div className="professor-form-group">
                <label className="professor-form-label">Retroalimentación</label>
                <textarea
                  name="feedback"
                  defaultValue={selectedSubmission.feedback || ''}
                  className="professor-form-textarea"
                  rows="4"
                  placeholder="Comentarios, sugerencias y retroalimentación para el estudiante..."
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button 
                  type="button"
                  className="professor-button-secondary"
                  onClick={() => setShowGradingModal(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className="professor-button-primary">
                  Guardar Calificación
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProfessorTasks