import { useState } from "react";
import React from 'react';
import Tooltip from "@mui/material/Tooltip";
import PdfModal from "../../components/Student/ModalPDFTerms";
import "../../styles/Student/CPURequestForm.css";
import Toastify from 'toastify-js';
import { postData } from "../../services/fetchs";

function CPURequestForm() {
  const [infoStudent, setInfoStudent] = useState(
    JSON.parse(localStorage.getItem('estudianteRegistrado'))
  );

  const [openPdf, setOpenPdf] = useState(false);

  const [cpuRequest, setCpuRequest] = useState({
    Name: '',
    studentID: '',
    email: '',
    location: '',
    CPU: '',
    startDate: "",
    endDate: "",
    termsAccepted: false,
  });

  async function cpuForm() {
    if (cpuRequest.startDate.trim() === "" ||
      cpuRequest.endDate.trim() === "" ||
      !cpuRequest.termsAccepted) {
      Toastify({
        text: "Por favor, complete todos los campos y acepte los términos.",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function () { } // Callback after click
      }).showToast()
      return;
    }
    const cpuRequestObj = {
      'Name': infoStudent.name + " " + infoStudent.lastName,
      'studentID': infoStudent.studentID,
      'email': infoStudent.email,
      'location': infoStudent.location,
      'CPU': infoStudent.CPU,
      'startDate': cpuRequest.startDate,
      'endDate': cpuRequest.endDate,
      'termsAccepted': cpuRequest.termsAccepted,
      'requestState': "pendingForAprv"
    }

      try {
        await postData( cpuRequestObj,"cpurequests" );
      } catch (error) {
        console.error(error);
      }
      
      
  }
  return (
    <div>
      <form>
        <div className="contenedorGeneral">
          <h2>Formulario de Solicitud de Permiso</h2>

          <div className="infoPersonal">
            <label>Nombre completo: </label>
            <input type="text"
              value={infoStudent.name + " " + infoStudent.lastName || "No hay nombre registrado"}
              disabled />
            <br />

            <label>Número de cédula: </label>
            <input
              type="text"
              value={infoStudent.studentID || "No hay numero de cédula"}
              disabled
            />
            <br />

            <label>Correo Electrónico: </label>
            <input type="email"
              value={infoStudent.email || "No hay correo registrado"}
              disabled
            />
            <br />

            <label>Sede</label>
            <input type="text"
              value={infoStudent.location || "No hay sede registrada"}
              disabled
            />
            <br />

            <label>Fecha de salida del equipo: </label>
            <input type="date"
              onChange={(e) => setCpuRequest({ ...cpuRequest, startDate: e.target.value })}
            />
            <br />

            <label>Fecha de entrega del equipo: </label>
            <input type="date"
              onChange={(e) => setCpuRequest({ ...cpuRequest, endDate: e.target.value })}
            />
            <br />

            <label>Computadora Asignada: </label>
            <input
              type="text"
              value={infoStudent.CPU || "No hay computadora asignada"}
              disabled
            />
            <br />

            <Tooltip title="Click para ver el documento" placement="right">
              <p
                className="linkPdf"
                onClick={() => setOpenPdf(true)}
              >
                Ver Términos y Condiciones
              </p>
            </Tooltip>

            <div className="checkContenedor">
              <label> Acepto los términos y condiciones</label>
              <input type="checkbox" 
                onChange={(e) => setCpuRequest({ ...cpuRequest, termsAccepted: e.target.checked })}
              />
            </div>

            <button type="button" onClick={() => { cpuForm() }}>Enviar</button>
          </div>
        </div>
      </form>

      {/* Modal PDF */}
      <PdfModal
        pdfUrl="../src/docs/Terminos_y_Condiciones_Equipos_Legal.pdf"
        isOpen={openPdf}
        onClose={() => setOpenPdf(false)}
      />
    </div>
  )
}

export default CPURequestForm;
