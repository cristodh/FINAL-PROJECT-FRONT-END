import React from "react";
import { getData, patchData } from "../services/fetchs.js";
import { useState } from "react";

function RegisterFormStu() {

  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    provincia: "",
    canton: "",
    distrito: "",
    direccion: "",
    password: "",
    confirmPassword: "",
    cedula: "",
    telefono: "",
    nacimiento: "",
    genero: "",
    sede: "",
    inicio: "",
  });


  async function registerStudent() {
    if (formData.nombre.trim() === "" || formData.apellidos.trim() === "" || formData.email.trim() === "" ||
      formData.provincia.trim() === "" || formData.canton.trim() === "" || formData.distrito.trim() === "" ||
      formData.direccion.trim() === "" || formData.password.trim() === "" || formData.confirmPassword.trim() === "" || formData.cedula.trim() === "" ||
      formData.telefono.trim() === "" || formData.nacimiento.trim() === "" || formData.genero.trim() === "" || formData.sede.trim() === "" || formData.inicio.trim() === "") {
      alert("Por favor, complete todos los campos.");
      return;
    }
    const studentObj = {
      'name': formData.nombre,
      'lastName': formData.apellidos,
      'email': formData.email,
      'province': formData.provincia,
      'canton': formData.canton,
      'distrit': formData.distrito,
      'address': formData.direccion,
      'password': formData.password,
      'confirmPassword': formData.confirmPassword,
      'studentID': formData.cedula,
      'phone': formData.telefono,
      'dob': formData.nacimiento,
      'gender': formData.genero,
      'location': formData.sede,
      'startDate': formData.inicio,
      'registerState': "pendingForAprv"
    }
    await patchData("students", studentObj, '0');

    setFormData({
      nombre: "",
      apellidos: "",
      email: "",
      provincia: "",
      canton: "",
      distrito: "",
      direccion: "",
      password: "",
      confirmPassword: "",
      cedula: "",
      telefono: "",
      nacimiento: "",
      genero: "",
      sede: "",
      inicio: ""
    });
  }



  return (
    <form className="registerForm">
      <h2 className="formTitle">REGISTRO</h2>

      <div>
        {/* Columna Izquierda */}
        <div className="cont-fila">
          <div className="formGroup">
            <label>Nombre:</label>
            <input
              type="text"
              placeholder="Nombre"
              value={formData.nombre}
              onChange={(e) =>
                setFormData({ ...formData, nombre: e.target.value })
              }
            />
          </div>

          <div className="formGroup">
            <label>Apellidos:</label>
            <input
              type="text"
              placeholder="Apellidos"
              value={formData.apellidos}
              onChange={(e) =>
                setFormData({ ...formData, apellidos: e.target.value })
              }
            />
          </div>
        </div>

        <div className="formGroup">
          <label>Correo electrónico:</label>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            disabled
          />
        </div>

        <div className="cont-fila">
          <div className="formGroup">
            <label>Provincia:</label>
            <input
              type="text"
              placeholder="Provincia"
              value={formData.provincia}
              onChange={(e) =>
                setFormData({ ...formData, provincia: e.target.value })
              }
            />
          </div>

          <div className="formGroup">
            <label>Cantón:</label>
            <input
              type="text"
              placeholder="Cantón"
              value={formData.canton}
              onChange={(e) =>
                setFormData({ ...formData, canton: e.target.value })
              }
            />
          </div>
        </div>

        <div className="formGroup">
          <label>Distrito:</label>
          <input
            type="text"
            placeholder="Distrito"
            className="distrito-input"
            value={formData.distrito}
            onChange={(e) =>
              setFormData({ ...formData, distrito: e.target.value })
            }
          />
        </div>

        <div className="formGroup">
          <label>Dirección exacta:</label>
          <textarea
            placeholder="Dirección exacta"
            className="direcc-textArea"
            value={formData.direccion}
            onChange={(e) =>
              setFormData({ ...formData, direccion: e.target.value })
            }
          ></textarea>
        </div>

        <div className="formGroup">
          <label>Nueva Contraseña:</label>
          <input
            type="password"
            placeholder="Nueva Contraseña"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>
      </div>

      <div>
        {/* Columna Derecha */}
        <div className="formGroup">
          <label>Cédula:</label>
          <input
            type="text"
            placeholder="Cédula"
            value={formData.cedula}
            onChange={(e) =>
              setFormData({ ...formData, cedula: e.target.value })
            }
          />
        </div>
        <div className="formGroup">
          <label>Teléfono:</label>
          <input
            type="text"
            placeholder="Teléfono"
            value={formData.telefono}
            onChange={(e) =>
              setFormData({ ...formData, telefono: e.target.value })
            }
          />
        </div>
        <div className="formGroup">
          <label>Fecha de nacimiento:</label>
          <input
            type="date"
            placeholder="Fecha de nacimiento"
            value={formData.nacimiento}
            onChange={(e) =>
              setFormData({ ...formData, nacimiento: e.target.value })
            }
          />
        </div>
        <div className="formGroup">
          <label>Género:</label>
          <input
            type="text"
            placeholder="Género"
            value={formData.genero}
            onChange={(e) =>
              setFormData({ ...formData, genero: e.target.value })
            }
          />
        </div>
        <div className="formGroup">
          <label>Sede:</label>
          <input
            type="text"
            placeholder="Sede"
            value={formData.sede}
            onChange={(e) =>
              setFormData({ ...formData, sede: e.target.value })
            }
          />
        </div>
        <div className="formGroup">
          <label>Año de inicio:</label>
          <input
            type="text"
            placeholder="Año de inicio"
            value={formData.inicio}
            onChange={(e) =>
              setFormData({ ...formData, inicio: e.target.value })
            }
          />
        </div>
        <div className="formGroup">
          <label>Confirmar contraseña:</label>
          <input
            type="password"
            placeholder="Confirmar contraseña"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
          />
        </div>
      </div>

      <div className="formButtonContainer">
        <button
          type="submit"
          className="formButton"
          onClick={(e) => {
            e.preventDefault();
            registerStudent();
          }}
        >
          COMPLETAR REGISTRO
        </button>
      </div>
    </form>
  );
}

export default RegisterFormStu;
