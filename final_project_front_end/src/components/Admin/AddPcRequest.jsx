import { useState } from "react"
import "../../styles/Admin/AddUserAdmin.css"
import { postData } from "../../services/fetchs"
const AddPcRequest = () =>{
    const [pcSerial,setPcSerial] = useState("")
    const [pcBrand,setPcBrand] = useState("")
    async function addPc() {
        const pcObj = {
            serial: pcSerial,
            brand: pcBrand
        }
        await postData(pcObj,'cpu')
        setPcSerial('')
        setPcBrand('')
    }
    return(
    <>
            <div className="crearUsuario">
                <h3>Add PC</h3>
                <input type="text" value={pcSerial} placeholder="Serial" onChange={(e)=>setPcSerial(e.target.value)}/>
                <input type="text" value={pcBrand} placeholder="Marca" onChange={(e)=>setPcBrand(e.target.value)}/>
                <button
                    onClick={addPc}
                >Agregar</button>
            </div>
        </>
    )
}
export default AddPcRequest;