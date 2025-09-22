import React from "react";
import RegisterFormStu from "../components/RegisterFormStu";
import "../styles/RegisterStudent.css";
import RegisterBackBlur from "../components/RegisterBackBlur";

function RegisterPage() {
  return (

     <div>
      <RegisterBackBlur/>
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

export default RegisterPage;
