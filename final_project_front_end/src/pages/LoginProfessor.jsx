import React from 'react'
import TeacherLoginForm from '../components/TeacherLoginForm'
import TeacherLoginBackgroud from '../components/TeacherLoginBackgroud'


function LoginProfessor() {
  return (
    <div className='columns'>
      <div className='leftColumn'>
        <TeacherLoginBackgroud />
      </div>
      <div className='rightColumn'>
        <TeacherLoginForm/>
      </div>
    </div>
  )
}

export default LoginProfessor