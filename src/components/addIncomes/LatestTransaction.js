import deleteIcon from '../../img/AddIncomes/delete.svg';
import editIcon from "../../img/AddIncomes/edit.svg"

function TodayTransaction({ transaction, modalDelete }) {
  return <>
    <div className="latest-transaction animated">
      <div className="transaction-date text-center">
        <p className="m-0">{transaction.transaction_date.split('-').reverse().join('.')}</p>
      </div>
      <div className="transaction-type text-center">
        <p className="m-0">{transaction.transaction_type ? `Income` : `Expence`}</p>
      </div>
      <div className="transaction-category text-center">
        <p className="m-0">{transaction.transaction_category__category_name}</p>
      </div>
      <div className="transaction-price text-center">
        <p className="m-0">{transaction.transaction_type ? `${transaction?.transaction_sum} UAH` : `-${transaction?.transaction_sum} UAH`}</p>
      </div>
      <div className="transaction-notes">
        <p className="m-0">{transaction.transaction_comment}</p>
      </div>
      <button className="button-edit d-none"><img src={editIcon}/></button>
      <button className="button-delete" onClick={() => modalDelete(transaction.id)}><img src={deleteIcon}/></button>
    </div>
  </>
}

export default TodayTransaction