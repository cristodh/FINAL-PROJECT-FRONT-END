import React, { useState, useEffect, useRef } from 'react';
import { getData, patchData } from '../../services/fetchs.js';
import { useNavigate } from 'react-router-dom';
import '../../styles/Student/EditProfile.css';

const EditProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [previewPhoto, setPreviewPhoto] = useState(null);
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "", // Solo lectura
    province: "",
    canton: "",
    distrit: "",
    address: "",
    phone: "",
    dob: "", // Solo lectura
    gender: "", // Solo lectura
    location: "",
    studentID: "", // Solo lectura
    CPU: "", // Solo lectura
    serialPC: "" // Solo lectura
  });

  // Campos que no se pueden editar
  const readOnlyFields = ['email', 'dob', 'gender', 'studentID', 'CPU', 'serialPC'];

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      setLoading(true);
      const currentUser = JSON.parse(localStorage.getItem('studentData') || '{}');
      
      if (currentUser.id) {
        // Cargar datos actuales del usuario desde la base de datos
        const students = await getData('students');
        const userData = students.find(student => student.id === currentUser.id);
        
        if (userData) {
          setFormData({
            name: userData.name || "",
            lastName: userData.lastName || "",
            email: userData.email || "",
            province: userData.province || "",
            canton: userData.canton || "",
            distrit: userData.distrit || "",
            address: userData.address || "",
            phone: userData.phone || "",
            dob: userData.dob || "",
            gender: userData.gender || "",
            location: userData.location || "",
            studentID: userData.studentID || "",
            CPU: userData.CPU || "",
            serialPC: userData.serialPC || ""
          });
          
          // Cargar foto de perfil si existe
          if (userData.profilePhoto) {
            setPreviewPhoto(userData.profilePhoto);
          }
        }
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      alert('Error al cargar los datos del usuario');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Verificar si el campo es de solo lectura
    if (readOnlyFields.includes(name)) {
      return; // No permitir cambios en campos de solo lectura
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validar tipo de archivo
      if (!file.type.startsWith('image/')) {
        alert('Por favor selecciona una imagen válida');
        return;
      }
      
      // Validar tamaño (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('La imagen es demasiado grande. Tamaño máximo: 5MB');
        return;
      }
      
      setProfilePhoto(file);
      
      // Crear preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewPhoto(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar campos obligatorios
    const requiredFields = ['name', 'lastName', 'province', 'canton', 'distrit', 'address', 'phone', 'location'];
    const emptyFields = requiredFields.filter(field => !formData[field].trim());
    
    if (emptyFields.length > 0) {
      alert('Por favor complete todos los campos obligatorios');
      return;
    }
    
    try {
      setSaving(true);
      const currentUser = JSON.parse(localStorage.getItem('studentData') || '{}');
      
      // Preparar datos para actualizar
      const updateData = {
        ...formData,
        // Incluir foto si se seleccionó una nueva
        ...(profilePhoto && { profilePhoto: previewPhoto })
      };
      
      // Actualizar en la base de datos
      await patchData('students', currentUser.id, updateData);
      
      // Actualizar localStorage
      const updatedUserData = { ...currentUser, ...updateData };
      localStorage.setItem('studentData', JSON.stringify(updatedUserData));
      
      alert('Perfil actualizado exitosamente');
      navigate('/student/home');
      
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error al actualizar el perfil. Inténtalo de nuevo.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="edit-profile-container">
        <div className="loading-profile">
          <div className="loading-spinner"></div>
          <p>Cargando perfil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="edit-profile-container">
      <div className="edit-profile-card">
        {/* Header */}
        <div className="profile-header">
          <button 
            className="profile-back-btn"
            onClick={() => navigate('/student/home')}
          >
            ← Volver al Inicio
          </button>
          <h1>✏️ Editar Perfil</h1>
          <p>Actualiza tu información personal</p>
        </div>

        <form onSubmit={handleSubmit} className="edit-profile-form">
          {/* Foto de perfil */}
          <div className="photo-section">
            <div className="photo-container">
              <div className="photo-preview">
                {previewPhoto ? (
                  <img src={previewPhoto} alt="Vista previa" className="profile-image" />
                ) : (
                  <div className="no-photo">
                    <span className="photo-icon">👤</span>
                    <p>Sin foto</p>
                  </div>
                )}
              </div>
              <button 
                type="button"
                className="change-photo-btn"
                onClick={() => fileInputRef.current?.click()}
              >
                📷 Cambiar Foto
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                style={{ display: 'none' }}
              />
            </div>
          </div>

          {/* Información personal */}
          <div className="form-section">
            <h3>📋 Información Personal</h3>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="name">Nombre *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  maxLength={50}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="lastName">Apellidos *</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  maxLength={50}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Teléfono *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  maxLength={15}
                />
              </div>
              
              <div className="form-group readonly">
                <label htmlFor="email">Correo Electrónico</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  readOnly
                  className="readonly-field"
                />
                <span className="readonly-note">Este campo no se puede editar</span>
              </div>
            </div>
          </div>

          {/* Información académica */}
          <div className="form-section">
            <h3>🎓 Información Académica</h3>
            <div className="form-grid">
              <div className="form-group readonly">
                <label htmlFor="studentID">Número de Estudiante</label>
                <input
                  type="text"
                  id="studentID"
                  name="studentID"
                  value={formData.studentID}
                  readOnly
                  className="readonly-field"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="location">Sede *</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  maxLength={50}
                />
              </div>
              
              <div className="form-group readonly">
                <label htmlFor="CPU">CPU Asignado</label>
                <input
                  type="text"
                  id="CPU"
                  name="CPU"
                  value={formData.CPU}
                  readOnly
                  className="readonly-field"
                />
              </div>
              
              <div className="form-group readonly">
                <label htmlFor="serialPC">Serial PC</label>
                <input
                  type="text"
                  id="serialPC"
                  name="serialPC"
                  value={formData.serialPC}
                  readOnly
                  className="readonly-field"
                />
              </div>
            </div>
          </div>

          {/* Información de ubicación */}
          <div className="form-section">
            <h3>📍 Información de Ubicación</h3>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="province">Provincia *</label>
                <input
                  type="text"
                  id="province"
                  name="province"
                  value={formData.province}
                  onChange={handleInputChange}
                  required
                  maxLength={50}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="canton">Cantón *</label>
                <input
                  type="text"
                  id="canton"
                  name="canton"
                  value={formData.canton}
                  onChange={handleInputChange}
                  required
                  maxLength={50}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="distrit">Distrito *</label>
                <input
                  type="text"
                  id="distrit"
                  name="distrit"
                  value={formData.distrit}
                  onChange={handleInputChange}
                  required
                  maxLength={50}
                />
              </div>
              
              <div className="form-group full-width">
                <label htmlFor="address">Dirección Exacta *</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  maxLength={200}
                  rows="3"
                  placeholder="Ingresa tu dirección completa..."
                />
              </div>
            </div>
          </div>

          {/* Información personal adicional */}
          <div className="form-section">
            <h3>👤 Información Personal</h3>
            <div className="form-grid">
              <div className="form-group readonly">
                <label htmlFor="dob">Fecha de Nacimiento</label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={formData.dob}
                  readOnly
                  className="readonly-field"
                />
                <span className="readonly-note">Este campo no se puede editar</span>
              </div>
              
              <div className="form-group readonly">
                <label htmlFor="gender">Género</label>
                <input
                  type="text"
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  readOnly
                  className="readonly-field"
                />
                <span className="readonly-note">Este campo no se puede editar</span>
              </div>
            </div>
          </div>

          {/* Botones */}
          <div className="form-actions">
            <button 
              type="button"
              className="cancel-btn"
              onClick={() => navigate('/student/home')}
            >
              Cancelar
            </button>
            <button 
              type="submit"
              className="save-btn"
              disabled={saving}
            >
              {saving ? '⏳ Guardando...' : '💾 Guardar Cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;