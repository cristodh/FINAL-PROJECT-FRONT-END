import React, { useState, useRef } from 'react';
import { postData } from '../../services/fetchs.js';
import '../../styles/Student/MaterialUpload.css';

const MaterialUpload = ({ onClose, onUpload }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Mis Subidas',
    tags: '',
    isPublic: false,
    courseId: ''
  });
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  // Categorías permitidas para estudiantes
  const allowedCategories = [
    'Mis Subidas',
    'Trabajos Ejemplares'  // Solo si el trabajo es aprobado por el profesor
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileSelect = (file) => {
    if (file) {
      // Validar tipo de archivo
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'application/zip',
        'application/x-zip-compressed',
        'video/mp4',
        'video/avi',
        'image/jpeg',
        'image/png',
        'image/gif'
      ];

      if (!allowedTypes.includes(file.type)) {
        alert('Tipo de archivo no permitido. Solo se permiten: PDF, DOC, DOCX, PPT, PPTX, ZIP, MP4, JPG, PNG, GIF');
        return;
      }

      // Validar tamaño (máximo 50MB)
      if (file.size > 50 * 1024 * 1024) {
        alert('El archivo es demasiado grande. Tamaño máximo: 50MB');
        return;
      }

      setSelectedFile(file);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileSelect(files[0]);
    }
  };

  const getFileType = (file) => {
    const extension = file.name.split('.').pop().toLowerCase();
    const typeMap = {
      'pdf': 'pdf',
      'doc': 'docx',
      'docx': 'docx',
      'ppt': 'pptx',
      'pptx': 'pptx',
      'zip': 'zip',
      'rar': 'zip',
      'mp4': 'video',
      'avi': 'video',
      'mov': 'video',
      'jpg': 'image',
      'jpeg': 'image',
      'png': 'image',
      'gif': 'image'
    };
    return typeMap[extension] || 'document';
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedFile) {
      alert('Por favor selecciona un archivo');
      return;
    }

    if (!formData.title.trim()) {
      alert('Por favor ingresa un título');
      return;
    }

    if (!formData.description.trim()) {
      alert('Por favor ingresa una descripción');
      return;
    }

    try {
      setUploading(true);

      // Obtener datos del usuario desde localStorage
      const currentUser = JSON.parse(localStorage.getItem('studentData') || '{}');
      
      // Preparar datos del material
      const materialData = {
        id: `mat${Date.now()}`,
        title: formData.title.trim(),
        description: formData.description.trim(),
        fileName: selectedFile.name,
        fileType: getFileType(selectedFile),
        fileSize: formatFileSize(selectedFile.size),
        category: formData.category,
        courseId: formData.courseId.trim() || null,
        uploadedBy: currentUser.id || '0',
        uploaderName: `${currentUser.name || ''} ${currentUser.lastName || ''}`.trim() || 'Usuario Anónimo',
        uploadDate: new Date().toISOString(),
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        downloadCount: 0,
        isPublic: formData.isPublic
      };

      // Simular upload del archivo (en una implementación real, subirías el archivo al servidor)
      console.log('Uploading file:', selectedFile);
      console.log('Material data:', materialData);

      // Guardar en la base de datos
      await postData('materials', materialData);

      alert('Material subido exitosamente');
      onUpload();
    } catch (error) {
      console.error('Error uploading material:', error);
      alert('Error al subir el material. Inténtalo de nuevo.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="upload-modal-overlay">
      <div className="upload-modal">
        <div className="upload-header">
          <h2>📤 Subir Material</h2>
          <button 
            className="close-btn"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="upload-form">
          {/* Zona de arrastrar archivo */}
          <div 
            className={`file-drop-zone ${dragActive ? 'active' : ''} ${selectedFile ? 'has-file' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              onChange={(e) => handleFileSelect(e.target.files[0])}
              style={{ display: 'none' }}
              accept=".pdf,.doc,.docx,.ppt,.pptx,.zip,.rar,.mp4,.avi,.mov,.jpg,.jpeg,.png,.gif"
            />
            
            {selectedFile ? (
              <div className="selected-file">
                <div className="file-icon">📎</div>
                <div className="file-details">
                  <p className="file-name">{selectedFile.name}</p>
                  <p className="file-size">{formatFileSize(selectedFile.size)}</p>
                </div>
                <button 
                  type="button"
                  className="remove-file"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedFile(null);
                  }}
                >
                  🗑️
                </button>
              </div>
            ) : (
              <div className="drop-zone-content">
                <div className="upload-icon">📁</div>
                <p>Arrastra tu archivo aquí o <span className="click-text">haz clic para seleccionar</span></p>
                <p className="file-info">PDF, DOC, PPT, ZIP, MP4, JPG, PNG (Máx. 50MB)</p>
              </div>
            )}
          </div>

          {/* Información del material */}
          <div className="form-group">
            <label htmlFor="title">Título del Material *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Ej: Proyecto Final - Sistema de Inventario"
              required
              maxLength={100}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Descripción *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe brevemente el contenido del material..."
              required
              maxLength={500}
              rows="3"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Categoría</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
              >
                {allowedCategories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="courseId">Curso (Opcional)</label>
              <input
                type="text"
                id="courseId"
                name="courseId"
                value={formData.courseId}
                onChange={handleInputChange}
                placeholder="Ej: curso001"
                maxLength={20}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="tags">Etiquetas (separadas por comas)</label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              placeholder="Ej: java, proyecto, mysql, programación"
              maxLength={200}
            />
          </div>

          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="isPublic"
                checked={formData.isPublic}
                onChange={handleInputChange}
              />
              <span className="checkbox-text">
                📢 Hacer público (otros estudiantes podrán verlo)
              </span>
            </label>
          </div>

          {/* Botones de acción */}
          <div className="upload-actions">
            <button 
              type="button" 
              className="cancel-btn"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="submit-btn"
              disabled={uploading || !selectedFile}
            >
              {uploading ? '⏳ Subiendo...' : '📤 Subir Material'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MaterialUpload;