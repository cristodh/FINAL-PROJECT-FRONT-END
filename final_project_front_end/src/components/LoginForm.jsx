import React, { useState } from 'react'
import PersonIcon from '@mui/icons-material/Person';
import '../styles/LoginForm.css'
import NoEncryptionGmailerrorredIcon from '@mui/icons-material/NoEncryptionGmailerrorred';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';
import { getData } from '../services/fetchs';

/*
    HACER ESTADOS PARA CADA UNO DE LOS INPUTS

    HACER UN EVENTO PARA CADA UNO DE LOS INPUTS (onChange)

    HACER UNA FUNCION ASINCRONA QUE GUARDE LOS USUARIOS

    HACER UN .find QUE COMPRUEBE SI EL USUARIO EXISTE EN EL BB.json
*/



function LoginForm() {
    const [emailStudent, setEmailStudent] = useState("")
    const [passwordStudent, setPasswordStudent] = useState("")
    const [showPass, setShowPass] = useState(false)
    const navigate = useNavigate()

    const togglePass = () => {
        setShowPass(!showPass)
    }
    async function verifyStudent() {
        const students = await getData("students");
        const newStudentFound = students.find(
            (students) => students.email === emailStudent &&
                students.tempPassword === passwordStudent);

        const registerStudentFound = students.find(
            (students) => students.email === emailStudent &&
                students.password === passwordStudent);


        newStudentFound ? navigate("/registerNewStudent") : registerStudentFound ? navigate("/student_home") : alert("Usuario o contraseña incorrectos")   
        


    }



    return (
        <div>
            <h1 className='loginTitle'> Entrá, descubrí y formá parte de esta aventura</h1>
            <p className='loginSubtitle'>INGRESÁ TU CORREO Y CONTRASEÑA</p>
            <div className='loginInputEmail'>
                <PersonIcon />
                <input type="text" onChange={(e) => setEmailStudent(e.target.value)} />
            </div>
            <div className='loginInputPass'>
                {showPass === false ? <LockIcon onClick={() => {
                    togglePass()
                }} /> : <NoEncryptionGmailerrorredIcon onClick={() => {
                    togglePass()
                }} />}

                {/* El if ternario
                condicion ? si_es_verdaderdo : se_es_falso
                
                Es un if else en la misma instrucción
                */}
                <input type={showPass === false ? "password" : "text"} onChange={(e) => setPasswordStudent(e.target.value)} />


            </div>
            <button onClick={verifyStudent}>Iniciar sesion</button>
            <button className="teacher-login-btn" onClick={() => navigate('/professor')}>
                INICIO DE SESIÓN COMO DOCENTE
            </button>

        </div>
    )
}

export default LoginForm