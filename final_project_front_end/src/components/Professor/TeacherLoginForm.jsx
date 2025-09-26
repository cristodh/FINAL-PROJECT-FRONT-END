import React, { useState } from 'react'
import PersonIcon from '@mui/icons-material/Person';
import '../styles/TeacherLoginForm.css'
import NoEncryptionGmailerrorredIcon from '@mui/icons-material/NoEncryptionGmailerrorred';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';
import { getData } from '../../services/fetchs';

/*
    HACER ESTADOS PARA CADA UNO DE LOS INPUTS

    HACER UN EVENTO PARA CADA UNO DE LOS INPUTS (onChange)

    HACER UNA FUNCION ASINCRONA QUE GUARDE LOS USUARIOS

    HACER UN .find QUE COMPRUEBE SI EL USUARIO EXISTE EN EL BB.json
*/



function TeacherLoginForm() {
    const [emailProfessor, setEmailProfessor] = useState("")
    const [passwordProfessor, setPasswordProfessor] = useState("")
    const [showPass, setShowPass] = useState(false)
    const navigate = useNavigate()

    const togglePass = () => {
        setShowPass(!showPass)
    }
    async function verifyProfessor() {
        const professors = await getData("teachers");
        const newProfessorFound = teachers.find(
            (teachers) => teachers.email === emailProfessor &&
                teachers.tempPassword === passwordProfessor);

        const registerProfessorFound = teachers.find(
            (teachers) => teachers.email === emailProfessor &&
                teachers.password === passwordProfessor);


        newProfessorFound ? navigate("/registerNewProfessor") : registerProfessorFound ? navigate("/professors_home") : alert("Usuario o contraseña incorrectos")



    }



    return (
        <div>
            <h1 className='loginTitle'> Entrá, aprendé y compartí: la tecnología crece con vos</h1>
            <p className='loginSubtitle'>INGRESÁ TU CORREO Y CONTRASEÑA</p>
            <div className='loginInputEmail'>
                <PersonIcon />
                <input type="text" onChange={(e) => setEmailProfessor(e.target.value)} />
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
                <input type={showPass === false ? "password" : "text"} onChange={(e) => setPasswordProfessor(e.target.value)} />


            </div>

            <div>
                <button className="button-account-teacher" role="button" onClick={verifyProfessor}>Iniciar sesion</button>
            </div>

            <div>
                <button className="teacher-login-btn" onClick={() => navigate('/')}>
                    INICIO DE SESIÓN COMO ESTUDIANTE
                </button>
            </div>

        </div>
    )
}

export default TeacherLoginForm