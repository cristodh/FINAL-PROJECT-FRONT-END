import React from 'react'

const PrivateRoute = ({children}) => {
    const hayRegistro = JSON.parse(localStorage.getItem("estudianteRegistrado"))

    function validaRegistro() {
        if(hayRegistro){
            return true
        }
        return false
    }
  return (
    validaRegistro() ? children : <h1>USUARIO NO IDENTIFICADO</h1>
  )
}

export default PrivateRoute