import React, { useState } from 'react'
import PersonIcon from '@mui/icons-material/Person';
// import '../../styles/Student/StudentLoginForm.css'
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
        const admins = await getData("admins");
        const newStudentFound = students.find(
            (students) => students.email === emailStudent &&
                students.tempPassword === passwordStudent);

        const registerStudentFound = students.find(
            (students) => students.email === emailStudent &&
                students.password === passwordStudent);
        console.log(students.id);

        const adminFound = admins.find(
            (admins) => admins.email === emailStudent &&
                admins.password === passwordStudent);
           
        if (adminFound) {
            localStorage.setItem('admin', JSON.stringify(adminFound))
            navigate("/admin/create_modif_admin")
            return
        }
        // const adminRegister = s
        if (newStudentFound) {
            localStorage.setItem('estudianteNuevo', JSON.stringify(newStudentFound))
            navigate("/registerNewStudent")
            return
        }
        if (registerStudentFound) {
            localStorage.setItem('estudianteRegistrado', JSON.stringify(registerStudentFound))
            navigate("/student/home")
            return
        }




    }



    return (
        <div className='loginFormStu'>
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

                <input type={showPass === false ? "password" : "text"} onChange={(e) => setPasswordStudent(e.target.value)} />


            </div>
            <div><button className="button-account-student" role="button" onClick={verifyStudent}>INICIAR SESIÓN</button></div>
            <div><button className="student-login-btn" onClick={() => navigate('/LoginProfessor')}>
                INICIO DE SESIÓN COMO DOCENTE
            </button>
            </div>


        </div>
    )
}

export default LoginForm




/* El if ternario
condicion ? si_es_verdaderdo : si_es_falso

Es un if else en la misma instrucción
*/