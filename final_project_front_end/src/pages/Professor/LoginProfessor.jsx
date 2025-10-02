import React from 'react'
import TeacherLoginForm from '../../components/Professor/TeacherLoginForm'
import TeacherLoginBackgroud from '../../components/Professor/TeacherLoginBackgroud'


function LoginProfessor() {
  return (
    <div className='professor-columns'>
      <div className='professor-leftColumn'>
        <TeacherLoginBackgroud />
      </div>
      <div className='professor-rightColumn'>
        <TeacherLoginForm/>
      </div>
    </div>
  )
}

export default LoginProfessor