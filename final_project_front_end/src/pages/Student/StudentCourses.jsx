import React, { useState, useEffect } from "react";
import HeaderStudent from "../../components/Student/HeaderStudent";
import FooterStudent from "../../components/Student/FooterStudent";
import CourseCard from "../../components/Student/CourseCard";
import CourseContent from "../../components/Student/CourseContent";
import { getData } from "../../services/fetchs";
import "../../styles/Student/StudentCourses.css";

function StudentCourses() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [studentData] = useState(
    JSON.parse(localStorage.getItem("estudianteRegistrado")) || {}
  );

  // Cargar cursos del estudiante desde db.json
  useEffect(() => {
    async function loadStudentCourses() {
      try {
        setLoading(true);
        
        // Obtener cursos donde el estudiante esté inscrito
        const allCourses = await getData("courses");
        const studentCourses = allCourses.filter(course => 
          course.students.includes(studentData.id)
        );
        
        // Para cada curso, obtener tareas y grabaciones
        const coursesWithDetails = await Promise.all(
          studentCourses.map(async (course) => {
            // Obtener tareas del curso
            const allTasks = await getData("tasks");
            const courseTasks = allTasks.filter(task => task.courseId === course.id);
            
            // Obtener submissions del estudiante para las tareas
            const allSubmissions = await getData("taskSubmissions");
            const studentSubmissions = allSubmissions.filter(sub => 
              sub.studentId === studentData.id && sub.courseId === course.id
            );
            
            // Combinar tareas con submissions para obtener el estado
            const tasksWithStatus = courseTasks.map(task => {
              const submission = studentSubmissions.find(sub => sub.taskId === task.id);
              return {
                ...task,
                status: submission ? submission.status : "pendiente",
                githubLink: submission?.githubLink || "",
                professorComments: submission?.professorFeedback || "",
                score: submission?.score || null,
                submittedDate: submission?.submittedDate || null
              };
            });
            
            // Obtener grabaciones del curso
            const allRecordings = await getData("recordings");
            const courseRecordings = allRecordings.filter(rec => rec.courseId === course.id);
            
            return {
              ...course,
              tasks: tasksWithStatus,
              recordings: courseRecordings
            };
          })
        );
        
        setCourses(coursesWithDetails);
      } catch (error) {
        console.error("Error loading courses:", error);
      } finally {
        setLoading(false);
      }
    }
    
    if (studentData.id) {
      loadStudentCourses();
    }
  }, [studentData.id]);

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
  };

  const handleBackToCourses = () => {
    setSelectedCourse(null);
  };

  if (loading) {
    return (
      <div className="student-courses-page">
        <HeaderStudent />
        <main className="courses-main">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Cargando cursos...</p>
          </div>
        </main>
        <FooterStudent />
      </div>
    );
  }

  return (
    <div className="student-courses-page">
      <HeaderStudent />
      
      <main className="courses-main">
        {!selectedCourse ? (
          <div className="courses-container">
            <div className="courses-header">
              <h1>Mis Cursos</h1>
              <p>Bienvenido {studentData.name}, aquí puedes ver todos tus cursos y materiales</p>
            </div>
            
            {courses.length === 0 ? (
              <div className="no-courses">
                <div className="empty-icon">📚</div>
                <h3>No tienes cursos asignados</h3>
                <p>Contacta con tu administrador para que te asigne cursos.</p>
              </div>
            ) : (
              <div className="courses-grid">
                {courses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    onSelect={() => handleCourseSelect(course)}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <CourseContent
            course={selectedCourse}
            onBack={handleBackToCourses}
          />
        )}
      </main>

      <FooterStudent />
    </div>
  );
}

export default StudentCourses;