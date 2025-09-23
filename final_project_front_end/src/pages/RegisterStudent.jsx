import React from "react";
import RegisterFormStu from "../components/RegisterFormStu";
import "../styles/RegisterStudent.css";
import RegisterBack from "../components/RegisterBack";

function RegisterStudent() {
  return (

    <div>
      <RegisterBack/>
      <div className="registerContainer">
        <div className="registerLeft">
        
        </div>
        <div className="registerRight">
          <RegisterFormStu />
        </div>
      </div>
    </div>
  );
}

export default RegisterStudent;
