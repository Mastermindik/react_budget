import deleteIcon from '../../img/AddIncomes/delete.svg';

function PlanedTransactionHistory({ transaction, deleteTransaction }) {
  return <div className={transaction.transaction_type_plan ? "planed-transaction-history-el animated positive" : "planed-transaction-history-el animated negative"}>
    <div className="planed-type">{transaction.transaction_type_plan ? `Income` : `Expence`}</div>
    <div className="planed-category">{transaction.transaction_category_plan__category_name}</div>
    <div className="planed-notes">{transaction.transaction_comment_plan}</div>
    <div className="planed-summ">{transaction.transaction_type_plan ? `${transaction?.transaction_sum_plan} UAH` : `-${transaction?.transaction_sum_plan} UAH`}</div>
    <div className="planed-date">{transaction.transaction_date_plan.split('-').reverse().join('.')}</div>
    <div className='delete' onClick={() => deleteTransaction(transaction.id)}><img src={deleteIcon}/></div>
  </div>
}

export default PlanedTransactionHistory