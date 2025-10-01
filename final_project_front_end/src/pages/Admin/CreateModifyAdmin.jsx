import { useEffect, useState } from 'react'
import AddUserAdmin from '../../components/Admin/AddUserAdmin'
import { getData } from '../../services/fetchs'
import ListaEstudiantes from '../../components/Admin/ListaEstudiantes'
import '../../styles/Admin/Admin.css'
import AddPcRequest from '../../components/Admin/AddPcRequest'
function CreateModifyAdmin() {
    const [listaUsuarios, setListaUsuarios] = useState([])

    useEffect(() => {
        async function cargarUsuarios() {
            const peticion = await getData("students")
            setListaUsuarios(peticion)
        }
        cargarUsuarios()
    }, [listaUsuarios])

    return (
        <div className="adminContainer">
            <div className="sidebarArea">
                
            </div>
            <div className="addUserArea">
                <AddUserAdmin />
            </div>
            <div className="gridStudents">
                {listaUsuarios.map((usuario) => (
                    <ListaEstudiantes
                        key={usuario.id}
                        email={usuario.email}
                        estado={
                            usuario.registerState === "pendingForAprv" ? "Pendiente de aprobacion"
                                : usuario.registerState === "no completed" ? 'Sin completar'
                                    : usuario.registerState === "approved" ? "Aprobado"
                                        : "Sin estado"
                        }
                        id={usuario.id}
                    />
                ))}
            </div>
            <div className="addPcRequestArea">
                <AddPcRequest />
            </div>
        </div>
    )
}

export default CreateModifyAdmin