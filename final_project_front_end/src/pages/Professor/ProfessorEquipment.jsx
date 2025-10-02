import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ProfessorNavbar from '../../components/Professor/ProfessorNavbar'
import ProfessorSidebar from '../../components/Professor/ProfessorSidebar'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import VisibilityIcon from '@mui/icons-material/Visibility'
import '../../styles/Professor/ProfessorTheme.css'

function ProfessorEquipment() {
  const navigate = useNavigate()
  const [requests, setRequests] = useState([])
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    // Verificar autenticación
    const storedData = localStorage.getItem('professorData')
    if (!storedData) {
      navigate('/professor-login')
      return
    }
    
    loadEquipmentRequests()
  }, [navigate])

  async function loadEquipmentRequests() {
    try {
      const response = await fetch('/src/services/db.json')
      const db = await response.json()
      
      // Cargar solicitudes de equipo de CPU
      const cpuRequests = db.cpurequests || []
      setRequests(cpuRequests)
    } catch (error) {
      console.error('Error loading equipment requests:', error)
    }
  }

  function handleApproveRequest(requestId) {
    if (window.confirm('¿Aprobar esta solicitud de equipo?')) {
      setRequests(prev => prev.map(req => 
        req.id === requestId 
          ? { ...req, requestState: 'approved', approvedAt: new Date().toISOString() }
          : req
      ))
      alert('Solicitud aprobada exitosamente')
    }
  }

  function handleRejectRequest(requestId) {
    if (window.confirm('¿Rechazar esta solicitud de equipo?')) {
      setRequests(prev => prev.map(req => 
        req.id === requestId 
          ? { ...req, requestState: 'rejected', rejectedAt: new Date().toISOString() }
          : req
      ))
      alert('Solicitud rechazada')
    }
  }

  function openRequestDetails(request) {
    setSelectedRequest(request)
    setShowModal(true)
  }

  function formatDate(dateString) {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES')
  }

  function getStatusColor(status) {
    switch(status) {
      case 'approved': return 'green'
      case 'rejected': return 'red'
      case 'pendingForAprv': return 'orange'
      default: return 'var(--lunar-eclipse)'
    }
  }

  function getStatusText(status) {
    switch(status) {
      case 'approved': return 'Aprobado'
      case 'rejected': return 'Rechazado'
      case 'pendingForAprv': return 'Pendiente'
      default: return 'Desconocido'
    }
  }

  const pendingRequests = requests.filter(r => r.requestState === 'pendingForAprv')
  const processedRequests = requests.filter(r => r.requestState !== 'pendingForAprv')

  return (
    <div className="professor-home-container">
      <div className="professor-home-overlay">
        <div className="professor-home-content">
          <ProfessorNavbar />
          
          <div className="professor-main-layout">
            <ProfessorSidebar />
            
            <div className="professor-content-area">
              <div className="professor-section">
                <h2 className="professor-section-title">Solicitudes de Equipos</h2>
                
                {/* Estadísticas rápidas */}
                <div className="professor-stats-grid">
                  <div className="professor-stat-card">
                    <div className="professor-stat-number">{pendingRequests.length}</div>
                    <div className="professor-stat-label">Solicitudes Pendientes</div>
                  </div>
                  <div className="professor-stat-card">
                    <div className="professor-stat-number">
                      {requests.filter(r => r.requestState === 'approved').length}
                    </div>
                    <div className="professor-stat-label">Aprobadas</div>
                  </div>
                  <div className="professor-stat-card">
                    <div className="professor-stat-number">
                      {requests.filter(r => r.requestState === 'rejected').length}
                    </div>
                    <div className="professor-stat-label">Rechazadas</div>
                  </div>
                  <div className="professor-stat-card">
                    <div className="professor-stat-number">{requests.length}</div>
                    <div className="professor-stat-label">Total Solicitudes</div>
                  </div>
                </div>

                {/* Solicitudes pendientes */}
                <h3 style={{ color: 'var(--inkwell)', marginBottom: '15px', marginTop: '25px' }}>
                  Solicitudes Pendientes de Aprobación
                </h3>
                
                {pendingRequests.length === 0 ? (
                  <div className="professor-card">
                    <p style={{ textAlign: 'center', color: 'var(--lunar-eclipse)' }}>
                      No hay solicitudes pendientes
                    </p>
                  </div>
                ) : (
                  pendingRequests.map(request => (
                    <div key={request.id} className="professor-card">
                      <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'start' }}>
                        <div style={{ flex: 1 }}>
                          <h4 style={{ color: 'var(--inkwell)', margin: '0 0 10px 0' }}>
                            Solicitud de {request.Name}
                          </h4>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '15px' }}>
                            <p style={{ margin: 0, color: 'var(--lunar-eclipse)' }}>
                              <strong>ID Estudiante:</strong> {request.studentID}
                            </p>
                            <p style={{ margin: 0, color: 'var(--lunar-eclipse)' }}>
                              <strong>Email:</strong> {request.email}
                            </p>
                            <p style={{ margin: 0, color: 'var(--lunar-eclipse)' }}>
                              <strong>Ubicación:</strong> {request.location}
                            </p>
                            <p style={{ margin: 0, color: 'var(--lunar-eclipse)' }}>
                              <strong>CPU:</strong> {request.CPU}
                            </p>
                            <p style={{ margin: 0, color: 'var(--lunar-eclipse)' }}>
                              <strong>Fecha Inicio:</strong> {formatDate(request.startDate)}
                            </p>
                            <p style={{ margin: 0, color: 'var(--lunar-eclipse)' }}>
                              <strong>Fecha Fin:</strong> {formatDate(request.endDate)}
                            </p>
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
                          <button 
                            className="professor-button-primary"
                            onClick={() => handleApproveRequest(request.id)}
                            title="Aprobar solicitud"
                          >
                            <CheckCircleIcon style={{ marginRight: '5px' }} />
                            Aprobar
                          </button>
                          <button 
                            className="professor-button-secondary"
                            onClick={() => handleRejectRequest(request.id)}
                            title="Rechazar solicitud"
                            style={{ background: 'red', color: 'white' }}
                          >
                            <CancelIcon style={{ marginRight: '5px' }} />
                            Rechazar
                          </button>
                          <button 
                            className="professor-button-secondary"
                            onClick={() => openRequestDetails(request)}
                            title="Ver detalles"
                          >
                            <VisibilityIcon />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}

                {/* Historial de solicitudes procesadas */}
                <h3 style={{ color: 'var(--inkwell)', marginBottom: '15px', marginTop: '30px' }}>
                  Historial de Solicitudes
                </h3>
                
                {processedRequests.length === 0 ? (
                  <div className="professor-card">
                    <p style={{ textAlign: 'center', color: 'var(--lunar-eclipse)' }}>
                      No hay solicitudes procesadas
                    </p>
                  </div>
                ) : (
                  <div className="professor-table" style={{ overflow: 'hidden', borderRadius: '8px' }}>
                    <table className="professor-table">
                      <thead>
                        <tr>
                          <th>Estudiante</th>
                          <th>ID Estudiante</th>
                          <th>CPU</th>
                          <th>Período</th>
                          <th>Estado</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {processedRequests.map(request => (
                          <tr key={request.id}>
                            <td>{request.Name}</td>
                            <td>{request.studentID}</td>
                            <td>{request.CPU}</td>
                            <td>{formatDate(request.startDate)} - {formatDate(request.endDate)}</td>
                            <td>
                              <span style={{ 
                                color: getStatusColor(request.requestState),
                                fontWeight: 'bold'
                              }}>
                                {getStatusText(request.requestState)}
                              </span>
                            </td>
                            <td>
                              <button 
                                className="professor-button-secondary"
                                onClick={() => openRequestDetails(request)}
                                style={{ padding: '5px 10px', fontSize: '12px' }}
                              >
                                Ver
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de detalles */}
      {showModal && selectedRequest && (
        <div className="professor-modal-overlay">
          <div className="professor-modal-content">
            <div className="professor-modal-header">
              <h3 className="professor-modal-title">
                Detalles de Solicitud - {selectedRequest.Name}
              </h3>
              <button 
                className="professor-modal-close"
                onClick={() => setShowModal(false)}
              >
                ✕
              </button>
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ color: 'var(--inkwell)', marginBottom: '15px' }}>
                Información del Estudiante
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div>
                  <p><strong>Nombre:</strong> {selectedRequest.Name}</p>
                  <p><strong>ID Estudiante:</strong> {selectedRequest.studentID}</p>
                  <p><strong>Email:</strong> {selectedRequest.email}</p>
                </div>
                <div>
                  <p><strong>Ubicación:</strong> {selectedRequest.location}</p>
                  <p><strong>Estado:</strong> 
                    <span style={{ 
                      color: getStatusColor(selectedRequest.requestState),
                      fontWeight: 'bold',
                      marginLeft: '5px'
                    }}>
                      {getStatusText(selectedRequest.requestState)}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ color: 'var(--inkwell)', marginBottom: '15px' }}>
                Detalles del Equipo
              </h4>
              <p><strong>CPU Asignado:</strong> {selectedRequest.CPU}</p>
              <p><strong>Fecha de Inicio:</strong> {formatDate(selectedRequest.startDate)}</p>
              <p><strong>Fecha de Finalización:</strong> {formatDate(selectedRequest.endDate)}</p>
              <p><strong>Términos Aceptados:</strong> {selectedRequest.termsAccepted ? 'Sí' : 'No'}</p>
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              {selectedRequest.requestState === 'pendingForAprv' && (
                <>
                  <button 
                    className="professor-button-primary"
                    onClick={() => {
                      handleApproveRequest(selectedRequest.id)
                      setShowModal(false)
                    }}
                  >
                    Aprobar
                  </button>
                  <button 
                    className="professor-button-secondary"
                    onClick={() => {
                      handleRejectRequest(selectedRequest.id)
                      setShowModal(false)
                    }}
                    style={{ background: 'red', color: 'white' }}
                  >
                    Rechazar
                  </button>
                </>
              )}
              <button 
                className="professor-button-secondary"
                onClick={() => setShowModal(false)}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProfessorEquipment