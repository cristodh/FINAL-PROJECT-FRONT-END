import React from 'react'
import "../styles/AdminSidebar.css"

function AdminSidebar() {
    return (
        <div>
  <nav>
    <ul>
      <li>
        <div className="home-icon">
          <div className="roof">
            <div className="roof-edge" />
          </div>
          <div className="front" />
        </div>
      </li>
      <li>
        <div className="about-icon">
          <div className="head">
            <div className="eyes" />
            <div className="beard" />
          </div>
        </div>
      </li>
      <li>
        <div className="work-icon">
          <div className="paper" />
          <div className="lines" />
          <div className="lines" />
          <div className="lines" />
        </div>
      </li>
      <li>
        <div className="mail-icon">
          <div className="mail-base">
            <div className="mail-top" />
          </div>
        </div>
      </li>
    </ul>
  </nav>
  <section>
  
  </section>

        </div>
    )
}

export default AdminSidebar