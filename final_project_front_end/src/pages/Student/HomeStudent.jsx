import React, { useState } from "react";
import Sidebar from "../../components/Student/SideBarHomeStu";
import Noticias from "../../components/Student/NewsStudent";
import Perfil from "../../components/Student/SmallProfile";
import TopPublicaciones from "../../components/Student/TopPost";
import HeaderStudent from "../../components/Student/HeaderStudent";
import FooterStudent from "../../components/Student/FooterStudent";
import "../../styles/Student/HomeStudent.css";
import ModalPost from "../../components/Student/ModalPost";

function HomeStudent() {
const [isOpen, setIsOpen] = React.useState(false);
  function abrirModal() {
    setIsOpen(true);
  }
  function cerrarModal() {
    setIsOpen(false);
  }

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
            cpu={datosEstudiante.CPU}
              nombre={`${datosEstudiante.name || ""} ${
                datosEstudiante.lastName || ""
              }`}
              fechaRegistro={datosEstudiante.startDate}
              />
          </section>
              <button className="mt-3 w-50 btn btn-primary" onClick={abrirModal}>Añadir Publicación</button>
    {isOpen && (<ModalPost open={isOpen} onClose={cerrarModal} />)}
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
