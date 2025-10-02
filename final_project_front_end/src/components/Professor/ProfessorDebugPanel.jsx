import React, { useState, useEffect } from 'react'
import { ProfessorDB } from '../../services/ProfessorDB'

function ProfessorDebugPanel() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentProfessor, setCurrentProfessor] = useState(null)
  const [registeredProfessors, setRegisteredProfessors] = useState([])

  useEffect(() => {
    loadDebugData()
  }, [])

  function loadDebugData() {
    const current = ProfessorDB.getCurrentProfessor()
    const registered = JSON.parse(localStorage.getItem('registeredProfessors') || '[]')
    
    setCurrentProfessor(current)
    setRegisteredProfessors(registered)
  }

  function clearAllData() {
    if (window.confirm('¿Limpiar todos los datos de profesores del navegador?')) {
      localStorage.removeItem('professorData')
      localStorage.removeItem('registeredProfessors')
      loadDebugData()
      alert('Datos limpiados')
    }
  }

  if (!isVisible) {
    return (
      <div style={{
        position: 'fixed',
        top: '10px',
        right: '10px',
        zIndex: 9999
      }}>
        <button 
          onClick={() => setIsVisible(true)}
          style={{
            background: 'var(--creme-brulee)',
            color: 'white',
            border: 'none',
            padding: '8px 12px',
            borderRadius: '4px',
            fontSize: '12px',
            cursor: 'pointer'
          }}
        >
          🔧 Debug
        </button>
      </div>
    )
  }

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      width: '400px',
      maxHeight: '80vh',
      background: 'white',
      border: '2px solid var(--inkwell)',
      borderRadius: '8px',
      padding: '15px',
      zIndex: 9999,
      overflow: 'auto',
      boxShadow: '0 5px 15px rgba(0,0,0,0.3)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'center', marginBottom: '15px' }}>
        <h3 style={{ margin: 0, color: 'var(--inkwell)' }}>🔧 Professor Debug Panel</h3>
        <button 
          onClick={() => setIsVisible(false)}
          style={{
            background: 'red',
            color: 'white',
            border: 'none',
            padding: '4px 8px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          ✕
        </button>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <h4 style={{ color: 'var(--inkwell)', marginBottom: '5px' }}>Profesor Actual:</h4>
        {currentProfessor ? (
          <pre style={{ 
            background: 'var(--au-lait)', 
            padding: '8px', 
            borderRadius: '4px', 
            fontSize: '11px',
            overflow: 'auto',
            maxHeight: '150px'
          }}>
            {JSON.stringify(currentProfessor, null, 2)}
          </pre>
        ) : (
          <p style={{ color: 'orange' }}>No hay profesor logueado</p>
        )}
      </div>

      <div style={{ marginBottom: '15px' }}>
        <h4 style={{ color: 'var(--inkwell)', marginBottom: '5px' }}>
          Profesores Registrados ({registeredProfessors.length}):
        </h4>
        {registeredProfessors.length > 0 ? (
          <pre style={{ 
            background: 'var(--au-lait)', 
            padding: '8px', 
            borderRadius: '4px', 
            fontSize: '11px',
            overflow: 'auto',
            maxHeight: '200px'
          }}>
            {JSON.stringify(registeredProfessors, null, 2)}
          </pre>
        ) : (
          <p style={{ color: 'orange' }}>No hay profesores registrados localmente</p>
        )}
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <button 
          onClick={loadDebugData}
          style={{
            background: 'var(--inkwell)',
            color: 'white',
            border: 'none',
            padding: '8px 12px',
            borderRadius: '4px',
            fontSize: '12px',
            cursor: 'pointer'
          }}
        >
          🔄 Actualizar
        </button>
        <button 
          onClick={clearAllData}
          style={{
            background: 'red',
            color: 'white',
            border: 'none',
            padding: '8px 12px',
            borderRadius: '4px',
            fontSize: '12px',
            cursor: 'pointer'
          }}
        >
          🗑️ Limpiar Todo
        </button>
      </div>

      <div style={{ 
        marginTop: '10px', 
        padding: '8px', 
        background: '#f0f8ff', 
        borderRadius: '4px',
        fontSize: '11px',
        color: '#666'
      }}>
        <strong>Nota:</strong> En desarrollo, los datos se guardan en localStorage. 
        En producción se usaría una base de datos real.
      </div>
    </div>
  )
}

export default ProfessorDebugPanel