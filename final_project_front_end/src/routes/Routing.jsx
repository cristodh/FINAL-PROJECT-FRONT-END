import { BrowserRouter as Router, Routes,Route, } from "react-router-dom";
import LoginStudent from "../pages/LoginStudent";
import LoginProfessor from "../pages/LoginProfessor";
import RegisterStudent from "../pages/RegisterStudent";

function Routing() {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<LoginStudent/>}/>
                <Route path="/professor" element={<LoginProfessor/>}/>
                <Route path="/regis_stu" element={<RegisterStudent/>}/>
            </Routes>
        </Router>
    )
}
export default Routing