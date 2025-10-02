import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ProfessorNavbar from '../../components/Professor/ProfessorNavbar'
import ProfessorSidebar from '../../components/Professor/ProfessorSidebar'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import FolderIcon from '@mui/icons-material/Folder'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import ImageIcon from '@mui/icons-material/Image'
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary'
import DescriptionIcon from '@mui/icons-material/Description'
import DownloadIcon from '@mui/icons-material/Download'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility'
import '../../styles/Professor/ProfessorTheme.css'

function ProfessorFiles() {
  const navigate = useNavigate()
  const [files, setFiles] = useState([])
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all') // 'all', 'documents', 'images', 'videos', 'projects'
  const [newFile, setNewFile] = useState({
    title: '',
    description: '',
    category: 'Documentos del Profesor',
    tags: '',
    courseId: '1',
    isPublic: true,
    file: null
  })
  const [professorData, setProfessorData] = useState(null)

  useEffect(() => {
    // Verificar autenticación
    const storedData = localStorage.getItem('professorData')
    if (!storedData) {
      navigate('/professor-login')
      return
    }
    
    setProfessorData(JSON.parse(storedData))
    loadFiles()
  }, [navigate])

  async function loadFiles() {
    try {
      const response = await fetch('/src/services/db.json')
      const db = await response.json()
      
      // Cargar archivos existentes desde db.json
      const dbFiles = db.materials || []
      
      // Cargar archivos subidos por el profesor desde localStorage
      const localFiles = JSON.parse(localStorage.getItem('professorFiles') || '[]')
      
      // Combinar y ordenar por fecha
      const allFiles = [...dbFiles, ...localFiles].sort((a, b) => 
        new Date(b.uploadDate) - new Date(a.uploadDate)
      )
      
      setFiles(allFiles)
    } catch (error) {
      console.error('Error loading files:', error)
    }
  }

  function handleFileUpload(e) {
    const file = e.target.files[0]
    if (file) {
      setNewFile(prev => ({
        ...prev,
        file: file
      }))
    }
  }

  function handleUploadSubmit(e) {
    e.preventDefault()
    
    if (!newFile.file || !newFile.title.trim()) {
      alert('Por favor complete el título y seleccione un archivo')
      return
    }

    // Simular subida de archivo
    const fileData = {
      id: 'prof_' + Date.now(),
      title: newFile.title,
      description: newFile.description,
      fileName: newFile.file.name,
      fileType: newFile.file.name.split('.').pop().toLowerCase(),
      fileSize: formatFileSize(newFile.file.size),
      category: newFile.category,
      courseId: newFile.courseId,
      uploadedBy: professorData?.id || 'professor',
      uploaderName: professorData ? `${professorData.name} ${professorData.lastName}` : 'Profesor',
      uploadDate: new Date().toISOString(),
      tags: newFile.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      downloadCount: 0,
      isPublic: newFile.isPublic,
      // En producción aquí iría la URL real del archivo
      fileUrl: `uploads/${newFile.file.name}`
    }

    // Guardar en localStorage (simulando base de datos)
    const existingFiles = JSON.parse(localStorage.getItem('professorFiles') || '[]')
    existingFiles.push(fileData)
    localStorage.setItem('professorFiles', JSON.stringify(existingFiles))

    // Actualizar estado local
    setFiles(prev => [fileData, ...prev])

    // Limpiar formulario
    setNewFile({
      title: '',
      description: '',
      category: 'Documentos del Profesor',
      tags: '',
      courseId: '1',
      isPublic: true,
      file: null
    })

    setShowUploadModal(false)
    alert('Archivo subido exitosamente')
  }

  function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  function getFileIcon(fileType) {
    switch(fileType?.toLowerCase()) {
      case 'pdf': return <PictureAsPdfIcon style={{ color: '#d32f2f' }} />
      case 'jpg': case 'jpeg': case 'png': case 'gif': return <ImageIcon style={{ color: '#4caf50' }} />
      case 'mp4': case 'avi': case 'mov': return <VideoLibraryIcon style={{ color: '#ff9800' }} />
      case 'doc': case 'docx': return <DescriptionIcon style={{ color: '#2196f3' }} />
      default: return <DescriptionIcon style={{ color: 'var(--lunar-eclipse)' }} />
    }
  }

  function handleDeleteFile(fileId) {
    if (window.confirm('¿Está seguro de eliminar este archivo?')) {
      // Eliminar de localStorage si es un archivo subido por el profesor
      const localFiles = JSON.parse(localStorage.getItem('professorFiles') || '[]')
      const updatedLocalFiles = localFiles.filter(file => file.id !== fileId)
      localStorage.setItem('professorFiles', JSON.stringify(updatedLocalFiles))
      
      // Actualizar estado
      setFiles(prev => prev.filter(file => file.id !== fileId))
      alert('Archivo eliminado exitosamente')
    }
  }

  function simulateDownload(file) {
    // Simular descarga
    alert(`Descargando: ${file.fileName}\nEn producción, esto descargaría el archivo real.`)
    
    // Incrementar contador de descargas
    setFiles(prev => prev.map(f => 
      f.id === file.id ? { ...f, downloadCount: (f.downloadCount || 0) + 1 } : f
    ))
  }

  const filteredFiles = files.filter(file => {
    if (selectedCategory === 'all') return true
    
    const fileType = file.fileType?.toLowerCase()
    switch(selectedCategory) {
      case 'documents':
        return ['pdf', 'doc', 'docx', 'txt'].includes(fileType)
      case 'images':
        return ['jpg', 'jpeg', 'png', 'gif', 'svg'].includes(fileType)
      case 'videos':
        return ['mp4', 'avi', 'mov', 'wmv'].includes(fileType)
      case 'projects':
        return ['zip', 'rar', 'tar', 'gz'].includes(fileType)
      default:
        return true
    }
  })

  const categories = [
    { key: 'all', label: 'Todos los Archivos', count: files.length },
    { key: 'documents', label: 'Documentos', count: files.filter(f => ['pdf', 'doc', 'docx', 'txt'].includes(f.fileType?.toLowerCase())).length },
    { key: 'images', label: 'Imágenes', count: files.filter(f => ['jpg', 'jpeg', 'png', 'gif', 'svg'].includes(f.fileType?.toLowerCase())).length },
    { key: 'videos', label: 'Videos', count: files.filter(f => ['mp4', 'avi', 'mov', 'wmv'].includes(f.fileType?.toLowerCase())).length },
    { key: 'projects', label: 'Proyectos', count: files.filter(f => ['zip', 'rar', 'tar', 'gz'].includes(f.fileType?.toLowerCase())).length }
  ]

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
                  <h2 className="professor-section-title">Archivos Ejemplares</h2>
                  <button 
                    className="professor-button-primary"
                    onClick={() => setShowUploadModal(true)}
                  >
                    <UploadFileIcon style={{ marginRight: '5px' }} />
                    Subir Archivo
                  </button>
                </div>

                {/* Filtros por categoría */}
                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
                  {categories.map(category => (
                    <button 
                      key={category.key}
                      className={`professor-button-${selectedCategory === category.key ? 'primary' : 'secondary'}`}
                      onClick={() => setSelectedCategory(category.key)}
                      style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
                    >
                      <FolderIcon style={{ fontSize: '16px' }} />
                      {category.label} ({category.count})
                    </button>
                  ))}
                </div>

                {/* Lista de archivos */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '15px' }}>
                  {filteredFiles.length === 0 ? (
                    <div className="professor-card" style={{ gridColumn: '1 / -1' }}>
                      <p style={{ textAlign: 'center', color: 'var(--lunar-eclipse)' }}>
                        No hay archivos en esta categoría
                      </p>
                    </div>
                  ) : (
                    filteredFiles.map(file => (
                      <div key={file.id} className="professor-card">
                        <div style={{ display: 'flex', alignItems: 'start', gap: '10px', marginBottom: '10px' }}>
                          {getFileIcon(file.fileType)}
                          <div style={{ flex: 1 }}>
                            <h4 style={{ color: 'var(--inkwell)', margin: '0 0 5px 0', fontSize: '14px' }}>
                              {file.title}
                            </h4>
                            <p style={{ color: 'var(--lunar-eclipse)', margin: '0 0 5px 0', fontSize: '12px' }}>
                              {file.fileName} • {file.fileSize}
                            </p>
                            <p style={{ color: 'var(--lunar-eclipse)', margin: '0 0 10px 0', fontSize: '11px' }}>
                              Por: {file.uploaderName}
                            </p>
                          </div>
                        </div>

                        {file.description && (
                          <p style={{ 
                            color: 'var(--inkwell)', 
                            fontSize: '12px', 
                            marginBottom: '10px',
                            lineHeight: '1.4'
                          }}>
                            {file.description}
                          </p>
                        )}

                        {file.tags && file.tags.length > 0 && (
                          <div style={{ marginBottom: '10px' }}>
                            {file.tags.map((tag, index) => (
                              <span 
                                key={index}
                                style={{
                                  background: 'var(--creme-brulee)',
                                  color: 'white',
                                  padding: '2px 6px',
                                  borderRadius: '3px',
                                  fontSize: '10px',
                                  marginRight: '4px'
                                }}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        <div style={{ 
                          display: 'flex', 
                          justifyContent: 'between', 
                          alignItems: 'center',
                          fontSize: '11px',
                          color: 'var(--lunar-eclipse)'
                        }}>
                          <span>Descargas: {file.downloadCount || 0}</span>
                          <span>{new Date(file.uploadDate).toLocaleDateString()}</span>
                        </div>

                        <div style={{ display: 'flex', gap: '5px', marginTop: '10px' }}>
                          <button 
                            className="professor-button-primary"
                            onClick={() => simulateDownload(file)}
                            style={{ flex: 1, padding: '8px', fontSize: '12px' }}
                          >
                            <DownloadIcon style={{ fontSize: '14px', marginRight: '3px' }} />
                            Descargar
                          </button>
                          <button 
                            className="professor-button-secondary"
                            onClick={() => alert('Vista previa en desarrollo')}
                            style={{ padding: '8px' }}
                          >
                            <VisibilityIcon style={{ fontSize: '14px' }} />
                          </button>
                          {file.uploadedBy === professorData?.id && (
                            <button 
                              className="professor-button-secondary"
                              onClick={() => handleDeleteFile(file.id)}
                              style={{ padding: '8px', background: 'red', color: 'white' }}
                            >
                              <DeleteIcon style={{ fontSize: '14px' }} />
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de subida */}
      {showUploadModal && (
        <div className="professor-modal-overlay">
          <div className="professor-modal-content">
            <div className="professor-modal-header">
              <h3 className="professor-modal-title">Subir Archivo Ejemplar</h3>
              <button 
                className="professor-modal-close"
                onClick={() => setShowUploadModal(false)}
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleUploadSubmit}>
              <div className="professor-form-group">
                <label className="professor-form-label">Título del Archivo *</label>
                <input
                  type="text"
                  value={newFile.title}
                  onChange={(e) => setNewFile({...newFile, title: e.target.value})}
                  className="professor-form-input"
                  required
                />
              </div>

              <div className="professor-form-group">
                <label className="professor-form-label">Seleccionar Archivo *</label>
                <input
                  type="file"
                  onChange={handleFileUpload}
                  className="professor-form-input"
                  required
                />
                {newFile.file && (
                  <p style={{ fontSize: '12px', color: 'var(--lunar-eclipse)', marginTop: '5px' }}>
                    Archivo seleccionado: {newFile.file.name} ({formatFileSize(newFile.file.size)})
                  </p>
                )}
              </div>

              <div className="professor-form-group">
                <label className="professor-form-label">Descripción</label>
                <textarea
                  value={newFile.description}
                  onChange={(e) => setNewFile({...newFile, description: e.target.value})}
                  className="professor-form-textarea"
                  rows="3"
                  placeholder="Describir el contenido y propósito del archivo"
                />
              </div>

              <div className="professor-form-grid">
                <div className="professor-form-group">
                  <label className="professor-form-label">Categoría</label>
                  <select
                    value={newFile.category}
                    onChange={(e) => setNewFile({...newFile, category: e.target.value})}
                    className="professor-form-select"
                  >
                    <option value="Documentos del Profesor">Documentos del Profesor</option>
                    <option value="Trabajos Ejemplares">Trabajos Ejemplares</option>
                    <option value="Material de Estudio">Material de Estudio</option>
                    <option value="Proyectos">Proyectos</option>
                    <option value="Recursos">Recursos</option>
                  </select>
                </div>

                <div className="professor-form-group">
                  <label className="professor-form-label">Visible para Estudiantes</label>
                  <select
                    value={newFile.isPublic}
                    onChange={(e) => setNewFile({...newFile, isPublic: e.target.value === 'true'})}
                    className="professor-form-select"
                  >
                    <option value={true}>Sí, visible</option>
                    <option value={false}>No, privado</option>
                  </select>
                </div>
              </div>

              <div className="professor-form-group">
                <label className="professor-form-label">Etiquetas (separadas por comas)</label>
                <input
                  type="text"
                  value={newFile.tags}
                  onChange={(e) => setNewFile({...newFile, tags: e.target.value})}
                  className="professor-form-input"
                  placeholder="html, css, javascript, ejemplo"
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button 
                  type="button"
                  className="professor-button-secondary"
                  onClick={() => setShowUploadModal(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className="professor-button-primary">
                  Subir Archivo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProfessorFiles