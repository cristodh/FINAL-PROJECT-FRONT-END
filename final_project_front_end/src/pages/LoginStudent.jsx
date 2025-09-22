import React from 'react'
import LoginForm from '../components/LoginForm'
import LoginBackgroud from '../components/LoginBackgroud'
function LoginStudent() {
  return (
    <div className='columns'>
        <div className='leftColumn'>
          <LoginForm/>
          </div>
        <div className='rightColumn'>
          <LoginBackgroud/>
          </div>
    </div>
  )
}

export default LoginStudent