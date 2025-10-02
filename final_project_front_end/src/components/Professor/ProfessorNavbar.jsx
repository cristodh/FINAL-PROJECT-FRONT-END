import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import LogoutIcon from '@mui/icons-material/Logout'
import NotificationsIcon from '@mui/icons-material/Notifications'
import '../../styles/Professor/ProfessorTheme.css'

function ProfessorNavbar() {
  const navigate = useNavigate()
  const [professorData, setProfessorData] = useState(null)

  useEffect(() => {
    // Cargar datos del profesor desde localStorage
    const storedData = localStorage.getItem('professorData')
    if (storedData) {
      setProfessorData(JSON.parse(storedData))
    }
  }, [])

  function handleLogout() {
    // Confirmar logout
    if (window.confirm('¿Está seguro que desea cerrar sesión?')) {
      localStorage.removeItem('professorData')
      navigate('/professor-login')
    }
  }

  function getInitials() {
    if (!professorData?.name) return 'P'
    return professorData.name.charAt(0).toUpperCase() + 
           (professorData.lastName?.charAt(0).toUpperCase() || '')
  }

  return (
    <nav className="professor-navbar">
      <div className="professor-nav-logo">
        Portal Docente - TecnoEducativo
      </div>

      <div className="professor-nav-profile">
        <NotificationsIcon style={{ color: 'var(--au-lait)', cursor: 'pointer' }} />
        
        <div className="professor-nav-avatar">
          {getInitials()}
        </div>
        
        <div className="professor-nav-info">
          <h3>
            {professorData?.name && professorData?.lastName 
              ? `${professorData.name} ${professorData.lastName}`
              : professorData?.email || 'Profesor'
            }
          </h3>
          <p>{professorData?.specialization || 'Especialización'}</p>
        </div>

        <LogoutIcon 
          style={{ 
            color: 'var(--creme-brulee)', 
            cursor: 'pointer',
            marginLeft: '15px' 
          }}
          onClick={handleLogout}
          title="Cerrar Sesión"
        />
      </div>
    </nav>
  )
}

export default ProfessorNavbar