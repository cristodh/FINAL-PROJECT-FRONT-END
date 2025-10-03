import React, { useState } from 'react'
import TeacherLoginForm from '../../components/Professor/TeacherLoginForm'
import TeacherLoginBackgroud from '../../components/Professor/TeacherLoginBackgroud'
import { useNavigate } from 'react-router-dom'
import { ProfessorDB } from '../../services/ProfessorDB'
// ProfessorDebugPanel eliminado
import '../../styles/Professor/ProfessorTheme.css'

function LoginProfessor() {
  const [showRegister, setShowRegister] = useState(false)
  const navigate = useNavigate()

  // Validar login del profesor usando ProfessorDB
  async function handleProfessorLogin(email, password) {
    try {
      const professor = await ProfessorDB.findProfessorByCredentials(email, password)
      
      if (professor) {
        // Guardar datos del profesor en localStorage
        ProfessorDB.saveProfessor(professor)
        
        // Verificar si es primer login (sin datos completos)
        if (!professor.name || !professor.active) {
          // Redirigir al registro para completar datos
          navigate('/professor-register')
        } else {
          // Redirigir al home del profesor
          navigate('/professor-home')
        }
      } else {
        alert('Email o contraseña incorrectos.\n\n💡 Consejos:\n• Use su contraseña temporal para el primer login\n• Use su contraseña final si ya completó el registro\n• Verifique que no haya espacios extra')
      }
    } catch (error) {
      console.error('Error validating professor:', error)
      alert('Error de conexión. Intente nuevamente.')
    }
  }

  if (showRegister) {
    navigate('/professor-register')
    return null
  }

  return (
    <div className='professor-columns'>
  {/* ProfessorDebugPanel eliminado */}
      <div className='professor-leftColumn'>
        <TeacherLoginBackgroud />
      </div>
      <div className='professor-rightColumn'>
        <TeacherLoginForm onLogin={handleProfessorLogin} />
      </div>
    </div>
  )
}

export default LoginProfessor