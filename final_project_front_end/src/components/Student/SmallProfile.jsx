import React from "react";
import "../../styles/Student/ColorsStudent.css"
import "../../styles/Student/SmallProfile.css";

function SmallProfile({fotoPerfil,nombre,fechaRegistro,cpu}) {
  return (
    <section className="perfil">
      <h2>PERFIL</h2>
      <div className="fotoPerfil">
        <img src={fotoPerfil || "https://img.a.transfermarkt.technology/portrait/big/8198-1748102259.jpg?lm=1"}/>
      </div>
      <p>Estudiante: {nombre || 'Cristiano Ronaldo Dos Santos Aveiro'}</p>
      <p>Fecha Registro: {fechaRegistro || '2025/9/30'}</p>
      <p>CPU: {cpu || 'CR70502'}</p>
    </section>
  );
}

export default SmallProfile;