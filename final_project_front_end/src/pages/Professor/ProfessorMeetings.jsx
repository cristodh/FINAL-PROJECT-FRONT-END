import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ProfessorNavbar from '../../components/Professor/ProfessorNavbar'
import ProfessorSidebar from '../../components/Professor/ProfessorSidebar'
import { ProfessorDB } from '../../services/ProfessorDB'
import VideocamIcon from '@mui/icons-material/Videocam'
import AddIcon from '@mui/icons-material/Add'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import GroupIcon from '@mui/icons-material/Group'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import LinkIcon from '@mui/icons-material/Link'
import PersonIcon from '@mui/icons-material/Person'
import '../../styles/Professor/ProfessorTheme.css'

function ProfessorMeetings() {
  const navigate = useNavigate()
  const [meetings, setMeetings] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editingMeeting, setEditingMeeting] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    duration: 60,
    link: '',
    participants: '',
    type: 'Clase'
  })
  const [filterType, setFilterType] = useState('all')

  useEffect(() => {
    // Verificar autenticación
    const currentProfessor = ProfessorDB.getCurrentProfessor()
    if (!currentProfessor) {
      navigate('/professor-login')
      return
    }
    
    loadMeetings()
  }, [navigate])

  function loadMeetings() {
    const savedMeetings = localStorage.getItem('professorMeetings')
    if (savedMeetings) {
      try {
        setMeetings(JSON.parse(savedMeetings))
      } catch (error) {
        console.error('Error loading meetings:', error)
        setMeetings([])
      }
    }
  }

  function saveMeetings(meetingsData) {
    try {
      localStorage.setItem('professorMeetings', JSON.stringify(meetingsData))
      setMeetings(meetingsData)
    } catch (error) {
      console.error('Error saving meetings:', error)
    }
  }

  function handleInputChange(e) {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  function openModal(meeting = null) {
    if (meeting) {
      setEditingMeeting(meeting)
      setFormData({
        title: meeting.title,
        description: meeting.description,
        date: meeting.date,
        time: meeting.time,
        duration: meeting.duration,
        link: meeting.link,
        participants: meeting.participants,
        type: meeting.type
      })
    } else {
      setEditingMeeting(null)
      setFormData({
        title: '',
        description: '',
        date: '',
        time: '',
        duration: 60,
        link: '',
        participants: '',
        type: 'Clase'
      })
    }
    setShowModal(true)
  }

  function closeModal() {
    setShowModal(false)
    setEditingMeeting(null)
    setFormData({
      title: '',
      description: '',
      date: '',
      time: '',
      duration: 60,
      link: '',
      participants: '',
      type: 'Clase'
    })
  }

  function handleSubmit(e) {
    e.preventDefault()

    // Validaciones
    if (!formData.title.trim() || !formData.date || !formData.time) {
      alert('Por favor complete todos los campos requeridos (título, fecha y hora)')
      return
    }

    const currentProfessor = ProfessorDB.getCurrentProfessor()
    const newMeeting = {
      id: editingMeeting ? editingMeeting.id : Date.now(),
      ...formData,
      professorId: currentProfessor.id,
      professorName: `${currentProfessor.name} ${currentProfessor.lastName}`,
      createdAt: editingMeeting ? editingMeeting.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    let updatedMeetings
    if (editingMeeting) {
      updatedMeetings = meetings.map(meeting => 
        meeting.id === editingMeeting.id ? newMeeting : meeting
      )
    } else {
      updatedMeetings = [...meetings, newMeeting]
    }

    saveMeetings(updatedMeetings)
    closeModal()
    
    const action = editingMeeting ? 'actualizada' : 'creada'
    alert(`Reunión ${action} exitosamente`)
  }

  function deleteMeeting(meetingId) {
    if (window.confirm('¿Está seguro de que desea eliminar esta reunión?')) {
      const updatedMeetings = meetings.filter(meeting => meeting.id !== meetingId)
      saveMeetings(updatedMeetings)
      alert('Reunión eliminada exitosamente')
    }
  }

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      alert('Enlace copiado al portapapeles')
    }).catch(err => {
      console.error('Error copying to clipboard:', err)
    })
  }

  function formatDateTime(date, time) {
    if (!date || !time) return 'Fecha no definida'
    const meetingDate = new Date(`${date}T${time}`)
    return meetingDate.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  function getStatusColor(date, time) {
    if (!date || !time) return 'var(--lunar-eclipse)'
    
    const now = new Date()
    const meetingDate = new Date(`${date}T${time}`)
    
    if (meetingDate < now) {
      return '#dc3545' // Pasada
    } else if (meetingDate.toDateString() === now.toDateString()) {
      return '#ffc107' // Hoy
    } else {
      return '#28a745' // Futura
    }
  }

  const filteredMeetings = meetings.filter(meeting => {
    if (filterType === 'all') return true
    if (filterType === 'today') {
      const today = new Date().toISOString().split('T')[0]
      return meeting.date === today
    }
    if (filterType === 'upcoming') {
      const now = new Date()
      const meetingDate = new Date(`${meeting.date}T${meeting.time}`)
      return meetingDate >= now
    }
    return meeting.type === filterType
  })

  const upcomingMeetings = meetings.filter(meeting => {
    const now = new Date()
    const meetingDate = new Date(`${meeting.date}T${meeting.time}`)
    return meetingDate >= now
  }).slice(0, 3)

  return (
    <div className="professor-home-container">
      <div className="professor-home-overlay">
        <div className="professor-home-content">
          <ProfessorNavbar />
          
          <div className="professor-main-layout">
            <ProfessorSidebar />
            
            <div className="professor-content-area">
              <div className="professor-section">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                  <h2 className="professor-section-title">
                    <VideocamIcon style={{ marginRight: '10px' }} />
                    Mis Reuniones
                  </h2>
                  <button 
                    className="professor-button-primary"
                    onClick={() => openModal()}
                  >
                    <AddIcon style={{ marginRight: '5px' }} />
                    Nueva Reunión
                  </button>
                </div>

                {/* Resumen rápido */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '30px' }}>
                  <div className="professor-card">
                    <h4 style={{ color: 'var(--inkwell)', margin: '0 0 15px 0' }}>Próximas Reuniones</h4>
                    {upcomingMeetings.length === 0 ? (
                      <p style={{ color: 'var(--lunar-eclipse)', fontStyle: 'italic' }}>
                        No hay reuniones programadas
                      </p>
                    ) : (
                      upcomingMeetings.map(meeting => (
                        <div key={meeting.id} style={{
                          padding: '10px',
                          background: 'var(--moonbeam)',
                          borderRadius: '5px',
                          marginBottom: '10px',
                          borderLeft: '3px solid var(--creme-brulee)'
                        }}>
                          <h5 style={{ color: 'var(--inkwell)', margin: '0 0 5px 0' }}>
                            {meeting.title}
                          </h5>
                          <p style={{ color: 'var(--lunar-eclipse)', margin: 0, fontSize: '12px' }}>
                            <CalendarTodayIcon style={{ fontSize: '12px', marginRight: '5px' }} />
                            {formatDateTime(meeting.date, meeting.time)}
                          </p>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="professor-card">
                    <h4 style={{ color: 'var(--inkwell)', margin: '0 0 15px 0' }}>Estadísticas</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                      <div style={{ textAlign: 'center' }}>
                        <p style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--creme-brulee)', margin: 0 }}>
                          {meetings.length}
                        </p>
                        <p style={{ fontSize: '12px', color: 'var(--lunar-eclipse)', margin: 0 }}>
                          Total Reuniones
                        </p>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <p style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--creme-brulee)', margin: 0 }}>
                          {upcomingMeetings.length}
                        </p>
                        <p style={{ fontSize: '12px', color: 'var(--lunar-eclipse)', margin: 0 }}>
                          Próximas
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Filtros */}
                <div className="professor-card" style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
                    <span style={{ color: 'var(--inkwell)', fontWeight: 'bold' }}>Filtrar por:</span>
                    {[
                      { key: 'all', label: 'Todas' },
                      { key: 'today', label: 'Hoy' },
                      { key: 'upcoming', label: 'Próximas' },
                      { key: 'Clase', label: 'Clases' },
                      { key: 'Reunión', label: 'Reuniones' },
                      { key: 'Tutoría', label: 'Tutorías' }
                    ].map(filter => (
                      <button
                        key={filter.key}
                        onClick={() => setFilterType(filter.key)}
                        className={filterType === filter.key ? 'professor-button-primary' : 'professor-button-secondary'}
                        style={{ padding: '5px 10px', fontSize: '12px' }}
                      >
                        {filter.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Lista de reuniones */}
                <div className="professor-card">
                  <h4 style={{ color: 'var(--inkwell)', marginBottom: '20px' }}>
                    {filterType === 'all' ? 'Todas las Reuniones' : 
                     filterType === 'today' ? 'Reuniones de Hoy' :
                     filterType === 'upcoming' ? 'Próximas Reuniones' :
                     `Reuniones de Tipo: ${filterType}`} 
                    ({filteredMeetings.length})
                  </h4>
                  
                  {filteredMeetings.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px', color: 'var(--lunar-eclipse)' }}>
                      <VideocamIcon style={{ fontSize: '48px', marginBottom: '10px' }} />
                      <p>No hay reuniones que coincidan con el filtro seleccionado</p>
                    </div>
                  ) : (
                    <div style={{ display: 'grid', gap: '15px' }}>
                      {filteredMeetings.map(meeting => (
                        <div key={meeting.id} style={{
                          border: '1px solid var(--moonbeam)',
                          borderRadius: '8px',
                          padding: '20px',
                          borderLeft: `4px solid ${getStatusColor(meeting.date, meeting.time)}`
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                            <div>
                              <h5 style={{ color: 'var(--inkwell)', margin: '0 0 5px 0', display: 'flex', alignItems: 'center' }}>
                                {meeting.title}
                                <span style={{
                                  background: 'var(--creme-brulee)',
                                  color: 'white',
                                  padding: '2px 8px',
                                  borderRadius: '12px',
                                  fontSize: '10px',
                                  marginLeft: '10px'
                                }}>
                                  {meeting.type}
                                </span>
                              </h5>
                              <p style={{ color: 'var(--lunar-eclipse)', margin: '0 0 10px 0', fontSize: '14px' }}>
                                {meeting.description || 'Sin descripción'}
                              </p>
                            </div>
                            <div style={{ display: 'flex', gap: '5px' }}>
                              <button 
                                className="professor-button-secondary"
                                style={{ padding: '5px', minWidth: 'auto' }}
                                onClick={() => openModal(meeting)}
                                title="Editar reunión"
                              >
                                <EditIcon style={{ fontSize: '16px' }} />
                              </button>
                              <button 
                                className="professor-button-danger"
                                style={{ padding: '5px', minWidth: 'auto' }}
                                onClick={() => deleteMeeting(meeting.id)}
                                title="Eliminar reunión"
                              >
                                <DeleteIcon style={{ fontSize: '16px' }} />
                              </button>
                            </div>
                          </div>

                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '15px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', color: 'var(--lunar-eclipse)' }}>
                              <CalendarTodayIcon style={{ fontSize: '16px', marginRight: '8px' }} />
                              <span>{formatDateTime(meeting.date, meeting.time)}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', color: 'var(--lunar-eclipse)' }}>
                              <AccessTimeIcon style={{ fontSize: '16px', marginRight: '8px' }} />
                              <span>{meeting.duration} minutos</span>
                            </div>
                            {meeting.participants && (
                              <div style={{ display: 'flex', alignItems: 'center', color: 'var(--lunar-eclipse)' }}>
                                <GroupIcon style={{ fontSize: '16px', marginRight: '8px' }} />
                                <span>{meeting.participants}</span>
                              </div>
                            )}
                          </div>

                          {meeting.link && (
                            <div style={{ 
                              background: 'var(--moonbeam)', 
                              padding: '10px', 
                              borderRadius: '5px',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center'
                            }}>
                              <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                                <LinkIcon style={{ fontSize: '16px', marginRight: '8px', color: 'var(--creme-brulee)' }} />
                                <span style={{ 
                                  color: 'var(--inkwell)', 
                                  wordBreak: 'break-all',
                                  fontSize: '12px'
                                }}>
                                  {meeting.link}
                                </span>
                              </div>
                              <button 
                                className="professor-button-primary"
                                style={{ padding: '5px 10px', fontSize: '12px', marginLeft: '10px' }}
                                onClick={() => copyToClipboard(meeting.link)}
                              >
                                Copiar
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Nueva/Editar Reunión */}
      {showModal && (
        <div className="professor-modal-overlay">
          <div className="professor-modal-content">
            <h3 style={{ color: 'var(--inkwell)', marginBottom: '20px' }}>
              {editingMeeting ? 'Editar Reunión' : 'Nueva Reunión'}
            </h3>
            
            <form onSubmit={handleSubmit}>
              <div className="professor-form-grid">
                <div className="professor-form-group">
                  <label className="professor-form-label">Título *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="professor-form-input"
                    required
                    placeholder="Ej: Clase de Matemáticas"
                  />
                </div>

                <div className="professor-form-group">
                  <label className="professor-form-label">Tipo</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="professor-form-select"
                  >
                    <option value="Clase">Clase</option>
                    <option value="Reunión">Reunión</option>
                    <option value="Tutoría">Tutoría</option>
                    <option value="Examen">Examen</option>
                    <option value="Presentación">Presentación</option>
                  </select>
                </div>
              </div>

              <div className="professor-form-group">
                <label className="professor-form-label">Descripción</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="professor-form-textarea"
                  rows="3"
                  placeholder="Descripción opcional de la reunión"
                />
              </div>

              <div className="professor-form-grid">
                <div className="professor-form-group">
                  <label className="professor-form-label">Fecha *</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="professor-form-input"
                    required
                  />
                </div>

                <div className="professor-form-group">
                  <label className="professor-form-label">Hora *</label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="professor-form-input"
                    required
                  />
                </div>

                <div className="professor-form-group">
                  <label className="professor-form-label">Duración (minutos)</label>
                  <input
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    className="professor-form-input"
                    min="15"
                    max="480"
                  />
                </div>
              </div>

              <div className="professor-form-group">
                <label className="professor-form-label">Enlace de Reunión</label>
                <input
                  type="url"
                  name="link"
                  value={formData.link}
                  onChange={handleInputChange}
                  className="professor-form-input"
                  placeholder="https://meet.google.com/..."
                />
              </div>

              <div className="professor-form-group">
                <label className="professor-form-label">Participantes</label>
                <input
                  type="text"
                  name="participants"
                  value={formData.participants}
                  onChange={handleInputChange}
                  className="professor-form-input"
                  placeholder="Ej: Grupo A, Estudiantes de 5to año"
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                <button 
                  type="button" 
                  className="professor-button-secondary"
                  onClick={closeModal}
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="professor-button-primary"
                >
                  {editingMeeting ? 'Actualizar' : 'Crear'} Reunión
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProfessorMeetings