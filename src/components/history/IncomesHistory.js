import { useEffect, useRef, useState } from "react"
import Categories from "../addIncomes/Categories"
import HistoryTable from "./HistoryTable";
import "./history.scss"
import TransactionInfo from "./TransactionInfo";
import DateFilter from "./DateFilter";


function IncomesHistory() {
  const [showModal, setShowModal] = useState(false);
  const [historyBody, setHistoryBody] = useState([]);
  const [countTransaction, setCountTransaction] = useState(10);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const typeRef = useRef(null);
  let dateRef = useRef(null);
  const categoryRef = useRef(null);
  const dateRangeStartRef = useRef(null);
  const dateRangeEndRef = useRef(null);
  const [transactionInfo, setTransactionInfo] = useState({});
  const [render, setRender] = useState(0);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('https://dashakol88.pythonanywhere.com/api/categories', {
      credentials: "include",
      mode: 'cors'
     }).then(data => data.json()).then(data => setCategories(data.data))
  }, [])

  useEffect(() => {
    fetch('https://dashakol88.pythonanywhere.com/api/transaction/latest', {
        credentials: "include",
        mode: 'cors'
       }).then(data => data.json()).then(data => {
        setHistoryBody(data.transactions)
        setFilteredHistory(data.transactions)
      })
  }, [render])

  function showMoreTransaction() {
    setCountTransaction(countTransaction + 10)
  }
  function showLessTransaction() {
    setCountTransaction(countTransaction - 10)
  }
  function showTransactionInfo(transaction) {
    setShowModal(true);
    setTransactionInfo(transaction);
  }
  const deleteTransaction = async (idToDelete) => {
    await fetch(`https://dashakol88.pythonanywhere.com/api/transaction/${idToDelete}/delete`, {
      method: 'POST',
      credentials: "include",
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id: idToDelete})
    }).then(response => response.json()).then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    setRender(render + 1);
    setShowModal(false);
  }

  function filter() {
    let filteredItems = [...historyBody];
    if (typeRef.current.value !== 'Type') {
      filteredItems = filteredItems.filter(el => el.transaction_type === (+typeRef.current.value));
      setFilteredHistory(filteredItems)
    } else {
      setFilteredHistory(historyBody)
    }
    if (dateRef.current.value) {
      filteredItems = filteredItems.filter(el => el.transaction_date === dateRef.current.value);
      console.log(filteredItems);
      setFilteredHistory(filteredItems)
    } else {
      setFilteredHistory(filteredItems)
    }
    if (categoryRef.current.value) {
      filteredItems = filteredItems.filter(el => el.transaction_category__category_name === categoryRef.current.value);
      console.log(filteredItems);
      setFilteredHistory(filteredItems)
    } else {
      setFilteredHistory(filteredItems)
    }
  }
  function chooseDateRange(e) {
    document.querySelector('.date-range-group').classList.toggle('active');
    document.querySelector('.one-date input').classList.toggle('active');
    if (document.querySelector('.one-date input').className.includes('active')) {
      document.querySelector('.swap-date').innerHTML = 'Choose date range';
    } else {
      document.querySelector('.swap-date').innerHTML = 'Back to solo date';
    }
  }

  function filterDateRange() {
    let filtred = filteredHistory.filter(el => el.transaction_date >= dateRangeStartRef.current.value && el.transaction_date <= dateRangeEndRef.current.value)
    setFilteredHistory(filtred);
  }

  return<>
    <div className="container-react over-hiden">
      <div className="history-header animated">
        <div className="add-income-group">
          <select className="add-select" onChange={filter} ref={typeRef}>
            <option value={'Type'}>Type</option>
            <option value={1}>Income</option>
            <option value={0}>Expense</option>
          </select>
          <select className="add-select" ref={categoryRef} onChange={filter}>
            <option value={''}>Category</option>
            {categories.map(category => <Categories category={category} key={category.category_name}/>)}     
          </select>
        </div>
        <DateFilter 
        filter={filter}
        dateRef={dateRef}
        dateRangeStartRef={dateRangeStartRef}
        dateRangeEndRef={dateRangeEndRef}
        filterDateRange={filterDateRange}
        chooseDateRange={chooseDateRange}/>
      </div>
      <div className="history-table-title animated">
        <h2 className="m-0">History</h2>
        <div className="history-buttons-box">
          <button className="button-show-more-less" 
          onClick={showMoreTransaction} 
          disabled={countTransaction >= historyBody.length || historyBody.length <= 10}>Show more</button>
          <button className="button-show-more-less" onClick={showLessTransaction} disabled={countTransaction <= 10}>Show less</button>
        </div>
      </div>
        <div className="history-table-header animated">
          <div className="type">Type</div>
          <div className="category">Category</div>
          <div className="notes">Notes</div>
          <div className="summ">Summ</div>
          <div className="date">Date</div>
        </div>
      <div className="history-table-wraper">
        {filteredHistory.sort((a, b) => a.transaction_date > b.transaction_date ? -1 : a.id > b.id ? -1 : 1).slice(0, countTransaction).map(transaction => 
        <HistoryTable 
          transaction={transaction} 
          key={transaction.id}
          showTransactionInfo={showTransactionInfo}
          setShowModal={setShowModal}/>)}
      </div>
      <TransactionInfo 
        showModal={showModal}
        setShowModal={setShowModal}
        transactionInfo={transactionInfo}
        deleteTransaction={deleteTransaction}
        />
    </div>
  </>
}

export default IncomesHistory