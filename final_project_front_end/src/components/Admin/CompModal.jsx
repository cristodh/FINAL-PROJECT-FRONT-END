import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function CompModal({abrir,cerrar,usuario}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>

      <Modal show={abrir} onHide={cerrar}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h3>
                Nombre completo: {usuario.name || 'Sin nombre'} {usuario.lastName || 'Sin apellido'}
            </h3>
            <h3>
                Correo: {usuario.email || 'Sin correo'}
            </h3>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CompModal;