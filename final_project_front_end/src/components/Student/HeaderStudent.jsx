import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Student/HomeStudent.css";

function HeaderStudent() {
  const navigate = useNavigate();

  function handleLogout(e) {
    e.preventDefault();
    localStorage.clear();
    navigate("/");
  }

  return (
    <header className="header">
      <h1 className="header-title" onClick={() => navigate("/student/home")}>
        OneConnect
      </h1>
      <nav className="nav-links">
        <a href="/home/student" className="nav-link">
          Inicio
        </a>
        <a href="/perfil" className="nav-link">
          Mi Perfil
        </a>
        <a href="#" className="nav-link" onClick={handleLogout}>
          Log Out
        </a>
      </nav>
    </header>
  );
}

export default HeaderStudent;
