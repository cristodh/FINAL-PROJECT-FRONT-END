import { useEffect, useState } from 'react'
import { patchData } from '../../services/fetchs';
// import '../../styles/Admin/ColorsAdmin.css'
import '../../styles/Admin/ListaEstudiantes.css'
import CompModal from './CompModal';

const ListaEstudiantes = ({ email, estado, id }) => {
    const [estadoSeleccionado, setEstadoSeleccionado] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [usuario,setUsuario] = useState([])
    async function cambiarEstado(id) {
        const peticion = await patchData('students', { registerState: estadoSeleccionado }, id)
        console.log(peticion);
    }

    const verModal = () => {
        console.log('ver modal');
        setModalVisible(true);
    }
    const cerrarModal = () => {
        setModalVisible(false)
    }

    useEffect(()=>{
        async function traeUsuario() {
            const peticion = await fetch(`http://localhost:3000/students/${id}`);
            const data = await peticion.json();
            console.log(data);
            setUsuario(data)
        }
        traeUsuario()
    },[])
    return (
        <div className='studentCard'>
            <div className="studentInfo">
                <h4 className='centro'>Informacion del Estudiante:</h4>
                <p className='centro'>Correo: {email}</p>
                <p className='centro'>Estado del estudiante: {estado}</p>
                <select className='selectEstado' name="" id="" onChange={(e) => setEstadoSeleccionado(e.target.value)} >
                    <option value="" disabled selected>Seleccione un nuevo estado</option>
                    <option value="approved">Aprobar</option>
                    <option value="no completed">No completo</option>
                    <option value="pendingForAprv">Pendiente de aprobacion</option>
                </select>
                <div>
                 <button className='btn btn-success text-white' onClick={verModal}>Ver mas info</button>   
            </div>
                    <button className='btnChangeState' onClick={() => cambiarEstado(id)}>Cambiar Estado</button>
                </div>
            
            {modalVisible && (
                <CompModal abrir={modalVisible} cerrar={cerrarModal} usuario={usuario}/>
            )}
        </div>
    )
}

export default ListaEstudiantes