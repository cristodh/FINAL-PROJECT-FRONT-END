import { useEffect, useState } from "react"
import React from 'react'
import { getData } from "../../services/fetchs"

function CPURequestForm() {
    const [infoStudent, setInfoStudent] = useState(JSON.parse(localStorage.getItem('estudianteRegistrado')))
    console.log(infoStudent);
    return (

        <div>
            <form action="">
                <div className="contenedorGeneral">
                    <h2>Formulario de Solicitud de Permiso</h2>
                    <div className="infoPersonal">
                        <label>Nombre completo</label>
                        <input type="text" value={infoStudent.name + " " + infoStudent.lastName} disabled />
                        <br />
                        <label htmlFor="numeroCe">Número de cédula</label>
                        <input
                            type="text"
                            name="numeCe"
                            id="numeCe"
                            value={infoStudent.studentID || "No hay # de cédula"}
                             />
                        <br />
                        <label htmlFor="correo">Correo Electrónico</label>
                        <input type="email" defaultValue="Solo lectura" readOnly="" />
                        <br />
                        <label htmlFor="sede">Sede</label>
                        <input type="text" placeholder="Sede actual" />
                        <br />
                        <label htmlFor="fechaS">Fecha de Salida</label>
                        <input type="date" name="fechaSa" />
                        <br />
                        <label htmlFor="fechaE">Fecha de entrega</label>
                        <input type="date" name="fechaEn" />
                        <br />
                        <label htmlFor="Nombre">Computadora Asignada</label>
                        <input
                            type="text"
                            id="cpuAsignada"
                            defaultValue="Solo lectura"
                            readOnly=""
                        />
                        <br />
                        <a
                            href="../docs/Terminos_y_Condiciones_Equipos_Legal.pdf"
                            target="_blank"
                        >
                            Ver Terminos y Condiciones
                        </a>
                        <div className="checkContenedor">
                            <label htmlFor="acepto" >
                                <input type="checkbox" name="terminosCond" />
                                Acepto los términos y condiciones
                            </label>
                        </div>
                        <p />
                        <button>enviar</button>
                        <br />
                    </div>
                </div>
            </form>

        </div>
    )
}

export default CPURequestForm