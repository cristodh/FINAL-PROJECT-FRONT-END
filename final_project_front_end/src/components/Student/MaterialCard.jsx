import React, { useState } from 'react';
import MaterialViewer from './MaterialViewer.jsx';
import '../../styles/Student/MaterialCard.css';

const MaterialCard = ({ material, onUpdate }) => {
  const [showViewer, setShowViewer] = useState(false);

  // Formatear fecha
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Obtener icono según tipo de archivo
  const getFileIcon = (fileType) => {
    const icons = {
      'pdf': '📄',
      'docx': '📝',
      'pptx': '📊',
      'zip': '🗜️',
      'video': '🎥',
      'image': '🖼️',
      'audio': '🎵'
    };
    return icons[fileType] || '📎';
  };

  // Obtener color de la categoría
  const getCategoryColor = (category) => {
    const colors = {
      'Documentos del Profesor': 'var(--color-harbor-blue)',
      'Trabajos Ejemplares': 'var(--color-neon-navy)',
      'Mis Subidas': 'var(--color-pageant-blue)'
    };
    return colors[category] || 'var(--color-pageant-blue)';
  };

  const handleDownload = () => {
    // Simular descarga del archivo
    console.log(`Descargando: ${material.fileName}`);
    // Aquí implementarías la lógica real de descarga
    
    // Incrementar contador de descargas (opcional)
    if (onUpdate) {
      // onUpdate podría actualizar el contador en la base de datos
    }
  };

  const handlePreview = () => {
    setShowViewer(true);
  };

  return (
    <>
      <div className="material-card">
        {/* Header con icono y categoría */}
        <div className="material-header">
          <div className="file-info">
            <span className="file-icon">{getFileIcon(material.fileType)}</span>
            <span className="file-type">{material.fileType.toUpperCase()}</span>
            <span className="file-size">{material.fileSize}</span>
          </div>
          <div 
            className="category-badge"
            style={{ backgroundColor: getCategoryColor(material.category) }}
          >
            {material.category}
          </div>
        </div>

        {/* Contenido principal */}
        <div className="material-content">
          <h3 className="material-title">{material.title}</h3>
          <p className="material-description">{material.description}</p>
          
          {/* Tags */}
          {material.tags && material.tags.length > 0 && (
            <div className="material-tags">
              {material.tags.map((tag, index) => (
                <span key={index} className="tag">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Footer con información del autor */}
        <div className="material-footer">
          <div className="author-info">
            <div className="author-details">
              <span className="author-name">👤 {material.uploaderName}</span>
              <span className="upload-date">📅 {formatDate(material.uploadDate)}</span>
            </div>
            <div className="material-stats">
              <span className="download-count">📥 {material.downloadCount}</span>
              {material.isPublic && <span className="public-badge">🌐 Público</span>}
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="material-actions">
          <button 
            className="preview-btn"
            onClick={handlePreview}
          >
            👁️ Vista Previa
          </button>
          <button 
            className="download-btn"
            onClick={handleDownload}
          >
            💾 Descargar
          </button>
        </div>

        {/* Indicador de curso */}
        {material.courseId && (
          <div className="course-indicator">
            📚 Curso: {material.courseId}
          </div>
        )}
      </div>

      {/* Modal de visualización */}
      {showViewer && (
        <MaterialViewer 
          material={material}
          onClose={() => setShowViewer(false)}
        />
      )}
    </>
  );
};

export default MaterialCard;