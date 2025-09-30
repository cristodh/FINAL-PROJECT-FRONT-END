import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function CompModal({ abrir, cerrar, usuario }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>

      <Modal show={abrir} onHide={cerrar}>
        <Modal.Header closeButton>
          <Modal.Title>Informacion Adicional</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong> Nombre completo: </strong> {usuario.name || 'Sin nombre'} {usuario.lastName || 'Sin apellido'}
          </p>
          <p>
            <strong>Género: </strong> {usuario.gender || 'Sin especificar'}
          </p>
          <p>
            <strong>Correo: </strong> {usuario.email || 'Sin correo'}
          </p>

          <p>
            <strong>ID del Usuario: </strong> {usuario.id || 'Sin ID'}
          </p>
          <p>
            <strong>Cedula del Usuario: </strong> {usuario.studentID || 'No aplica'}
          </p>
          <p>
            <strong>Teléfono: </strong> {usuario.phone || 'Sin teléfono'}
          </p>

          <p>
            <strong>Fecha de Nacimiento: </strong> {usuario.dob || 'Sin fecha'}
          </p>

          <p>
            <strong>Provincia: </strong> {usuario.province || 'Sin provincia'}
          </p>


          <p>
            <strong>Cantón: </strong> {usuario.canton || 'Sin cantón'}
          </p>


          <p>
            <strong>Distrito: </strong> {usuario.distrit || 'Sin distrito'}
          </p>


          <p>
            <strong>Dirección completa: </strong> {usuario.address || 'Sin dirección'}
          </p>

          <p>
            <strong>Contraseña: </strong> {usuario.password ? 'Establecida' : 'Sin establecer'}
          </p>
          <p>
            <strong>Confirmación Contraseña: </strong> {usuario.confirmPassword ? 'Verificada' : 'Pendiente'}
          </p>




          <p>
            <strong>Sede: </strong> {usuario.location || 'No disponible'}
          </p>

          <p>
            <strong>Fecha de Inicio: </strong> {usuario.startDate || 'Sin registrar'}
          </p>

        </Modal.Body>
      </Modal>
    </>
  );
}

export default CompModal;