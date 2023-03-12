function HistoryTable({transaction, showTransactionInfo}) {
  return <>
  <div className={transaction?.transaction_type ? "transaction-history animated positive" : "transaction-history animated negative"} onClick={() => showTransactionInfo(transaction)}>
    <div className="transaction-type animated">
      <p>{transaction.transaction_type ? 'Income' : 'Expence'}</p>
    </div>
    <div className="transaction-category animated">
      <p>{transaction.transaction_category__category_name}</p>
    </div>
    <div className="transaction-notes animated">
      <p>{transaction.transaction_comment ? transaction.transaction_comment : ' '}</p>
    </div>
    <div className="transaction-summ animated">
      <p>{transaction.transaction_type ? `${transaction?.transaction_sum} UAH` : `-${transaction?.transaction_sum} UAH`}</p>
    </div>
    <div className="transaction-date animated">
      <p>{transaction.transaction_date.split('-').reverse().join('.')}</p>
    </div>
  </div>
    </>
}

export default HistoryTable