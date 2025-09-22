import React, { useState } from 'react'
import PersonIcon from '@mui/icons-material/Person';
import '../styles/LoginForm.css'
import NoEncryptionGmailerrorredIcon from '@mui/icons-material/NoEncryptionGmailerrorred';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';
function LoginForm() {
    const [showPass, setShowPass] = useState(false)
    const navigate = useNavigate()

    const togglePass = () => {
        setShowPass(!showPass)
    }


    return (
        <div>
            <h1 className='loginTitle'> Entrá, descubrí y formá parte de esta aventura</h1>
            <p className='loginSubtitle'>INGRESÁ TU CORREO Y CONTRASEÑA</p>
            <div className='loginInputEmail'>
                <PersonIcon />
                <input type="text" />
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
                <input type={showPass === false ? "password" : "text"} />

                
            </div>
            <button className="teacher-login-btn" onClick={()=>navigate('/professor')}>
                    INICIO DE SESIÓN DEL DOCENTE
                </button>

        </div>
    )
}

export default LoginForm