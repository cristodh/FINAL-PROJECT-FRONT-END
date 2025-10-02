import React from "react";
import "../../styles/Student/ClassRecording.css";

function ClassRecording({ recordings }) {
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      weekday: 'long'
    };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  const handleRecordingClick = (driveLink) => {
    window.open(driveLink, '_blank', 'noopener,noreferrer');
  };

  const getDrivePreviewLink = (driveLink) => {
    // Convertir enlace de Drive a preview si es posible
    if (driveLink.includes('drive.google.com/file/d/')) {
      const fileId = driveLink.match(/\/d\/([a-zA-Z0-9-_]+)/)?.[1];
      if (fileId) {
        return `https://drive.google.com/file/d/${fileId}/preview`;
      }
    }
    return driveLink;
  };

  return (
    <div className="class-recordings">
      <h3>📹 Grabaciones de Clase</h3>
      
      {recordings.length === 0 ? (
        <div className="no-recordings">
          <div className="empty-icon">🎬</div>
          <p>No hay grabaciones disponibles para este curso.</p>
          <small>Las grabaciones aparecerán aquí después de cada clase.</small>
        </div>
      ) : (
        <div className="recordings-grid">
          {recordings.map((recording) => (
            <div key={recording.id} className="recording-card">
              <div className="recording-header">
                <div className="recording-icon">
                  <span>▶️</span>
                </div>
                <div className="recording-info">
                  <h4 className="recording-title">{recording.title}</h4>
                  <p className="recording-date">{formatDate(recording.date)}</p>
                </div>
              </div>
              
              <div className="recording-preview">
                <div className="preview-placeholder">
                  <div className="play-icon">
                    <span>▶</span>
                  </div>
                  <p>Grabación de clase</p>
                </div>
              </div>
              
              <div className="recording-actions">
                <button 
                  className="watch-btn"
                  onClick={() => handleRecordingClick(recording.driveLink)}
                >
                  Ver Grabación
                </button>
                <button 
                  className="download-btn"
                  onClick={() => handleRecordingClick(recording.driveLink)}
                >
                  Abrir en Drive
                </button>
              </div>
              
              <div className="recording-details">
                <div className="detail-item">
                  <span className="detail-icon">📅</span>
                  <span className="detail-text">Clase del {formatDate(recording.date)}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">🎥</span>
                  <span className="detail-text">Disponible en Google Drive</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="recordings-info">
        <div className="info-card">
          <h4>💡 Información sobre las grabaciones</h4>
          <ul>
            <li>Las grabaciones están disponibles en Google Drive</li>
            <li>Puedes ver las clases las veces que necesites</li>
            <li>Algunas grabaciones pueden tener restricciones de acceso</li>
            <li>Si no puedes acceder a una grabación, contacta a tu profesor</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ClassRecording;