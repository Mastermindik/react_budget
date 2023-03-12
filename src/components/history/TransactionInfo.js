import { Modal } from "react-bootstrap"

function TransactionInfo({showModal, setShowModal, transactionInfo, deleteTransaction}) {
  return <Modal 
    show={showModal}
    onHide={() => setShowModal(false)}
    aria-labelledby="contained-modal-title-vcenter"
    centered>
    <div className="transaction-info">
      <h3>Transaction info</h3>
      <div className="type">{transactionInfo.transaction_type ? 'Income' : 'Expence'}</div>
      <div className="category">{transactionInfo.transaction_category__category_name}</div>
      <div className="notes">{transactionInfo.transaction_comment ? transactionInfo.transaction_comment : '-No notes-'}</div>
      <div className="summ">{transactionInfo.transaction_type ? `${transactionInfo.transaction_sum} UAH` : `-${transactionInfo.transaction_sum} UAH`}</div>
      <div className="date">{transactionInfo.transaction_date}</div>
      <button onClick={() => deleteTransaction(transactionInfo.id)}>Delete</button>
    </div>
  </Modal>
}

export default TransactionInfo