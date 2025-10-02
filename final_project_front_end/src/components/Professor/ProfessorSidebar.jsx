import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home'
import VideoCallIcon from '@mui/icons-material/VideoCall'
import AssignmentIcon from '@mui/icons-material/Assignment'
import BarChartIcon from '@mui/icons-material/BarChart'
import FolderIcon from '@mui/icons-material/Folder'
import GroupIcon from '@mui/icons-material/Group'
import ComputerIcon from '@mui/icons-material/Computer'
import PersonIcon from '@mui/icons-material/Person'
import '../../styles/Professor/ProfessorTheme.css'

function ProfessorSidebar() {
  const location = useLocation()

  const menuItems = [
    {
      title: 'Inicio',
      path: '/professor-home',
      icon: HomeIcon
    },
    {
      title: 'Reuniones',
      path: '/professor-meetings',
      icon: VideoCallIcon
    },
    {
      title: 'Tareas y Proyectos',
      path: '/professor-tasks',
      icon: AssignmentIcon
    },
    {
      title: 'Estadísticas',
      path: '/professor-statistics',
      icon: BarChartIcon
    },
    {
      title: 'Archivos Ejemplares',
      path: '/professor-files',
      icon: FolderIcon
    },
    {
      title: 'Asistencia',
      path: '/professor-attendance',
      icon: GroupIcon
    },
    {
      title: 'Solicitudes de Equipo',
      path: '/professor-equipment',
      icon: ComputerIcon
    },
    {
      title: 'Editar Perfil',
      path: '/professor-profile',
      icon: PersonIcon
    }
  ]

  return (
    <div className="professor-sidebar-container">
      <div className="professor-sidebar">
        <h2 className="professor-sidebar-title">Panel de Profesor</h2>
        
        <ul className="professor-sidebar-menu">
          {menuItems.map((item, index) => {
            const IconComponent = item.icon
            const isActive = location.pathname === item.path
            
            return (
              <li key={index} className="professor-sidebar-item">
                <Link 
                  to={item.path} 
                  className={`professor-sidebar-link ${isActive ? 'active' : ''}`}
                >
                  <IconComponent className="professor-sidebar-icon" />
                  <span className="professor-sidebar-text">{item.title}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default ProfessorSidebar