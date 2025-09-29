import React from "react";
import RegisterFormStu from "../../components/Student/RegisterFormStu";
import "../../styles/Student/RegisterStudent.css";
import RegisterBack from "../../components/Student/RegisterBack";

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
