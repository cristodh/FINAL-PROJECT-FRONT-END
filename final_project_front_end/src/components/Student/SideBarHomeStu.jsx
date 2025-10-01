import Tooltip from "@mui/material/Tooltip";
import "../../styles/Student/ColorsStudent.css"
import "../../styles/Student/SideBarHomeStu.css";
import { useNavigate } from "react-router-dom";

function SideBarHomeStu() {
  const navigate = useNavigate();

  return (
    <aside className="sidebar sidebar-student">
      <ul>
        <li>
          <Tooltip title="Meeting" placement="right">
          <img 
            src="../src/images/Student/MeetingICON.png" 
            alt="MeetingICON" 
            onClick={() => window.open('https://meet.google.com/zxq-uays-quy', '_blank')}
            className="sidebar-icon"
          />
          </Tooltip>
        </li>
        <li>
          <Tooltip title="Mis Cursos" placement="right">
          <img src="../src/images/Student/StudyICON.png" alt="StudyICON" />
          </Tooltip>
        </li>
        <li>
          <Tooltip title="Solicitud Equipo" placement="right">
          <img src="../src/images/Student/PCRequestICON.png" alt="PCRequestICON" onClick={()=>navigate('/student/CPURequestForm')} />
          </Tooltip>
        </li>
        <li>
          <Tooltip title="Material de Estudio" placement="right">
          <img src="../src/images/Student/MaterialsICON.png" alt="MaterialsICON" />
          </Tooltip>
        </li>
      </ul>
      <div className="sidebar-footer">

        <button>
          <Tooltip title="Editar Perfil" placement="right">
            <img src="../src/images/Student/ProfileICON.png" alt="ProfileICON" />
          </Tooltip>
        </button>
        <button onClick={() => {
            localStorage.clear();
            window.location.href = 'http://localhost:5173/';
          }}>
          <Tooltip title="Cerrar Sesion" placement="right">
          <img 
            src="../src/images/Student/SignOutICON.png" 
            alt="SignOutICON"
            className="sidebar-icon"
          />
          </Tooltip>
        </button>
      </div>
    </aside>
  );
}

export default SideBarHomeStu;