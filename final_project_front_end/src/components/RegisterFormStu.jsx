import React from "react";

function RegisterFormStu() {
  return (
    <form className="registerForm">
      <h2 className="formTitle">REGISTRO</h2>

      <div className="formGroup">
        <label>Nombre:</label>
        <input type="text" placeholder="Nombre" />
      </div>

      <div className="formGroup">
        <label>Apellidos:</label>
        <input type="text" placeholder="Apellidos" />
      </div>

      <div className="formGroup">
        <label>Cédula:</label>
        <input type="text" placeholder="Cédula" />
      </div>

      <div className="formGroup">
        <label>Correo electrónico:</label>
        <input type="email" placeholder="Correo electrónico" />
      </div>

      <div className="formGroup">
        <label>Teléfono:</label>
        <input type="text" placeholder="Teléfono" />
      </div>

      <div className="formGroup">
        <label>Provincia:</label>
        <input type="text" placeholder="Provincia" />
      </div>

      <div className="formGroup">
        <label>Cantón:</label>
        <input type="text" placeholder="Cantón" />
      </div>

      <div className="formGroup">
        <label>Fecha de nacimiento:</label>
        <input type="date" placeholder="Fecha de nacimiento" />
      </div>

      <div className="formGroup">
        <label>Distrito:</label>
        <input type="text" placeholder="Distrito" />
      </div>

      <div className="formGroup">
        <label>Género:</label>
        <input type="text" placeholder="Género" />
      </div>

      <div className="formGroup" style={{ gridColumn: "span 2" }}>
        <label>Dirección exacta:</label>
        <textarea placeholder="Dirección exacta"></textarea>
      </div>

      <div className="formGroup">
        <label>Sede:</label>
        <input type="text" placeholder="Sede" />
      </div>

      <div className="formGroup">
        <label>Año de inicio:</label>
        <input type="text" placeholder="Año de inicio" />
      </div>

      <div className="formGroup">
        <label>Nueva Contraseña:</label>
        <input type="password" placeholder="Nueva Contraseña" />
      </div>

      <div className="formGroup">
        <label>Confirmar contraseña:</label>
        <input type="password" placeholder="Confirmar contraseña" />
      </div>

      <div className="formButtonContainer">
        <button type="submit" className="formButton">
          COMPLETAR REGISTRO
        </button>
      </div>
    </form>
  );
}

export default RegisterFormStu;
