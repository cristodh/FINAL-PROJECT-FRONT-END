import React from "react";
import Sidebar from "../../components/Student/SideBarHomeStu";
import Noticias from "../../components/Student/NewsStudent";
import Perfil from "../../components/Student/SmallProfile";
import TopPublicaciones from "../../components/Student/TopPost";
import "../../styles/Student/HomeStudent.css";

function HomeStudent() {
  return (
    <div className="dashboard">
      <Sidebar />
      <main className="main-content">
        <div className="top-section">
          <Noticias />
          <Perfil />
        </div>
        <TopPublicaciones />
      </main>
    </div>
  );
}

export default HomeStudent;