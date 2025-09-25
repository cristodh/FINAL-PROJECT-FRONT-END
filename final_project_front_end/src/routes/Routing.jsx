import { BrowserRouter as Router, Routes,Route, } from "react-router-dom";
import LoginStudent from "../pages/LoginStudent";
import LoginProfessor from "../pages/LoginProfessor";
import RegisterStudent from "../pages/RegisterStudent";
import Admin from "../pages/Admin";
import CreateModifyAdmin from "../pages/CreateModifyAdmin";
import AdminLogin from "../pages/AdminLogin";


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
            </Routes>
        </Router>
    )
}
export default Routing