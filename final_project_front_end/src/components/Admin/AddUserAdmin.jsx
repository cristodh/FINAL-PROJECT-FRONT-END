import React, { useState } from 'react'
import { postData } from '../../services/fetchs'

function AddUserAdmin() {
  const [selectedRol, setSelectedRol] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userTempPass, setUserTempPass] = useState('')

  async function addUser() {
    // Validación antes de ejecutar
    if (!selectedRol || !userEmail.trim() || !userTempPass.trim()) {
      alert("Por favor, complete todos los campos requeridos antes de continuar.");
      return;
    }
    const userObj = {
      email: userEmail,
      tempPassword: userTempPass,
    }
    selectedRol === 'teachers' ? await postData(userObj, 'teachers') : await postData(userObj, 'students')

    Toastify({
      text: "✔️ Usuario Agregado",
      duration: 1500,
      newWindow: true,
      close: false,
      gravity: "top", // `top` or `bottom`
      position: "center", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "linear-gradient(to right, #1104a7ff, #c9423dff)",
      },
      onClick: function () { } // Callback after click
    }).showToast();

    setSelectedRol("");
    setUserEmail("");
    setUserTempPass("");
  }

  return (
    <div>
      <h2>Crear un usuario</h2>
      <label>Selecciona una categoria: </label>
      <select name="Categoria: " id="dbEndPoint" value={selectedRol} onChange={(e) => setSelectedRol(e.target.value)}>
        <option value="" disabled selected>Seleccione la categoría</option>
        <option value="teachers">Profesor</option>
        <option value="students">Estudiante</option>
      </select>

      <div>
        <label htmlFor="">Correo Electronico: </label>
        <input type="text" placeholder='Correo Electronico' value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
      </div>
      <div>
        <label htmlFor="">Contraseña Temporal: </label>
        <input type="text" placeholder='Contraseña Temporal' value={userTempPass} onChange={(e) => setUserTempPass(e.target.value)} />
      </div>
      <button onClick={addUser}>Agregar</button>


    </div>
  )
}

export default AddUserAdmin