import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ProfessorNavbar from '../../components/Professor/ProfessorNavbar'
import ProfessorSidebar from '../../components/Professor/ProfessorSidebar'
import BarChartIcon from '@mui/icons-material/BarChart'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import PieChartIcon from '@mui/icons-material/PieChart'
import TimelineIcon from '@mui/icons-material/Timeline'
import '../../styles/Professor/ProfessorTheme.css'

function ProfessorStatistics() {
  const navigate = useNavigate()
  const [statistics, setStatistics] = useState({
    general: {
      totalStudents: 0,
      totalTasks: 0,
      completedTasks: 0,
      pendingTasks: 0,
      averageScore: 0,
      completionRate: 0
    },
    byStudent: [],
    byTask: [],
    byMonth: []
  })
  const [selectedView, setSelectedView] = useState('general') // 'general', 'students', 'tasks', 'timeline'

  useEffect(() => {
    // Verificar autenticación
    const storedData = localStorage.getItem('professorData')
    if (!storedData) {
      navigate('/professor-login')
      return
    }
    
    loadStatistics()
  }, [navigate])

  async function loadStatistics() {
    try {
      const response = await fetch('/src/services/db.json')
      const db = await response.json()
      
      // Calcular estadísticas generales
      const totalStudents = db.students?.length || 0
      const totalTasks = db.tasks?.length || 0
      const submissions = db.taskSubmissions || []
      const completedSubmissions = submissions.filter(s => s.score !== null)
      
      // Calcular promedio de calificaciones
      const totalScore = completedSubmissions.reduce((sum, sub) => sum + (sub.score || 0), 0)
      const averageScore = completedSubmissions.length > 0 ? (totalScore / completedSubmissions.length).toFixed(1) : 0
      
      // Calcular tasa de finalización
      const completionRate = totalTasks > 0 ? ((completedSubmissions.length / (totalStudents * totalTasks)) * 100).toFixed(1) : 0

      // Estadísticas por estudiante
      const studentStats = db.students?.map(student => {
        const studentSubmissions = submissions.filter(s => s.studentId === student.id)
        const completedByStudent = studentSubmissions.filter(s => s.score !== null)
        const averageGrade = completedByStudent.length > 0 
          ? (completedByStudent.reduce((sum, sub) => sum + (sub.score || 0), 0) / completedByStudent.length).toFixed(1)
          : 0

        return {
          id: student.id,
          name: `${student.name} ${student.lastName}`,
          email: student.email,
          totalAssignments: totalTasks,
          completedAssignments: completedByStudent.length,
          pendingAssignments: totalTasks - completedByStudent.length,
          averageGrade: parseFloat(averageGrade),
          completionRate: totalTasks > 0 ? ((completedByStudent.length / totalTasks) * 100).toFixed(1) : 0
        }
      }) || []

      // Estadísticas por tarea
      const taskStats = db.tasks?.map(task => {
        const taskSubmissions = submissions.filter(s => s.taskId === task.id)
        const completedTaskSubs = taskSubmissions.filter(s => s.score !== null)
        const averageTaskScore = completedTaskSubs.length > 0
          ? (completedTaskSubs.reduce((sum, sub) => sum + (sub.score || 0), 0) / completedTaskSubs.length).toFixed(1)
          : 0

        return {
          id: task.id,
          title: task.title,
          maxScore: task.maxScore || 100,
          totalSubmissions: taskSubmissions.length,
          gradedSubmissions: completedTaskSubs.length,
          pendingGrading: taskSubmissions.length - completedTaskSubs.length,
          averageScore: parseFloat(averageTaskScore),
          completionRate: totalStudents > 0 ? ((taskSubmissions.length / totalStudents) * 100).toFixed(1) : 0
        }
      }) || []

      // Datos simulados por mes para gráfica de línea de tiempo
      const monthlyData = [
        { month: 'Enero', tasksCompleted: 15, averageScore: 85.2 },
        { month: 'Febrero', tasksCompleted: 22, averageScore: 87.8 },
        { month: 'Marzo', tasksCompleted: 18, averageScore: 83.5 },
        { month: 'Abril', tasksCompleted: 25, averageScore: 89.1 },
        { month: 'Mayo', tasksCompleted: 20, averageScore: 86.7 },
        { month: 'Junio', tasksCompleted: 28, averageScore: 88.9 },
        { month: 'Julio', tasksCompleted: 24, averageScore: 87.3 },
        { month: 'Agosto', tasksCompleted: 26, averageScore: 89.5 },
        { month: 'Septiembre', tasksCompleted: 23, averageScore: 88.1 },
        { month: 'Octubre', tasksCompleted: completedSubmissions.length, averageScore: parseFloat(averageScore) }
      ]

      setStatistics({
        general: {
          totalStudents,
          totalTasks,
          completedTasks: completedSubmissions.length,
          pendingTasks: (totalStudents * totalTasks) - completedSubmissions.length,
          averageScore: parseFloat(averageScore),
          completionRate: parseFloat(completionRate)
        },
        byStudent: studentStats,
        byTask: taskStats,
        byMonth: monthlyData
      })
    } catch (error) {
      console.error('Error loading statistics:', error)
    }
  }

  function SimpleBarChart({ data, title, dataKey, valueKey }) {
    const maxValue = Math.max(...data.map(item => item[valueKey]))
    
    return (
      <div className="professor-section">
        <h4 style={{ color: 'var(--inkwell)', marginBottom: '15px' }}>{title}</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {data.slice(0, 8).map((item, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ 
                width: '120px', 
                fontSize: '12px', 
                color: 'var(--inkwell)',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}>
                {item[dataKey]}
              </div>
              <div style={{ flex: 1, background: 'var(--au-lait)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{
                  width: `${(item[valueKey] / maxValue) * 100}%`,
                  height: '20px',
                  background: 'linear-gradient(90deg, var(--creme-brulee), var(--lunar-eclipse))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  paddingRight: '5px',
                  color: 'white',
                  fontSize: '11px',
                  fontWeight: 'bold'
                }}>
                  {item[valueKey]}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  function SimpleLineChart({ data, title }) {
    const maxScore = Math.max(...data.map(item => item.averageScore))
    const maxTasks = Math.max(...data.map(item => item.tasksCompleted))
    
    return (
      <div className="professor-section">
        <h4 style={{ color: 'var(--inkwell)', marginBottom: '15px' }}>{title}</h4>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))', 
          gap: '10px',
          alignItems: 'end',
          height: '200px',
          padding: '10px',
          background: 'var(--au-lait)',
          borderRadius: '8px'
        }}>
          {data.slice(-6).map((item, index) => (
            <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', width: '100%' }}>
                <div style={{
                  height: `${(item.tasksCompleted / maxTasks) * 80}%`,
                  background: 'linear-gradient(to top, var(--inkwell), var(--creme-brulee))',
                  borderRadius: '4px 4px 0 0',
                  marginBottom: '5px',
                  minHeight: '10px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '10px',
                  fontWeight: 'bold',
                  paddingTop: '2px'
                }}>
                  {item.tasksCompleted}
                </div>
              </div>
              <div style={{ 
                fontSize: '10px', 
                color: 'var(--inkwell)', 
                textAlign: 'center',
                fontWeight: 'bold',
                marginTop: '5px'
              }}>
                {item.month.slice(0, 3)}
              </div>
            </div>
          ))}
        </div>
        <div style={{ 
          fontSize: '11px', 
          color: 'var(--lunar-eclipse)', 
          textAlign: 'center',
          marginTop: '10px'
        }}>
          Tareas completadas por mes
        </div>
      </div>
    )
  }

  return (
    <div className="professor-home-container">
      <div className="professor-home-overlay">
        <div className="professor-home-content">
          <ProfessorNavbar />
          
          <div className="professor-main-layout">
            <ProfessorSidebar />
            
            <div className="professor-content-area">
              <div className="professor-section">
                <h2 className="professor-section-title">Estadísticas y Análisis</h2>
                
                {/* Navegación por pestañas */}
                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
                  <button 
                    className={`professor-button-${selectedView === 'general' ? 'primary' : 'secondary'}`}
                    onClick={() => setSelectedView('general')}
                  >
                    <BarChartIcon style={{ marginRight: '5px' }} />
                    General
                  </button>
                  <button 
                    className={`professor-button-${selectedView === 'students' ? 'primary' : 'secondary'}`}
                    onClick={() => setSelectedView('students')}
                  >
                    <TrendingUpIcon style={{ marginRight: '5px' }} />
                    Por Estudiante
                  </button>
                  <button 
                    className={`professor-button-${selectedView === 'tasks' ? 'primary' : 'secondary'}`}
                    onClick={() => setSelectedView('tasks')}
                  >
                    <PieChartIcon style={{ marginRight: '5px' }} />
                    Por Tarea
                  </button>
                  <button 
                    className={`professor-button-${selectedView === 'timeline' ? 'primary' : 'secondary'}`}
                    onClick={() => setSelectedView('timeline')}
                  >
                    <TimelineIcon style={{ marginRight: '5px' }} />
                    Línea de Tiempo
                  </button>
                </div>

                {/* Vista General */}
                {selectedView === 'general' && (
                  <>
                    <div className="professor-stats-grid">
                      <div className="professor-stat-card">
                        <div className="professor-stat-number">{statistics.general.totalStudents}</div>
                        <div className="professor-stat-label">Total Estudiantes</div>
                      </div>
                      <div className="professor-stat-card">
                        <div className="professor-stat-number">{statistics.general.totalTasks}</div>
                        <div className="professor-stat-label">Total Tareas</div>
                      </div>
                      <div className="professor-stat-card">
                        <div className="professor-stat-number">{statistics.general.completedTasks}</div>
                        <div className="professor-stat-label">Tareas Completadas</div>
                      </div>
                      <div className="professor-stat-card">
                        <div className="professor-stat-number">{statistics.general.averageScore}</div>
                        <div className="professor-stat-label">Promedio General</div>
                      </div>
                      <div className="professor-stat-card">
                        <div className="professor-stat-number">{statistics.general.completionRate}%</div>
                        <div className="professor-stat-label">Tasa de Finalización</div>
                      </div>
                      <div className="professor-stat-card">
                        <div className="professor-stat-number">{statistics.general.pendingTasks}</div>
                        <div className="professor-stat-label">Tareas Pendientes</div>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
                      <SimpleBarChart 
                        data={statistics.byStudent} 
                        title="Top Estudiantes - Tareas Completadas"
                        dataKey="name"
                        valueKey="completedAssignments"
                      />
                      <SimpleBarChart 
                        data={statistics.byStudent.sort((a, b) => b.averageGrade - a.averageGrade)} 
                        title="Top Estudiantes - Promedio de Calificaciones"
                        dataKey="name"
                        valueKey="averageGrade"
                      />
                    </div>
                  </>
                )}

                {/* Vista por Estudiantes */}
                {selectedView === 'students' && (
                  <div>
                    <h3 style={{ color: 'var(--inkwell)', marginBottom: '15px' }}>
                      Rendimiento por Estudiante
                    </h3>
                    
                    <div className="professor-table" style={{ overflow: 'hidden', borderRadius: '8px' }}>
                      <table className="professor-table">
                        <thead>
                          <tr>
                            <th>Estudiante</th>
                            <th>Email</th>
                            <th>Completadas</th>
                            <th>Pendientes</th>
                            <th>Promedio</th>
                            <th>% Finalización</th>
                          </tr>
                        </thead>
                        <tbody>
                          {statistics.byStudent.map(student => (
                            <tr key={student.id}>
                              <td>{student.name}</td>
                              <td>{student.email}</td>
                              <td>
                                <span style={{ 
                                  color: student.completedAssignments > 0 ? 'green' : 'orange',
                                  fontWeight: 'bold'
                                }}>
                                  {student.completedAssignments}/{student.totalAssignments}
                                </span>
                              </td>
                              <td>
                                <span style={{ 
                                  color: student.pendingAssignments > 0 ? 'red' : 'green',
                                  fontWeight: 'bold'
                                }}>
                                  {student.pendingAssignments}
                                </span>
                              </td>
                              <td>
                                <span style={{ 
                                  color: student.averageGrade >= 70 ? 'green' : 'red',
                                  fontWeight: 'bold'
                                }}>
                                  {student.averageGrade}
                                </span>
                              </td>
                              <td>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                  <div style={{
                                    width: '50px',
                                    height: '8px',
                                    background: 'var(--au-lait)',
                                    borderRadius: '4px',
                                    overflow: 'hidden'
                                  }}>
                                    <div style={{
                                      width: `${student.completionRate}%`,
                                      height: '100%',
                                      background: student.completionRate >= 70 ? 'green' : 'orange'
                                    }} />
                                  </div>
                                  <span style={{ fontSize: '12px', fontWeight: 'bold' }}>
                                    {student.completionRate}%
                                  </span>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Vista por Tareas */}
                {selectedView === 'tasks' && (
                  <div>
                    <h3 style={{ color: 'var(--inkwell)', marginBottom: '15px' }}>
                      Estadísticas por Tarea
                    </h3>
                    
                    {statistics.byTask.length === 0 ? (
                      <div className="professor-card">
                        <p style={{ textAlign: 'center', color: 'var(--lunar-eclipse)' }}>
                          No hay tareas disponibles para mostrar estadísticas
                        </p>
                      </div>
                    ) : (
                      <>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                          <SimpleBarChart 
                            data={statistics.byTask} 
                            title="Entregas por Tarea"
                            dataKey="title"
                            valueKey="totalSubmissions"
                          />
                          <SimpleBarChart 
                            data={statistics.byTask.sort((a, b) => b.averageScore - a.averageScore)} 
                            title="Promedio de Calificaciones por Tarea"
                            dataKey="title"
                            valueKey="averageScore"
                          />
                        </div>

                        <div className="professor-table" style={{ overflow: 'hidden', borderRadius: '8px' }}>
                          <table className="professor-table">
                            <thead>
                              <tr>
                                <th>Tarea</th>
                                <th>Entregas</th>
                                <th>Calificadas</th>
                                <th>Pendientes</th>
                                <th>Promedio</th>
                                <th>% Entrega</th>
                              </tr>
                            </thead>
                            <tbody>
                              {statistics.byTask.map(task => (
                                <tr key={task.id}>
                                  <td>{task.title}</td>
                                  <td>{task.totalSubmissions}</td>
                                  <td>
                                    <span style={{ color: 'green', fontWeight: 'bold' }}>
                                      {task.gradedSubmissions}
                                    </span>
                                  </td>
                                  <td>
                                    <span style={{ 
                                      color: task.pendingGrading > 0 ? 'red' : 'green',
                                      fontWeight: 'bold'
                                    }}>
                                      {task.pendingGrading}
                                    </span>
                                  </td>
                                  <td>
                                    <span style={{ 
                                      color: task.averageScore >= 70 ? 'green' : 'red',
                                      fontWeight: 'bold'
                                    }}>
                                      {task.averageScore}/{task.maxScore}
                                    </span>
                                  </td>
                                  <td>{task.completionRate}%</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* Vista Línea de Tiempo */}
                {selectedView === 'timeline' && (
                  <div>
                    <h3 style={{ color: 'var(--inkwell)', marginBottom: '15px' }}>
                      Progreso a lo Largo del Tiempo
                    </h3>
                    
                    <SimpleLineChart 
                      data={statistics.byMonth} 
                      title="Tareas Completadas por Mes"
                    />

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginTop: '20px' }}>
                      {statistics.byMonth.slice(-6).map((month, index) => (
                        <div key={index} className="professor-card">
                          <h4 style={{ color: 'var(--inkwell)', margin: '0 0 10px 0' }}>
                            {month.month}
                          </h4>
                          <p style={{ margin: '5px 0', color: 'var(--lunar-eclipse)' }}>
                            <strong>Tareas:</strong> {month.tasksCompleted}
                          </p>
                          <p style={{ margin: '5px 0', color: 'var(--lunar-eclipse)' }}>
                            <strong>Promedio:</strong> 
                            <span style={{ 
                              color: month.averageScore >= 80 ? 'green' : 'orange',
                              fontWeight: 'bold',
                              marginLeft: '5px'
                            }}>
                              {month.averageScore}
                            </span>
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfessorStatistics