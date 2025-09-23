import React from 'react'

function UpdateUserAdmin() {
  return (
    <div>
        <p>Selecciona una categoria</p>
        <select name="Categoria: " id="dbEndPoint" >
            <option value="professor">Profesor</option>
            <option value="student">Estudiante</option>
        </select>
    </div>
  )
}

export default UpdateUserAdmin