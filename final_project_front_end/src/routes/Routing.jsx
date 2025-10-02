import { BrowserRouter as Router, Routes,Route, } from "react-router-dom";
import LoginStudent from "../pages/Student/LoginStudent";
import LoginProfessor from "../pages/Professor/LoginProfessor";
import RegisterStudent from "../pages/Student/RegisterStudent";
import Admin from "../pages/Admin/Admin";
import CreateModifyAdmin from "../pages/Admin/CreateModifyAdmin";
import AdminLogin from "../pages/Admin/AdminLogin";
import CPUForm from "../pages/Student/CPUForm";
import HomeStudent from "../pages/Student/HomeStudent";
import StudentCourses from "../pages/Student/StudentCourses";
import StudentMaterials from "../pages/Student/StudentMaterials";
import EditProfile from "../pages/Student/EditProfile";
import PrivateRoute from "./PrivateRoute";

// Professor imports
import ProfessorRegister from "../pages/Professor/ProfessorRegister";
import ProfessorHome from "../pages/Professor/ProfessorHome";
import ProfessorTasks from "../pages/Professor/ProfessorTasks";
import ProfessorEquipment from "../pages/Professor/ProfessorEquipment";
import ProfessorStatistics from "../pages/Professor/ProfessorStatistics";
import ProfessorFiles from "../pages/Professor/ProfessorFiles";
import ProfessorAttendance from "../pages/Professor/ProfessorAttendance";
import ProfessorProfile from "../pages/Professor/ProfessorProfile";
import ProfessorMeetings from "../pages/Professor/ProfessorMeetings";


function Routing() {
    return(
        <Router>
            <Routes>
                {/* Student Routes */}
                <Route path="/" element={<LoginStudent/>}/>
                <Route path="/registerNewStudent" element={<RegisterStudent/>}/>
                <Route path="/student/CPURequestForm" element={<CPUForm/>}/>
                <Route path="/student/home" element={<PrivateRoute children={<HomeStudent/>}/>}/>
                <Route path="/student/courses" element={<PrivateRoute children={<StudentCourses/>}/>}/>
                <Route path="/student/materials" element={<PrivateRoute children={<StudentMaterials/>}/>}/>
                <Route path="/student/edit-profile" element={<PrivateRoute children={<EditProfile/>}/>}/>

                {/* Professor Routes */}
                <Route path="/professor-login" element={<LoginProfessor/>}/>
                <Route path="/LoginProfessor" element={<LoginProfessor/>}/>
                <Route path="/professor-register" element={<ProfessorRegister/>}/>
                <Route path="/professor-home" element={<ProfessorHome/>}/>
                <Route path="/professor-tasks" element={<ProfessorTasks/>}/>
                <Route path="/professor-meetings" element={<ProfessorMeetings/>}/>
                <Route path="/professor-statistics" element={<ProfessorStatistics/>}/>
                <Route path="/professor-files" element={<ProfessorFiles/>}/>
                <Route path="/professor-attendance" element={<ProfessorAttendance/>}/>
                <Route path="/professor-equipment" element={<ProfessorEquipment/>}/>
                <Route path="/professor-profile" element={<ProfessorProfile/>}/>

                {/* Admin Routes */}
                <Route path="/admin/home" element={<Admin/>}/>
                <Route path="/admin/create_modif_admin" element={<CreateModifyAdmin/>}/>
                <Route path="/AdminLogin" element={<AdminLogin/>}/>
            </Routes>
        </Router>
    )
}
export default Routing