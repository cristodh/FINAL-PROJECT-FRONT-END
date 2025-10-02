import React, { useState, useEffect } from 'react';
import { getData } from '../../services/fetchs.js';
import MaterialCard from '../../components/Student/MaterialCard.jsx';
import MaterialUpload from '../../components/Student/MaterialUpload.jsx';
import HeaderStudent from '../../components/Student/HeaderStudent.jsx';
import '../../styles/Student/StudentMaterials.css';

const StudentMaterials = () => {
  const [materials, setMaterials] = useState([]);
  const [filteredMaterials, setFilteredMaterials] = useState([]);
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [showUpload, setShowUpload] = useState(false);

  // Categorías de materiales
  const categories = [
    { key: 'Todos', label: 'Todos los Materiales', count: 0 },
    { key: 'Documentos del Profesor', label: 'Documentos del Profesor', count: 0 },
    { key: 'Trabajos Ejemplares', label: 'Trabajos Ejemplares', count: 0 },
    { key: 'Mis Subidas', label: 'Mis Subidas', count: 0 }
  ];

  useEffect(() => {
    loadMaterials();
  }, []);

  const loadMaterials = async () => {
    try {
      setLoading(true);
      const materialsData = await getData('materials');
      setMaterials(materialsData);
      setFilteredMaterials(materialsData);
    } catch (error) {
      console.error('Error loading materials:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filtrar materiales por categoría y búsqueda
  useEffect(() => {
    let filtered = materials;

    // Filtrar por categoría
    if (activeCategory !== 'Todos') {
      filtered = filtered.filter(material => material.category === activeCategory);
    }

    // Filtrar por término de búsqueda
    if (searchTerm.trim()) {
      filtered = filtered.filter(material =>
        material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        material.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        material.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredMaterials(filtered);
  }, [materials, activeCategory, searchTerm]);

  // Contar materiales por categoría
  const getCategoryCount = (category) => {
    if (category === 'Todos') return materials.length;
    return materials.filter(material => material.category === category).length;
  };

  const handleMaterialUploaded = () => {
    loadMaterials();
    setShowUpload(false);
  };

  if (loading) {
    return (
      <div className="materials-container">
        <div className="loading-materials">
          <div className="loading-spinner"></div>
          <p>Cargando materiales...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="materials-container">
      {/* Global student header */}
      <HeaderStudent />

      {/* Header */}
      <div className="materials-header materials-page-header">
        <h1>📚 Materiales de Estudio</h1>
        <p>Accede a documentos del profesor, trabajos ejemplares y gestiona tus propias subidas</p>
        
        <button 
          className="upload-btn"
          onClick={() => setShowUpload(true)}
        >
          📤 Subir Material
        </button>
      </div>

      {/* Barra de búsqueda */}
      <div className="search-section">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar por título, descripción o etiquetas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <div className="search-icon">🔍</div>
        </div>
      </div>

      {/* Filtros de categoría */}
      <div className="category-filters">
        {categories.map(category => (
          <button
            key={category.key}
            className={`category-btn ${activeCategory === category.key ? 'active' : ''}`}
            onClick={() => setActiveCategory(category.key)}
          >
            {category.label}
            <span className="category-count">
              ({getCategoryCount(category.key)})
            </span>
          </button>
        ))}
      </div>

      {/* Información de resultados */}
      <div className="results-info">
        <p>
          Mostrando {filteredMaterials.length} 
          {activeCategory !== 'Todos' ? ` de ${activeCategory.toLowerCase()}` : ' materiales'}
          {searchTerm && ` para "${searchTerm}"`}
        </p>
      </div>

      {/* Grid de materiales */}
      <div className="materials-grid">
        {filteredMaterials.length === 0 ? (
          <div className="no-materials">
            <div className="no-materials-icon">📭</div>
            <h3>No se encontraron materiales</h3>
            <p>
              {searchTerm 
                ? 'Intenta con otros términos de búsqueda'
                : 'No hay materiales disponibles en esta categoría'
              }
            </p>
          </div>
        ) : (
          filteredMaterials.map(material => (
            <MaterialCard 
              key={material.id} 
              material={material}
              onUpdate={loadMaterials}
            />
          ))
        )}
      </div>

      {/* Modal de subida */}
      {showUpload && (
        <MaterialUpload 
          onClose={() => setShowUpload(false)}
          onUpload={handleMaterialUploaded}
        />
      )}
    </div>
  );
};

export default StudentMaterials;