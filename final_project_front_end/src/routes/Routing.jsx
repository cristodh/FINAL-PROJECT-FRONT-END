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


function Routing() {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<LoginStudent/>}/>
                <Route path="/LoginProfessor" element={<LoginProfessor/>}/>
                <Route path="/registerNewStudent" element={<RegisterStudent/>}/>
                <Route path="/admin/home" element={<Admin/>}/>
                <Route path="/admin/create_modif_admin" element={<CreateModifyAdmin/>}/>
                <Route path="/AdminLogin" element={<AdminLogin/>}/>
                <Route path="/student/CPURequestForm" element={<CPUForm/>}/>
                <Route path="/student/home" element={<PrivateRoute children={<HomeStudent/>}/>}/>
                <Route path="/student/courses" element={<PrivateRoute children={<StudentCourses/>}/>}/>
                <Route path="/student/materials" element={<PrivateRoute children={<StudentMaterials/>}/>}/>
                <Route path="/student/edit-profile" element={<PrivateRoute children={<EditProfile/>}/>}/>
            </Routes>
        </Router>
    )
}
export default Routing