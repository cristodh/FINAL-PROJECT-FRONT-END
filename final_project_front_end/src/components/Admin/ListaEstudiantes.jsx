import { useEffect, useState } from 'react'
import { getData, patchData } from '../../services/fetchs';
import '../../styles/Admin/ListaEstudiantes.css'
import CompModal from './CompModal';

const ListaEstudiantes = ({ email, estado, id }) => {
    const [estadoSeleccionado, setEstadoSeleccionado] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [usuario, setUsuario] = useState([])
    const [pcList, setPcList] = useState([])
    const [serialPC, setSerialPC] = useState('')


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

    const asignarPc = async (id) =>{
        const peticion = await patchData('students',{
            serialPC: serialPC
        },id)
        console.log(peticion);

        const actualizarEstadoPC = await fetch(`http://localhost:3000/cpu/${serialPC}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({assigned: true})
        })
        console.log(actualizarEstadoPC);
        
    }

    useEffect(() => {
        async function traeUsuario() {
            const peticion = await fetch(`http://localhost:3000/students/${id}`);
            const data = await peticion.json();
            console.log(data);
            setUsuario(data)
            const datosPc = await getData('cpu')
            const sinAsignar = datosPc.filter((asignar)=> !asignar.assigned)
            setPcList(sinAsignar)
        }
        traeUsuario()
    }, [])
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
                    <select name="" id="" onChange={(e) => setSerialPC(e.target.value)}>
                        <option value="">Seleccione el PC</option>
                        {pcList.map((pc) => {
                            return (
                                <option key={pc.id} value={pc.id}>{pc.brand} - {pc.serial}</option>
                            )
                        }
                        )}
                    </select>
                    <button className='btn btn-success text-white' onClick={verModal}>Ver mas info</button>
                </div>
                <button className='btnChangeState' onClick={() => cambiarEstado(id)}>Cambiar Estado</button>
                <button className='btnChangeState' onClick={() => {asignarPc(id)}}>Asignar PC</button>
            </div>

            {modalVisible && (
                <CompModal abrir={modalVisible} cerrar={cerrarModal} usuario={usuario} />
            )}
        </div>
    )
}

export default ListaEstudiantes