import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ProfessorNavbar from '../../components/Professor/ProfessorNavbar'
import ProfessorSidebar from '../../components/Professor/ProfessorSidebar'
import '../../styles/Professor/ProfessorTheme.css'

function ProfessorHome() {
  const navigate = useNavigate()
  const [professorData, setProfessorData] = useState(null)
  const [news, setNews] = useState([])
  const [stats, setStats] = useState({
    totalStudents: 0,
    activeTasks: 0,
    pendingRequests: 0,
    completedTasks: 0
  })

  useEffect(() => {
    // Verificar autenticación
    const storedData = localStorage.getItem('professorData')
    if (!storedData) {
      navigate('/professor-login')
      return
    }
    
    setProfessorData(JSON.parse(storedData))
    loadDashboardData()
  }, [navigate])

  async function loadDashboardData() {
    try {
      const response = await fetch('/src/services/db.json')
      const db = await response.json()
      
      // Cargar estadísticas básicas
      const totalStudents = db.students?.length || 0
      const pendingRequests = db.cpurequests?.filter(req => req.requestState === 'pendingForAprv')?.length || 0
      
      setStats({
        totalStudents,
        activeTasks: 5, // Simulado
        pendingRequests,
        completedTasks: 15 // Simulado
      })

      // Cargar noticias/anuncios simulados
      setNews([
        {
          id: 1,
          title: 'Nuevo período académico iniciado',
          content: 'Bienvenidos al nuevo semestre. Recordar revisar las tareas pendientes.',
          date: '2025-10-02',
          important: true
        },
        {
          id: 2,
          title: 'Actualización del sistema',
          content: 'Se han añadido nuevas funcionalidades para el seguimiento de estudiantes.',
          date: '2025-10-01',
          important: false
        },
        {
          id: 3,
          title: 'Recordatorio de asistencia',
          content: 'No olvide marcar la asistencia diaria de los estudiantes.',
          date: '2025-09-30',
          important: false
        }
      ])
    } catch (error) {
      console.error('Error loading dashboard data:', error)
    }
  }

  function formatDate(dateString) {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  if (!professorData) {
    return <div>Cargando...</div>
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
                <h2 className="professor-section-title">
                  ¡Bienvenido, {professorData.name || 'Profesor'}!
                </h2>
                <p style={{ color: 'var(--inkwell)', fontSize: '16px' }}>
                  Panel de control para gestión académica y seguimiento estudiantil
                </p>
              </div>

              {/* Estadísticas rápidas */}
              <div className="professor-stats-grid">
                <div className="professor-stat-card">
                  <div className="professor-stat-number">{stats.totalStudents}</div>
                  <div className="professor-stat-label">Estudiantes Totales</div>
                </div>
                <div className="professor-stat-card">
                  <div className="professor-stat-number">{stats.activeTasks}</div>
                  <div className="professor-stat-label">Tareas Activas</div>
                </div>
                <div className="professor-stat-card">
                  <div className="professor-stat-number">{stats.pendingRequests}</div>
                  <div className="professor-stat-label">Solicitudes Pendientes</div>
                </div>
                <div className="professor-stat-card">
                  <div className="professor-stat-number">{stats.completedTasks}</div>
                  <div className="professor-stat-label">Tareas Completadas</div>
                </div>
              </div>

              {/* Información del perfil */}
              <div className="professor-section">
                <h3 className="professor-section-title">Mi Perfil</h3>
                <div className="professor-card">
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div>
                      <p><strong>Email:</strong> {professorData.email}</p>
                      <p><strong>Especialización:</strong> {professorData.specialization || 'No especificada'}</p>
                      <p><strong>Teléfono:</strong> {professorData.phone || 'No registrado'}</p>
                    </div>
                    <div>
                      <p><strong>Experiencia:</strong> {professorData.experience ? `${professorData.experience} años` : 'No especificada'}</p>
                      <p><strong>Estado:</strong> {professorData.active ? 'Activo' : 'Inactivo'}</p>
                      <p><strong>Cédula:</strong> {professorData.identification || 'No registrada'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Noticias y anuncios */}
              <div className="professor-section">
                <h3 className="professor-section-title">Noticias y Anuncios</h3>
                {news.map(item => (
                  <div key={item.id} className="professor-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '10px' }}>
                      <h4 style={{ 
                        color: item.important ? 'var(--creme-brulee)' : 'var(--inkwell)', 
                        margin: 0,
                        fontSize: '16px'
                      }}>
                        {item.important && '🔴 '}{item.title}
                      </h4>
                      <span style={{ 
                        color: 'var(--lunar-eclipse)', 
                        fontSize: '12px',
                        fontWeight: '500'
                      }}>
                        {formatDate(item.date)}
                      </span>
                    </div>
                    <p style={{ 
                      color: 'var(--inkwell)', 
                      margin: 0,
                      lineHeight: '1.5'
                    }}>
                      {item.content}
                    </p>
                  </div>
                ))}
              </div>

              {/* Accesos rápidos */}
              <div className="professor-section">
                <h3 className="professor-section-title">Accesos Rápidos</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                  <button 
                    className="professor-button-primary"
                    onClick={() => navigate('/professor-tasks')}
                    style={{ padding: '15px', borderRadius: '8px' }}
                  >
                    Revisar Tareas
                  </button>
                  <button 
                    className="professor-button-primary"
                    onClick={() => navigate('/professor-attendance')}
                    style={{ padding: '15px', borderRadius: '8px' }}
                  >
                    Marcar Asistencia
                  </button>
                  <button 
                    className="professor-button-primary"
                    onClick={() => navigate('/professor-equipment')}
                    style={{ padding: '15px', borderRadius: '8px' }}
                  >
                    Ver Solicitudes
                  </button>
                  <button 
                    className="professor-button-primary"
                    onClick={() => navigate('/professor-statistics')}
                    style={{ padding: '15px', borderRadius: '8px' }}
                  >
                    Ver Estadísticas
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfessorHome