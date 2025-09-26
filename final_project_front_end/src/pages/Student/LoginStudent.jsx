import React from 'react'
import LoginForm from '../components/LoginForm'
import StudentLoginBackgroud from '../components/StudentLoginBackgroud'
function LoginStudent() {
  return (
    <div className='columns'>
      <div className='leftColumn'>
        <LoginForm />
      </div>
      <div className='rightColumn'>
        <StudentLoginBackgroud />
      </div>
    </div>
  )
}

export default LoginStudent