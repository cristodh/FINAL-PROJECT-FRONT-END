import React, { useState } from 'react';
import '../../styles/Student/MaterialViewer.css';

const MaterialViewer = ({ material, onClose }) => {
  const [loading, setLoading] = useState(true);

  // Formatear fecha
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Simular contenido del archivo basado en el tipo
  const renderFileContent = () => {
    const fileType = material.fileType;

    switch (fileType) {
      case 'pdf':
        return (
          <div className="pdf-viewer">
            <div className="pdf-placeholder">
              <div className="pdf-icon">📄</div>
              <p>Vista previa del PDF</p>
              <p className="filename">{material.fileName}</p>
              <div className="pdf-content">
                <h3>Documento PDF</h3>
                <p>Este es un archivo PDF que contiene:</p>
                <p><strong>{material.title}</strong></p>
                <p>{material.description}</p>
                <div className="pdf-pages">
                  <div className="page-preview">Página 1 de X</div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'video':
        return (
          <div className="video-viewer">
            <div className="video-placeholder">
              <div className="video-icon">🎥</div>
              <p>Reproductor de video</p>
              <p className="filename">{material.fileName}</p>
              <div className="video-controls">
                <button className="play-btn">▶️ Reproducir</button>
                <div className="video-info">
                  <p>Duración: Estimada</p>
                  <p>Calidad: HD</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'docx':
        return (
          <div className="document-viewer">
            <div className="document-content">
              <div className="doc-header">
                <div className="doc-icon">📝</div>
                <h3>{material.title}</h3>
              </div>
              <div className="doc-body">
                <p><strong>Descripción:</strong></p>
                <p>{material.description}</p>
                <br />
                <p><strong>Contenido del documento:</strong></p>
                <div className="doc-preview">
                  <p>Este es un documento de Word que contiene información detallada sobre el tema especificado.</p>
                  <p>El documento incluye múltiples secciones con ejemplos, explicaciones y recursos adicionales.</p>
                  <p>Para ver el contenido completo, descarga el archivo.</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'pptx':
        return (
          <div className="presentation-viewer">
            <div className="presentation-content">
              <div className="ppt-header">
                <div className="ppt-icon">📊</div>
                <h3>{material.title}</h3>
              </div>
              <div className="slides-preview">
                <div className="slide">
                  <h4>Diapositiva 1</h4>
                  <p>Título de la presentación</p>
                </div>
                <div className="slide">
                  <h4>Diapositiva 2</h4>
                  <p>Contenido principal...</p>
                </div>
                <div className="slide">
                  <h4>Diapositiva 3</h4>
                  <p>Conclusiones...</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'zip':
        return (
          <div className="archive-viewer">
            <div className="archive-content">
              <div className="archive-icon">🗜️</div>
              <h3>Archivo Comprimido</h3>
              <p className="filename">{material.fileName}</p>
              <div className="archive-info">
                <p><strong>Contenido:</strong></p>
                <ul className="file-list">
                  <li>📁 src/</li>
                  <li>📄 README.md</li>
                  <li>📄 package.json</li>
                  <li>📁 docs/</li>
                  <li>📄 index.html</li>
                </ul>
                <p className="note">Descomprime el archivo para acceder a todo el contenido</p>
              </div>
            </div>
          </div>
        );

      case 'image':
        return (
          <div className="image-viewer">
            <div className="image-placeholder">
              <div className="image-icon">🖼️</div>
              <p>Vista previa de imagen</p>
              <p className="filename">{material.fileName}</p>
              <div className="image-frame">
                <p>Imagen no disponible en vista previa</p>
                <p>Descarga el archivo para ver la imagen completa</p>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="default-viewer">
            <div className="default-content">
              <div className="file-icon">📎</div>
              <h3>Vista Previa No Disponible</h3>
              <p className="filename">{material.fileName}</p>
              <p>Este tipo de archivo no soporta vista previa.</p>
              <p>Descarga el archivo para abrirlo en la aplicación correspondiente.</p>
            </div>
          </div>
        );
    }
  };

  const handleDownload = () => {
    console.log(`Descargando: ${material.fileName}`);
    // Aquí implementarías la lógica real de descarga
    alert(`Iniciando descarga de: ${material.fileName}`);
  };

  return (
    <div className="viewer-modal-overlay">
      <div className="viewer-modal">
        {/* Header del visor */}
        <div className="viewer-header">
          <div className="viewer-title">
            <h2>👁️ Vista Previa</h2>
            <p>{material.title}</p>
          </div>
          <div className="viewer-actions">
            <button 
              className="download-btn"
              onClick={handleDownload}
              title="Descargar archivo"
            >
              💾 Descargar
            </button>
            <button 
              className="close-btn"
              onClick={onClose}
              title="Cerrar vista previa"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Información del archivo */}
        <div className="file-info-bar">
          <div className="info-left">
            <span className="file-type">{material.fileType.toUpperCase()}</span>
            <span className="file-size">{material.fileSize}</span>
            <span className="category">{material.category}</span>
          </div>
          <div className="info-right">
            <span className="author">👤 {material.uploaderName}</span>
            <span className="date">📅 {formatDate(material.uploadDate)}</span>
          </div>
        </div>

        {/* Contenido del visor */}
        <div className="viewer-content">
          {renderFileContent()}
        </div>

        {/* Footer con información adicional */}
        <div className="viewer-footer">
          <div className="material-details">
            <div className="description">
              <h4>Descripción:</h4>
              <p>{material.description}</p>
            </div>
            
            {material.tags && material.tags.length > 0 && (
              <div className="tags-section">
                <h4>Etiquetas:</h4>
                <div className="tags">
                  {material.tags.map((tag, index) => (
                    <span key={index} className="tag">#{tag}</span>
                  ))}
                </div>
              </div>
            )}
            
            <div className="stats">
              <span className="downloads">📥 {material.downloadCount} descargas</span>
              {material.isPublic && <span className="public">🌐 Público</span>}
              {material.courseId && <span className="course">📚 {material.courseId}</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialViewer;