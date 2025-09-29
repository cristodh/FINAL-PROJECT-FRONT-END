import React from 'react'
import TeacherLoginForm from '../../components/Professor/TeacherLoginForm'
import TeacherLoginBackgroud from '../../components/Professor/TeacherLoginBackgroud'


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