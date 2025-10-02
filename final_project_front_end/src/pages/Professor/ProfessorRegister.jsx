import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ProfessorDB, showSuccessMessage } from '../../services/ProfessorDB'
import ProfessorDebugPanel from '../../components/Professor/ProfessorDebugPanel'
import Toastify from 'toastify-js'
import '../../styles/Professor/ProfessorTheme.css'

function ProfessorRegister() {
  const navigate = useNavigate()
  const [professorData, setProfessorData] = useState({
    id: '',
    email: '',
    tempPassword: '',
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

  function handleInputChange(e) {
    const { name, value } = e.target
    setProfessorData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  async function handleRegisterSubmit(e) {
    e.preventDefault()

    // Validar campos requeridos
    const requiredFields = [
      'name', 'lastName', 'phone', 'identification',
      'specialization', 'password', 'confirmPassword'
    ]

    const missingFields = requiredFields.filter(
      field => !professorData[field] || professorData[field].trim() === ''
    )

    if (missingFields.length > 0) {
      Toastify({
        text: "Por favor complete todos los campos requeridos",
        duration: 2500,
        gravity: "top",
        position: "center",
        style: { background: "linear-gradient(to right, #ff5f6d, #ffc371)" }
      }).showToast()
      return
    }

    // Validar contraseñas
    if (professorData.password !== professorData.confirmPassword) {
      Toastify({
        text: "Las contraseñas no coinciden",
        duration: 2500,
        gravity: "top",
        position: "center",
        style: { background: "linear-gradient(to right, #ff5f6d, #ffc371)" }
      }).showToast()
      return
    }

    try {
      // Crear objeto profesor listo para guardar
      const updatedProfessor = {
        ...professorData,
        active: true,
        registeredAt: new Date().toISOString()
      }

      const saved = ProfessorDB.saveProfessor(updatedProfessor)

      if (saved) {
        // Mensaje de éxito
        Toastify({
          text: `¡Registro completado exitosamente! Bienvenido/a ${updatedProfessor.name} ${updatedProfessor.lastName}`,
          duration: 3000,
          gravity: "top",
          position: "center",
          style: { background: "linear-gradient(to right, #00b09b, #96c93d)" }
        }).showToast()

        setTimeout(() => navigate('/professor-home'), 2000)
      } else {
        throw new Error('No se pudo guardar el profesor')
      }
    } catch (error) {
      console.error('Error registering professor:', error)
      Toastify({
        text: "Error al completar el registro. Intente nuevamente.",
        duration: 2500,
        gravity: "top",
        position: "center",
        style: { background: "linear-gradient(to right, #ff5f6d, #ffc371)" }
      }).showToast()
    }
  }

  return (
    <div className="professor-register-container">
      <ProfessorDebugPanel />
      <div className="professor-register-overlay">
        <form className="professor-register-form" onSubmit={handleRegisterSubmit}>
          <h2 className="professor-register-title">Completar Registro de Profesor</h2>

          {/* Inputs */}
          <div className="professor-form-grid">
            <div className="professor-register-input-group">
              <label className="professor-register-label">Nombre *</label>
              <input
                type="text"
                name="name"
                value={professorData.name}
                onChange={handleInputChange}
                className="professor-register-input"
              />
            </div>

            <div className="professor-register-input-group">
              <label className="professor-register-label">Apellidos *</label>
              <input
                type="text"
                name="lastName"
                value={professorData.lastName}
                onChange={handleInputChange}
                className="professor-register-input"
              />
            </div>

            <div className="professor-register-input-group">
              <label className="professor-register-label">Teléfono *</label>
              <input
                type="tel"
                name="phone"
                value={professorData.phone}
                onChange={handleInputChange}
                className="professor-register-input"
              />
            </div>

            <div className="professor-register-input-group">
              <label className="professor-register-label">Cédula *</label>
              <input
                type="text"
                name="identification"
                value={professorData.identification}
                onChange={handleInputChange}
                className="professor-register-input"
              />
            </div>

            <div className="professor-register-input-group">
              <label className="professor-register-label">Especialización *</label>
              <input
                type="text"
                name="specialization"
                value={professorData.specialization}
                onChange={handleInputChange}
                className="professor-register-input"
                placeholder="Ej: Desarrollo Web, Redes, Bases de Datos"
              />
            </div>

            <div className="professor-register-input-group">
              <label className="professor-register-label">Años de Experiencia</label>
              <input
                type="number"
                name="experience"
                value={professorData.experience}
                onChange={handleInputChange}
                className="professor-register-input"
                min="0"
                max="50"
              />
            </div>
          </div>

          <div className="professor-register-input-group">
            <label className="professor-register-label">Educación/Títulos</label>
            <textarea
              name="education"
              value={professorData.education}
              onChange={handleInputChange}
              className="professor-form-textarea"
              placeholder="Describir títulos, certificaciones y educación relevante"
              rows="3"
            />
          </div>

          <div className="professor-register-input-group">
            <label className="professor-register-label">Dirección</label>
            <textarea
              name="address"
              value={professorData.address}
              onChange={handleInputChange}
              className="professor-form-textarea"
              placeholder="Dirección completa"
              rows="2"
            />
          </div>

          <div className="professor-form-grid">
            <div className="professor-register-input-group">
              <label className="professor-register-label">Nueva Contraseña *</label>
              <input
                type="password"
                name="password"
                value={professorData.password}
                onChange={handleInputChange}
                className="professor-register-input"
              />
            </div>

            <div className="professor-register-input-group">
              <label className="professor-register-label">Confirmar Contraseña *</label>
              <input
                type="password"
                name="confirmPassword"
                value={professorData.confirmPassword}
                onChange={handleInputChange}
                className="professor-register-input"
              />
            </div>
          </div>

          <button type="submit" className="professor-register-button">
            Completar Registro
          </button>
        </form>
      </div>
    </div>
  )
}

export default ProfessorRegister
