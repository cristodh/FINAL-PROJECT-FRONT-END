import React, { useState } from "react";
import Sidebar from "../../components/Student/SideBarHomeStu";
import Noticias from "../../components/Student/NewsStudent";
import Perfil from "../../components/Student/SmallProfile";
import TopPublicaciones from "../../components/Student/TopPost";
import HeaderStudent from "../../components/Student/HeaderStudent";
import FooterStudent from "../../components/Student/FooterStudent";
import "../../styles/Student/HomeStudent.css";

function HomeStudent() {
  const [datosEstudiante] = useState(
    JSON.parse(localStorage.getItem("estudianteRegistrado")) || {}
  );

  return (
    <div className="dashboard">
      {/* HEADER */}
      <HeaderStudent />

      {/* SIDEBAR */}
      <Sidebar />

      {/* CONTENIDO PRINCIPAL */}
      <main className="main-content">
        <div className="top-section">
          <section className="noticias-card">
            <h2>Noticias</h2>
            <Noticias />
          </section>

          <section className="perfil-card">
            <Perfil
              nombre={`${datosEstudiante.name || ""} ${
                datosEstudiante.lastName || ""
              }`}
              fechaRegistro={datosEstudiante.startDate}
            />
          </section>
        </div>

        <section className="posts-card">
          <h2>Top Publicaciones</h2>
          <TopPublicaciones />
        </section>
      </main>

      {/* FOOTER */}
      <FooterStudent />
    </div>
  );
}

export default HomeStudent;
