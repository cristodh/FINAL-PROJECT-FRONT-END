import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ProfessorNavbar from '../../components/Professor/ProfessorNavbar'
import ProfessorSidebar from '../../components/Professor/ProfessorSidebar'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import VisibilityIcon from '@mui/icons-material/Visibility'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import '../../styles/Professor/ProfessorTheme.css'

function ProfessorAttendance() {
  const navigate = useNavigate()
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [students, setStudents] = useState([])
  const [attendance, setAttendance] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [attendanceComment, setAttendanceComment] = useState('')
  const [selectedView, setSelectedView] = useState('today') // 'today', 'history', 'stats'

  useEffect(() => {
    // Verificar autenticación
    const storedData = localStorage.getItem('professorData')
    if (!storedData) {
      navigate('/professor-login')
      return
    }
    
    loadStudentsAndAttendance()
  }, [navigate, selectedDate])

  async function loadStudentsAndAttendance() {
    try {
      const response = await fetch('/src/services/db.json')
      const db = await response.json()
      
      // Cargar estudiantes
      const allStudents = db.students || []
      setStudents(allStudents)

      // Cargar asistencias existentes desde localStorage
      const localAttendance = JSON.parse(localStorage.getItem('attendance') || '[]')
      
      // Filtrar por fecha seleccionada
      const dayAttendance = localAttendance.filter(att => 
        att.date === selectedDate
      )

      // Crear entradas de asistencia para estudiantes sin registro del día
      const completeAttendance = allStudents.map(student => {
        const existingAtt = dayAttendance.find(att => att.studentId === student.id)
        return existingAtt || {
          id: `${selectedDate}_${student.id}`,
          studentId: student.id,
          studentName: `${student.name} ${student.lastName}`,
          date: selectedDate,
          status: 'not-marked', // 'present', 'absent-justified', 'absent-unjustified', 'late', 'permission', 'not-marked'
          timeIn: '',
          timeOut: '',
          comment: '',
          markedBy: '',
          markedAt: ''
        }
      })

      setAttendance(completeAttendance)
    } catch (error) {
      console.error('Error loading attendance data:', error)
    }
  }

  function handleAttendanceChange(studentId, status) {
    const currentTime = new Date().toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })

    setAttendance(prev => prev.map(att => {
      if (att.studentId === studentId) {
        return {
          ...att,
          status,
          timeIn: status === 'present' || status === 'late' ? currentTime : '',
          markedBy: 'Professor',
          markedAt: new Date().toISOString()
        }
      }
      return att
    }))

    // Guardar en localStorage
    saveAttendanceToLocal(studentId, status, currentTime)
  }

  function saveAttendanceToLocal(studentId, status, timeIn) {
    const allAttendance = JSON.parse(localStorage.getItem('attendance') || '[]')
    const recordId = `${selectedDate}_${studentId}`
    
    const existingIndex = allAttendance.findIndex(att => att.id === recordId)
    const attendanceRecord = {
      id: recordId,
      studentId,
      studentName: students.find(s => s.id === studentId)?.name + ' ' + students.find(s => s.id === studentId)?.lastName,
      date: selectedDate,
      status,
      timeIn: status === 'present' || status === 'late' ? timeIn : '',
      timeOut: '',
      comment: '',
      markedBy: 'Professor',
      markedAt: new Date().toISOString()
    }

    if (existingIndex >= 0) {
      allAttendance[existingIndex] = attendanceRecord
    } else {
      allAttendance.push(attendanceRecord)
    }

    localStorage.setItem('attendance', JSON.stringify(allAttendance))
  }

  function openCommentModal(student) {
    const studentAtt = attendance.find(att => att.studentId === student.id)
    setSelectedStudent(student)
    setAttendanceComment(studentAtt?.comment || '')
    setShowModal(true)
  }

  function saveComment() {
    if (!selectedStudent) return

    setAttendance(prev => prev.map(att => {
      if (att.studentId === selectedStudent.id) {
        return { ...att, comment: attendanceComment }
      }
      return att
    }))

    // Actualizar en localStorage
    const allAttendance = JSON.parse(localStorage.getItem('attendance') || '[]')
    const recordId = `${selectedDate}_${selectedStudent.id}`
    const recordIndex = allAttendance.findIndex(att => att.id === recordId)

    if (recordIndex >= 0) {
      allAttendance[recordIndex].comment = attendanceComment
      localStorage.setItem('attendance', JSON.stringify(allAttendance))
    }

    setShowModal(false)
    setSelectedStudent(null)
    setAttendanceComment('')
  }

  function getStatusColor(status) {
    switch(status) {
      case 'present': return 'green'
      case 'absent-justified': return 'orange'
      case 'absent-unjustified': return 'red'
      case 'late': return '#ff9800'
      case 'permission': return '#9c27b0'
      default: return 'var(--lunar-eclipse)'
    }
  }

  function getStatusText(status) {
    switch(status) {
      case 'present': return 'Presente'
      case 'absent-justified': return 'Ausencia Justificada'
      case 'absent-unjustified': return 'Ausencia Injustificada'
      case 'late': return 'Tardío'
      case 'permission': return 'Permiso'
      default: return 'Sin marcar'
    }
  }

  function getStatusIcon(status) {
    switch(status) {
      case 'present': return <CheckCircleIcon style={{ color: 'green' }} />
      case 'absent-justified': case 'absent-unjustified': return <CancelIcon style={{ color: 'red' }} />
      case 'late': return <AccessTimeIcon style={{ color: '#ff9800' }} />
      case 'permission': return <ExitToAppIcon style={{ color: '#9c27b0' }} />
      default: return <CalendarTodayIcon style={{ color: 'var(--lunar-eclipse)' }} />
    }
  }

  // Calcular estadísticas
  const todayStats = {
    total: attendance.length,
    present: attendance.filter(att => att.status === 'present').length,
    absent: attendance.filter(att => att.status.includes('absent')).length,
    late: attendance.filter(att => att.status === 'late').length,
    permission: attendance.filter(att => att.status === 'permission').length,
    notMarked: attendance.filter(att => att.status === 'not-marked').length
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
                <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'center', marginBottom: '20px' }}>
                  <h2 className="professor-section-title">Control de Asistencia</h2>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <label style={{ color: 'var(--inkwell)', fontWeight: '500' }}>Fecha:</label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="professor-form-input"
                      style={{ width: 'auto' }}
                    />
                  </div>
                </div>

                {/* Tabs de navegación */}
                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                  <button 
                    className={`professor-button-${selectedView === 'today' ? 'primary' : 'secondary'}`}
                    onClick={() => setSelectedView('today')}
                  >
                    <CalendarTodayIcon style={{ marginRight: '5px' }} />
                    Asistencia del Día
                  </button>
                  <button 
                    className={`professor-button-${selectedView === 'stats' ? 'primary' : 'secondary'}`}
                    onClick={() => setSelectedView('stats')}
                  >
                    Estadísticas
                  </button>
                </div>

                {/* Estadísticas del día */}
                <div className="professor-stats-grid">
                  <div className="professor-stat-card">
                    <div className="professor-stat-number">{todayStats.present}</div>
                    <div className="professor-stat-label">Presentes</div>
                  </div>
                  <div className="professor-stat-card">
                    <div className="professor-stat-number">{todayStats.absent}</div>
                    <div className="professor-stat-label">Ausentes</div>
                  </div>
                  <div className="professor-stat-card">
                    <div className="professor-stat-number">{todayStats.late}</div>
                    <div className="professor-stat-label">Tardíos</div>
                  </div>
                  <div className="professor-stat-card">
                    <div className="professor-stat-number">{todayStats.permission}</div>
                    <div className="professor-stat-label">Permisos</div>
                  </div>
                  <div className="professor-stat-card">
                    <div className="professor-stat-number">{todayStats.notMarked}</div>
                    <div className="professor-stat-label">Sin Marcar</div>
                  </div>
                  <div className="professor-stat-card">
                    <div className="professor-stat-number">
                      {todayStats.total > 0 ? ((todayStats.present / todayStats.total) * 100).toFixed(1) : 0}%
                    </div>
                    <div className="professor-stat-label">% Asistencia</div>
                  </div>
                </div>

                {/* Vista de asistencia del día */}
                {selectedView === 'today' && (
                  <div>
                    <h3 style={{ color: 'var(--inkwell)', marginBottom: '15px' }}>
                      Asistencia - {new Date(selectedDate).toLocaleDateString('es-ES', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </h3>
                    
                    {attendance.map(att => {
                      const student = students.find(s => s.id === att.studentId)
                      if (!student) return null

                      return (
                        <div key={att.studentId} className="professor-card">
                          <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flex: 1 }}>
                              {getStatusIcon(att.status)}
                              <div>
                                <h4 style={{ color: 'var(--inkwell)', margin: '0 0 5px 0' }}>
                                  {student.name} {student.lastName}
                                </h4>
                                <p style={{ color: 'var(--lunar-eclipse)', margin: 0, fontSize: '12px' }}>
                                  ID: {student.studentID} | Email: {student.email}
                                </p>
                                {att.timeIn && (
                                  <p style={{ color: 'var(--creme-brulee)', margin: '3px 0 0 0', fontSize: '11px' }}>
                                    Hora entrada: {att.timeIn}
                                  </p>
                                )}
                              </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <div style={{ 
                                color: getStatusColor(att.status), 
                                fontWeight: 'bold', 
                                fontSize: '12px',
                                minWidth: '120px',
                                textAlign: 'center'
                              }}>
                                {getStatusText(att.status)}
                              </div>

                              <div style={{ display: 'flex', gap: '5px' }}>
                                <button 
                                  className="professor-button-secondary"
                                  onClick={() => handleAttendanceChange(att.studentId, 'present')}
                                  style={{ 
                                    background: att.status === 'present' ? 'green' : 'var(--lunar-eclipse)', 
                                    color: 'white',
                                    padding: '5px 8px'
                                  }}
                                  title="Presente"
                                >
                                  ✓
                                </button>
                                <button 
                                  className="professor-button-secondary"
                                  onClick={() => handleAttendanceChange(att.studentId, 'late')}
                                  style={{ 
                                    background: att.status === 'late' ? '#ff9800' : 'var(--lunar-eclipse)', 
                                    color: 'white',
                                    padding: '5px 8px'
                                  }}
                                  title="Tardío"
                                >
                                  ⏰
                                </button>
                                <button 
                                  className="professor-button-secondary"
                                  onClick={() => handleAttendanceChange(att.studentId, 'absent-justified')}
                                  style={{ 
                                    background: att.status === 'absent-justified' ? 'orange' : 'var(--lunar-eclipse)', 
                                    color: 'white',
                                    padding: '5px 8px'
                                  }}
                                  title="Ausencia Justificada"
                                >
                                  📄
                                </button>
                                <button 
                                  className="professor-button-secondary"
                                  onClick={() => handleAttendanceChange(att.studentId, 'absent-unjustified')}
                                  style={{ 
                                    background: att.status === 'absent-unjustified' ? 'red' : 'var(--lunar-eclipse)', 
                                    color: 'white',
                                    padding: '5px 8px'
                                  }}
                                  title="Ausencia Injustificada"
                                >
                                  ✗
                                </button>
                                <button 
                                  className="professor-button-secondary"
                                  onClick={() => handleAttendanceChange(att.studentId, 'permission')}
                                  style={{ 
                                    background: att.status === 'permission' ? '#9c27b0' : 'var(--lunar-eclipse)', 
                                    color: 'white',
                                    padding: '5px 8px'
                                  }}
                                  title="Permiso"
                                >
                                  🚪
                                </button>
                                <button 
                                  className="professor-button-secondary"
                                  onClick={() => openCommentModal(student)}
                                  style={{ padding: '5px 8px' }}
                                  title="Agregar comentario"
                                >
                                  <VisibilityIcon style={{ fontSize: '14px' }} />
                                </button>
                              </div>
                            </div>
                          </div>
                          
                          {att.comment && (
                            <div style={{ 
                              marginTop: '10px', 
                              padding: '8px', 
                              background: 'var(--au-lait)', 
                              borderRadius: '4px',
                              fontSize: '12px',
                              color: 'var(--inkwell)'
                            }}>
                              <strong>Comentario:</strong> {att.comment}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}

                {/* Vista de estadísticas */}
                {selectedView === 'stats' && (
                  <div>
                    <h3 style={{ color: 'var(--inkwell)', marginBottom: '15px' }}>
                      Estadísticas Generales de Asistencia
                    </h3>
                    
                    <div className="professor-card">
                      <p style={{ textAlign: 'center', color: 'var(--lunar-eclipse)' }}>
                        Funcionalidad de estadísticas históricas en desarrollo.
                        <br />
                        Aquí se mostrarían gráficas y análisis de asistencia por estudiante y período.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de comentarios */}
      {showModal && selectedStudent && (
        <div className="professor-modal-overlay">
          <div className="professor-modal-content">
            <div className="professor-modal-header">
              <h3 className="professor-modal-title">
                Comentario - {selectedStudent.name} {selectedStudent.lastName}
              </h3>
              <button 
                className="professor-modal-close"
                onClick={() => setShowModal(false)}
              >
                ✕
              </button>
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <label className="professor-form-label">
                Agregar comentario sobre la asistencia
              </label>
              <textarea
                value={attendanceComment}
                onChange={(e) => setAttendanceComment(e.target.value)}
                className="professor-form-textarea"
                rows="4"
                placeholder="Ej: Llegó tarde por problema de transporte, justificación presentada..."
              />
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button 
                className="professor-button-secondary"
                onClick={() => setShowModal(false)}
              >
                Cancelar
              </button>
              <button 
                className="professor-button-primary"
                onClick={saveComment}
              >
                Guardar Comentario
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProfessorAttendance