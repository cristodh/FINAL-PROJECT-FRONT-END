import React from 'react'
import StudentLoginBackgroud from '../../components/Student/StudentLoginBackgroud'
import LoginForm from '../../components/Student/LoginForm'
function LoginStudent() {
  return (
    <div className='columns'>
      <div className='leftColumn'>
        <LoginForm/>
      </div>
      <div className='rightColumn'>
        <StudentLoginBackgroud />
      </div>
    </div>
  )
}

export default LoginStudent