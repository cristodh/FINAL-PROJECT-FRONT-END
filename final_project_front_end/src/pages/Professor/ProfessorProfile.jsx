import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ProfessorNavbar from '../../components/Professor/ProfessorNavbar'
import ProfessorSidebar from '../../components/Professor/ProfessorSidebar'
import { ProfessorDB } from '../../services/ProfessorDB'
import PersonIcon from '@mui/icons-material/Person'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import SchoolIcon from '@mui/icons-material/School'
import WorkIcon from '@mui/icons-material/Work'
import '../../styles/Professor/ProfessorTheme.css'

function ProfessorProfile() {
  const navigate = useNavigate()
  const [professorData, setProfessorData] = useState({
    id: '',
    email: '',
    name: '',
    lastName: '',
    phone: '',
    identification: '',
    specialization: '',
    experience: '',
    education: '',
    birthDate: '',
    gender: '',
    address: '',
    password: '',
    confirmPassword: '',
    active: false
  })
  const [isEditing, setIsEditing] = useState(false)
  const [originalData, setOriginalData] = useState({})

  useEffect(() => {
    // Verificar autenticación y cargar datos
    const currentProfessor = ProfessorDB.getCurrentProfessor()
    if (!currentProfessor) {
      navigate('/professor-login')
      return
    }
    
    setProfessorData(currentProfessor)
    setOriginalData(currentProfessor)
  }, [navigate])

  function handleInputChange(e) {
    const { name, value } = e.target
    setProfessorData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  function handleEditToggle() {
    if (isEditing) {
      // Cancelar edición - restaurar datos originales
      setProfessorData(originalData)
      setIsEditing(false)
    } else {
      // Iniciar edición
      setIsEditing(true)
    }
  }

  function handleSaveChanges(e) {
    e.preventDefault()

    // Validar campos requeridos
    const requiredFields = ['name', 'lastName', 'phone', 'identification', 'specialization']
    const missingFields = requiredFields.filter(field => !professorData[field]?.trim())
    
    if (missingFields.length > 0) {
      alert('Por favor complete todos los campos requeridos: ' + missingFields.join(', '))
      return
    }

    // Validar contraseñas si se están cambiando
    if (professorData.password && professorData.password !== professorData.confirmPassword) {
      alert('Las contraseñas no coinciden')
      return
    }

    try {
      // Preparar datos para guardar
      const updatedProfessor = {
        ...professorData,
        updatedAt: new Date().toISOString()
      }

      // Si no se cambió la contraseña, mantener la anterior
      if (!professorData.password) {
        delete updatedProfessor.password
        delete updatedProfessor.confirmPassword
      }

      // Guardar usando ProfessorDB
      const saved = ProfessorDB.saveProfessor(updatedProfessor)
      
      if (saved) {
        // Actualizar datos locales
        setOriginalData(updatedProfessor)
        setIsEditing(false)
        alert('Perfil actualizado exitosamente')
      } else {
        throw new Error('No se pudo actualizar el perfil')
      }
    } catch (error) {
      console.error('Error updating professor profile:', error)
      alert('Error al actualizar el perfil. Intente nuevamente.')
    }
  }

  function formatDate(dateString) {
    if (!dateString) return 'No especificado'
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
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
                <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'center', marginBottom: '30px' }}>
                  <h2 className="professor-section-title">Mi Perfil</h2>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    {isEditing ? (
                      <>
                        <button 
                          className="professor-button-secondary"
                          onClick={handleEditToggle}
                        >
                          Cancelar
                        </button>
                        <button 
                          className="professor-button-primary"
                          onClick={handleSaveChanges}
                        >
                          Guardar Cambios
                        </button>
                      </>
                    ) : (
                      <button 
                        className="professor-button-primary"
                        onClick={() => setIsEditing(true)}
                      >
                        <PersonIcon style={{ marginRight: '5px' }} />
                        Editar Perfil
                      </button>
                    )}
                  </div>
                </div>

                {/* Información del perfil */}
                <form onSubmit={handleSaveChanges}>
                  {/* Avatar y información básica */}
                  <div className="professor-card" style={{ marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
                      <div style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        background: 'var(--creme-brulee)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '32px',
                        fontWeight: 'bold',
                        color: 'white'
                      }}>
                        {professorData.name?.charAt(0)?.toUpperCase() || 'P'}
                        {professorData.lastName?.charAt(0)?.toUpperCase() || ''}
                      </div>
                      <div>
                        <h3 style={{ color: 'var(--inkwell)', margin: '0 0 5px 0' }}>
                          {professorData.name} {professorData.lastName}
                        </h3>
                        <p style={{ color: 'var(--lunar-eclipse)', margin: '0 0 3px 0' }}>
                          <EmailIcon style={{ fontSize: '16px', marginRight: '5px' }} />
                          {professorData.email}
                        </p>
                        <p style={{ color: 'var(--lunar-eclipse)', margin: '0 0 3px 0' }}>
                          <SchoolIcon style={{ fontSize: '16px', marginRight: '5px' }} />
                          {professorData.specialization || 'Especialización no especificada'}
                        </p>
                        <p style={{ color: 'var(--lunar-eclipse)', margin: 0 }}>
                          <WorkIcon style={{ fontSize: '16px', marginRight: '5px' }} />
                          {professorData.experience ? `${professorData.experience} años de experiencia` : 'Experiencia no especificada'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Información personal */}
                  <div className="professor-card" style={{ marginBottom: '20px' }}>
                    <h4 style={{ color: 'var(--inkwell)', marginBottom: '20px', borderBottom: '2px solid var(--creme-brulee)', paddingBottom: '10px' }}>
                      Información Personal
                    </h4>
                    
                    <div className="professor-form-grid">
                      <div className="professor-form-group">
                        <label className="professor-form-label">Nombre *</label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="name"
                            value={professorData.name}
                            onChange={handleInputChange}
                            className="professor-form-input"
                            required
                          />
                        ) : (
                          <p style={{ color: 'var(--inkwell)', margin: 0, padding: '10px 0' }}>
                            {professorData.name || 'No especificado'}
                          </p>
                        )}
                      </div>

                      <div className="professor-form-group">
                        <label className="professor-form-label">Apellidos *</label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="lastName"
                            value={professorData.lastName}
                            onChange={handleInputChange}
                            className="professor-form-input"
                            required
                          />
                        ) : (
                          <p style={{ color: 'var(--inkwell)', margin: 0, padding: '10px 0' }}>
                            {professorData.lastName || 'No especificado'}
                          </p>
                        )}
                      </div>

                      <div className="professor-form-group">
                        <label className="professor-form-label">Teléfono *</label>
                        {isEditing ? (
                          <input
                            type="tel"
                            name="phone"
                            value={professorData.phone}
                            onChange={handleInputChange}
                            className="professor-form-input"
                            required
                          />
                        ) : (
                          <p style={{ color: 'var(--inkwell)', margin: 0, padding: '10px 0' }}>
                            <PhoneIcon style={{ fontSize: '16px', marginRight: '5px' }} />
                            {professorData.phone || 'No especificado'}
                          </p>
                        )}
                      </div>

                      <div className="professor-form-group">
                        <label className="professor-form-label">Cédula *</label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="identification"
                            value={professorData.identification}
                            onChange={handleInputChange}
                            className="professor-form-input"
                            required
                          />
                        ) : (
                          <p style={{ color: 'var(--inkwell)', margin: 0, padding: '10px 0' }}>
                            {professorData.identification || 'No especificado'}
                          </p>
                        )}
                      </div>

                      <div className="professor-form-group">
                        <label className="professor-form-label">Fecha de Nacimiento</label>
                        {isEditing ? (
                          <input
                            type="date"
                            name="birthDate"
                            value={professorData.birthDate}
                            onChange={handleInputChange}
                            className="professor-form-input"
                          />
                        ) : (
                          <p style={{ color: 'var(--inkwell)', margin: 0, padding: '10px 0' }}>
                            {formatDate(professorData.birthDate)}
                          </p>
                        )}
                      </div>

                      <div className="professor-form-group">
                        <label className="professor-form-label">Género</label>
                        {isEditing ? (
                          <select
                            name="gender"
                            value={professorData.gender}
                            onChange={handleInputChange}
                            className="professor-form-select"
                          >
                            <option value="">Seleccionar</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Femenino">Femenino</option>
                            <option value="Otro">Otro</option>
                          </select>
                        ) : (
                          <p style={{ color: 'var(--inkwell)', margin: 0, padding: '10px 0' }}>
                            {professorData.gender || 'No especificado'}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="professor-form-group">
                      <label className="professor-form-label">Dirección</label>
                      {isEditing ? (
                        <textarea
                          name="address"
                          value={professorData.address}
                          onChange={handleInputChange}
                          className="professor-form-textarea"
                          rows="2"
                        />
                      ) : (
                        <p style={{ color: 'var(--inkwell)', margin: 0, padding: '10px 0' }}>
                          {professorData.address || 'No especificado'}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Información profesional */}
                  <div className="professor-card" style={{ marginBottom: '20px' }}>
                    <h4 style={{ color: 'var(--inkwell)', marginBottom: '20px', borderBottom: '2px solid var(--creme-brulee)', paddingBottom: '10px' }}>
                      Información Profesional
                    </h4>
                    
                    <div className="professor-form-grid">
                      <div className="professor-form-group">
                        <label className="professor-form-label">Especialización *</label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="specialization"
                            value={professorData.specialization}
                            onChange={handleInputChange}
                            className="professor-form-input"
                            required
                          />
                        ) : (
                          <p style={{ color: 'var(--inkwell)', margin: 0, padding: '10px 0' }}>
                            {professorData.specialization || 'No especificado'}
                          </p>
                        )}
                      </div>

                      <div className="professor-form-group">
                        <label className="professor-form-label">Años de Experiencia</label>
                        {isEditing ? (
                          <input
                            type="number"
                            name="experience"
                            value={professorData.experience}
                            onChange={handleInputChange}
                            className="professor-form-input"
                            min="0"
                            max="50"
                          />
                        ) : (
                          <p style={{ color: 'var(--inkwell)', margin: 0, padding: '10px 0' }}>
                            {professorData.experience ? `${professorData.experience} años` : 'No especificado'}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="professor-form-group">
                      <label className="professor-form-label">Educación y Títulos</label>
                      {isEditing ? (
                        <textarea
                          name="education"
                          value={professorData.education}
                          onChange={handleInputChange}
                          className="professor-form-textarea"
                          rows="3"
                          placeholder="Describir títulos, certificaciones y educación relevante"
                        />
                      ) : (
                        <p style={{ color: 'var(--inkwell)', margin: 0, padding: '10px 0', lineHeight: '1.5' }}>
                          {professorData.education || 'No especificado'}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Cambio de contraseña */}
                  {isEditing && (
                    <div className="professor-card">
                      <h4 style={{ color: 'var(--inkwell)', marginBottom: '20px', borderBottom: '2px solid var(--creme-brulee)', paddingBottom: '10px' }}>
                        Cambiar Contraseña (Opcional)
                      </h4>
                      
                      <div className="professor-form-grid">
                        <div className="professor-form-group">
                          <label className="professor-form-label">Nueva Contraseña</label>
                          <input
                            type="password"
                            name="password"
                            value={professorData.password}
                            onChange={handleInputChange}
                            className="professor-form-input"
                            placeholder="Dejar vacío para mantener la actual"
                          />
                        </div>

                        <div className="professor-form-group">
                          <label className="professor-form-label">Confirmar Nueva Contraseña</label>
                          <input
                            type="password"
                            name="confirmPassword"
                            value={professorData.confirmPassword}
                            onChange={handleInputChange}
                            className="professor-form-input"
                            placeholder="Confirmar nueva contraseña"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Información del sistema */}
                  <div className="professor-card">
                    <h4 style={{ color: 'var(--inkwell)', marginBottom: '15px' }}>
                      Información del Sistema
                    </h4>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', fontSize: '12px', color: 'var(--lunar-eclipse)' }}>
                      <p><strong>Estado:</strong> {professorData.active ? 'Activo' : 'Inactivo'}</p>
                      <p><strong>Email:</strong> {professorData.email}</p>
                      <p><strong>Registrado:</strong> {formatDate(professorData.registeredAt)}</p>
                      <p><strong>Última Actualización:</strong> {formatDate(professorData.updatedAt)}</p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfessorProfile