import React from 'react'
import StudentLoginBackgroud from '../../components/Student/StudentLoginBackgroud'
import LoginForm from '../../components/Student/LoginForm'
function LoginStudent() {
  return (
    <div className='student-columns'>
      <div className='student-leftColumn'>
        <LoginForm/>
      </div>
      <div className='student-rightColumn'>
        <StudentLoginBackgroud />
      </div>
    </div>
  )
}

export default LoginStudent