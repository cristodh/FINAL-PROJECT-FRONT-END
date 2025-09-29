import { BrowserRouter as Router, Routes,Route, } from "react-router-dom";
import LoginStudent from "../pages/Student/LoginStudent";
import LoginProfessor from "../pages/Professor/LoginProfessor";
import RegisterStudent from "../pages/Student/RegisterStudent";
import Admin from "../pages/Admin/Admin";
import CreateModifyAdmin from "../pages/Admin/CreateModifyAdmin";
import AdminLogin from "../pages/Admin/AdminLogin";
import CPUForm from "../pages/Student/CPUForm";
import HomeStudent from "../pages/Student/HomeStudent";


function Routing() {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<LoginStudent/>}/>
                <Route path="/LoginProfessor" element={<LoginProfessor/>}/>
                <Route path="/registerNewStudent" element={<RegisterStudent/>}/>
                <Route path="/admin_home" element={<Admin/>}/>
                <Route path="/create_modif_admin" element={<CreateModifyAdmin/>}/>
                <Route path="/AdminLogin" element={<AdminLogin/>}/>
                <Route path="/student/CPURequestForm" element={<CPUForm/>}/>
                <Route path="/student/home" element={<HomeStudent/>}/>
            </Routes>
        </Router>
    )
}
export default Routing