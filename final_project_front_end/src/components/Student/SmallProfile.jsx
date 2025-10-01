import React from "react";
import "../../styles/Student/ColorsStudent.css"
import "../../styles/Student/SmallProfile.css";

function SmallProfile({fotoPerfil,nombre,fechaRegistro,cpu}) {
  return (
    <div>
      <p className="perfilTitle"><strong> Perfil de Usuario</strong></p>
    <section className="perfil">
      <div className="perfilIMG">
        <img className="fotoPerfil" src={fotoPerfil || "https://img.a.transfermarkt.technology/portrait/big/8198-1748102259.jpg?lm=1"}/>
      </div>

      <div className="infoPerfil">
        <p><strong>Estudiante: </strong> {nombre || 'Cristiano Ronaldo Dos Santos Aveiro'}</p>
      <p><strong>Fecha Registro: </strong> {fechaRegistro || '2025/9/30'}</p>
      <p><strong>CPU: </strong> {cpu || 'CR70502'}</p>
      </div>
      
    </section>
    </div>
  );
}

export default SmallProfile;