import Tooltip from "@mui/material/Tooltip";
import "../../styles/Student/ColorsStudent.css"
// import "../../styles/Student/SideBarHomeStu.css";
import { useNavigate } from "react-router-dom";

function SideBarHomeStu() {
  const navigate = useNavigate();

  return (
    <aside className="sidebar">
      <ul>
        <li>
          <Tooltip title="Meeting" placement="right">
          <img src="../src/images/Student/MeetingICON.png" alt="MeetingICON" />
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
          <Tooltip title="Perfil" placement="right">
            <img src="../src/images/Student/ProfileICON.png" alt="ProfileICON" />
          </Tooltip>
        </button>
        <button>
          <Tooltip title="Cerrar Sesion" placement="right">
          <img src="../src/images/Student/SignOutICON.png" alt="SignOutICON" />
          </Tooltip>
        </button>
      </div>
    </aside>
  );
}

export default SideBarHomeStu;