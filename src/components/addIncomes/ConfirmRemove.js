import { Button, Modal } from "react-bootstrap"

function ConfirmRemove({ showModalDelete, setShowModalDelete, deleteTransaction }) {
    return <Modal show={showModalDelete} onHide={() => setShowModalDelete(false)}>
    <Modal.Header>
      <Modal.Title>Confirmation</Modal.Title>
    </Modal.Header>
    <Modal.Body>Do you want to remove the transaction?</Modal.Body>
    <Modal.Footer>
      <Button variant="success" onClick={deleteTransaction}>
        Yes
      </Button>
      <Button variant="danger" onClick={() => setShowModalDelete(false)}>
        No
      </Button>
    </Modal.Footer>
  </Modal>

}

export default ConfirmRemove