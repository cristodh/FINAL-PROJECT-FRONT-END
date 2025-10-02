import React, { useState } from 'react'
import PersonIcon from '@mui/icons-material/Person';
import '../../styles/Professor/TeacherLoginForm.css'
import NoEncryptionGmailerrorredIcon from '@mui/icons-material/NoEncryptionGmailerrorred';
import LockIcon from '@mui/icons-material/Lock';

function TeacherLoginForm({ onLogin }) {
    const [emailProfessor, setEmailProfessor] = useState("")
    const [passwordProfessor, setPasswordProfessor] = useState("")
    const [showPass, setShowPass] = useState(false)

    function togglePass() {
        setShowPass(!showPass)
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (onLogin && emailProfessor.trim() && passwordProfessor.trim()) {
            onLogin(emailProfessor, passwordProfessor)
        } else {
            alert("Por favor complete todos los campos")
        }
    }



    return (
        <form onSubmit={handleSubmit}>
            <h1 className='loginTitle'>Entrá, aprendé y compartí: la tecnología crece con vos</h1>
            <p className='loginSubtitle'>INGRESÁ TU CORREO Y CONTRASEÑA</p>
            <div className='loginInputEmail'>
                <PersonIcon />
                <input 
                    type="text" 
                    value={emailProfessor}
                    onChange={(e) => setEmailProfessor(e.target.value)}
                    placeholder="Email del profesor"
                    required 
                />
            </div>
            <div className='loginInputPass'>
                {showPass === false ? 
                    <LockIcon onClick={togglePass} /> : 
                    <NoEncryptionGmailerrorredIcon onClick={togglePass} />
                }
                <input 
                    type={showPass === false ? "password" : "text"} 
                    value={passwordProfessor}
                    onChange={(e) => setPasswordProfessor(e.target.value)}
                    placeholder="Contraseña temporal"
                    required 
                />
            </div>

            <div>
                <button className="button-account-teacher" role="button" type="submit">
                    Iniciar sesión
                </button>
            </div>

            <div>
                <button 
                    type="button"
                    className="teacher-login-btn" 
                    onClick={() => window.location.href = '/'}
                >
                    INICIO DE SESIÓN COMO ESTUDIANTE
                </button>
            </div>
        </form>
    )
}

export default TeacherLoginForm