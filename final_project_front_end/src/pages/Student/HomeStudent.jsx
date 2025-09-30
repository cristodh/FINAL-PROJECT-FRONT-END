import React, { useState } from "react";
import Sidebar from "../../components/Student/SideBarHomeStu";
import Noticias from "../../components/Student/NewsStudent";
import Perfil from "../../components/Student/SmallProfile";
import TopPublicaciones from "../../components/Student/TopPost";
import "../../styles/Student/HomeStudent.css";

function HomeStudent() {
  const [datosEstudiante,setDatosEstudiante] = useState(JSON.parse(localStorage.getItem("estudianteRegistrado")) || [])
  return (
    <div className="dashboard">
      <Sidebar />
      <main className="main-content">
        <div className="top-section">
          <Noticias />
          <Perfil nombre={datosEstudiante.name + ' ' + datosEstudiante.lastName} fechaRegistro={datosEstudiante.startDate} />
        </div>
        <TopPublicaciones />
      </main>
    </div>
  );
}

export default HomeStudent;