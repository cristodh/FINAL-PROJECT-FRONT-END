// Utilidad para simular operaciones de base de datos en desarrollo
// En producción, estas funciones harían llamadas reales a una API

export class ProfessorDB {
  
  // Obtener todos los profesores (db.json + localStorage)
  static async getAllProfessors() {
    try {
      const response = await fetch('/src/services/db.json')
      const db = await response.json()
      const dbTeachers = db.teachers || []
      
      // Combinar con profesores registrados localmente
      const localTeachers = JSON.parse(localStorage.getItem('registeredProfessors') || '[]')
      
      return [...dbTeachers, ...localTeachers]
    } catch (error) {
      console.error('Error fetching professors:', error)
      return []
    }
  }

  // Buscar profesor por email y contraseña
  static async findProfessorByCredentials(email, password) {
    const allProfessors = await this.getAllProfessors()
    
    // Buscar con contraseña final (profesor ya registrado)
    let professor = allProfessors.find(p => p.email === email && p.password === password)
    
    // Si no se encuentra, buscar con tempPassword (primer login)
    if (!professor) {
      professor = allProfessors.find(p => p.email === email && p.tempPassword === password)
    }
    
    return professor
  }

  // Guardar/actualizar profesor
  static saveProfessor(professorData) {
    try {
      // Guardar datos actuales del profesor
      localStorage.setItem('professorData', JSON.stringify(professorData))
      
      // Actualizar en la lista de profesores registrados
      const registeredProfessors = JSON.parse(localStorage.getItem('registeredProfessors') || '[]')
      const existingIndex = registeredProfessors.findIndex(prof => prof.id === professorData.id)
      
      if (existingIndex >= 0) {
        registeredProfessors[existingIndex] = professorData
      } else {
        registeredProfessors.push(professorData)
      }
      
      localStorage.setItem('registeredProfessors', JSON.stringify(registeredProfessors))
      
      return true
    } catch (error) {
      console.error('Error saving professor:', error)
      return false
    }
  }

  // Obtener profesor actual de localStorage
  static getCurrentProfessor() {
    try {
      const professorData = localStorage.getItem('professorData')
      return professorData ? JSON.parse(professorData) : null
    } catch (error) {
      console.error('Error getting current professor:', error)
      return null
    }
  }

  // Limpiar datos de sesión
  static clearSession() {
    localStorage.removeItem('professorData')
  }

  // Verificar si un profesor está autenticado
  static isAuthenticated() {
    const professor = this.getCurrentProfessor()
    return professor && professor.id
  }

  // Obtener estadísticas simuladas
  static async getStatistics() {
    try {
      const response = await fetch('/src/services/db.json')
      const db = await response.json()
      
      return {
        totalStudents: db.students?.length || 0,
        totalTasks: db.tasks?.length || 0,
        pendingSubmissions: db.taskSubmissions?.filter(s => s.status === 'entregada' && !s.score)?.length || 0,
        pendingRequests: db.cpurequests?.filter(r => r.requestState === 'pendingForAprv')?.length || 0
      }
    } catch (error) {
      console.error('Error getting statistics:', error)
      return {
        totalStudents: 0,
        totalTasks: 0,
        pendingSubmissions: 0,
        pendingRequests: 0
      }
    }
  }
}

// Funciones de utilidad para mostrar mensajes informativos
export const showDevMessage = (action, data) => {
  console.log(`🔧 [DESARROLLO] ${action}:`, data)
  console.log('📝 Nota: En producción, esto se guardaría en una base de datos real.')
}

export const showSuccessMessage = (message, details = null) => {
  let fullMessage = `✅ ${message}`
  
  if (details) {
    fullMessage += `\n\nDetalles: ${JSON.stringify(details, null, 2)}`
  }
  
  fullMessage += '\n\n📝 Nota: En un entorno de producción, estos datos se persistirían en la base de datos real.'
  
  return fullMessage
}