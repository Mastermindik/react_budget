import { useEffect, useRef, useState } from "react";
import Calendar from 'react-calendar';
import './planed.scss';
import moment from 'moment';
import AddPlanedTransaction from "./AddPlanedTransaction";
import PlanedTransactionHistory from "./PlanedTransactionHistory";
import NoData from "../statistic/NoData";
import arrow from "../../img/Planed/arrow.svg"
import PlanedStatisticChart from "./PlanedStatisticChart";

function Planedtransaction() {
  const dateRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [planedTransactions, setPlanedTransactions] = useState([]);
  const [planedStatistic, setPlanedStatistic] = useState([]);
  const [type, setType] = useState('');
  const [summ, setSumm] = useState('');
  const typeRef = useRef(null);
  const categoryRef = useRef(null);
  const notesRef = useRef(null);
  const [render, setRender] = useState(0);
  const [date, setDate] = useState('');
  const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));

  useEffect(() => {
    fetch('https://dashakol88.pythonanywhere.com/api/categories', {
      credentials: "include",
      mode: 'cors'
    }).then(data => data.json()).then(data => setCategories(data.data))
  }, [])
  
  useEffect(() => {
    fetch('https://dashakol88.pythonanywhere.com/api/planning/planned_transactions', {
      credentials: "include",
      mode: 'cors'
    }).then(data => data.json()).then(data =>
      setPlanedTransactions(data.transactions.filter(el => el.transaction_date_plan >= moment().format('YYYY-MM-DD'))))
    fetch(`https://dashakol88.pythonanywhere.com/api/planning/transaction/statistic?transaction_start_date=${moment().format('YYYY-MM-DD')}&transaction_end_date=${moment().add(1, 'year').format('YYYY-MM-DD')}`, {
      credentials: "include",
      mode: 'cors'
    }).then(data => data.json()).then(data => setPlanedStatistic(data.statistic_data))
  }, [render])

  const addTransaction = async () => {
    if (typeRef.current.value === '' || categoryRef.current.value === '' || summ === '') {
      alert('Заповніть поля');
      return
    }
    let newtransaction = {
      transaction_type: (+typeRef.current.value),
      transaction_category: categoryRef.current.value,
      transaction_date: date,
      transaction_sum: (+summ).toFixed(2),
      transaction_comment: notesRef.current.value
    }
    console.log(newtransaction);
    await fetch('https://dashakol88.pythonanywhere.com/api/planning/transaction/add', {
      method: 'POST',
      credentials: "include",
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newtransaction)
    }).then(response => response.json()).then(data => {
      console.log('Success:', data);
    })
      .catch((error) => {
        console.error('Error:', error);
      });
    setRender(render + 1);
    typeRef.current.value = '';
    categoryRef.current.value = '';
    setSumm('');
    notesRef.current.value = '';
  }

  const deleteTransaction = async (id) => {
    await fetch(`https://dashakol88.pythonanywhere.com/api/planning/transaction/${id}/delete`, {
      method: 'POST',
      credentials: "include",
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: id })
    }).then(response => response.json()).then(data => {
      console.log('Success:', data);
    })
      .catch((error) => {
        console.error('Error:', error);
      });
    setRender(render + 1);
  }

  function showStatistic() {
    document.querySelector('.planed-transaction-history-wraper').classList.toggle('active');
    document.querySelector('.planed-transaction-statistic .slide').classList.toggle('active');
  }

  return <div className="container-react">
    <h2>Planed transactions</h2>
    <div className="planed-wraper row">
      <div className="planed-calendar-wraper col-md-4">
        <Calendar className={'planed-calendar'}
          onClickDay={(value) => setDate(moment(value).format('YYYY-MM-DD'))}
          inputRef={dateRef}
          minDate={tomorrow}
          defaultValue={tomorrow}
        />
      </div>
      <div className="add-planed-transaction col-md-8">
        <AddPlanedTransaction
          categories={categories}
          type={type}
          setType={setType}
          typeRef={typeRef}
          categoryRef={categoryRef}
          notesRef={notesRef}
          summ={summ}
          setSumm={setSumm}
          addTransaction={addTransaction} />

      </div>
      <div className="planed-transaction-history-wraper col-sm-11">
        <div className="planed-transaction-history-header">
          <div className="type">Type</div>
          <div className="category">Category</div>
          <div className="notes">Notes</div>
          <div className="summ">Summ</div>
          <div className="date">Date</div>
        </div>
        <div className="planed-transaction-history-table">
          {!planedTransactions.length ? <NoData /> : planedTransactions.map(transaction => <PlanedTransactionHistory
            transaction={transaction}
            key={transaction.id}
            deleteTransaction={deleteTransaction} />)}
        </div>
        <PlanedStatisticChart planedStatistic={planedStatistic} />
      </div>
      <div className="planed-transaction-statistic col-sm-1">
      {!planedTransactions.length ? '' : 
        <button className="slide" onClick={showStatistic}>
          <img src={arrow} alt="left" />
        </button>}
        
      </div>
    </div>

  </div>
}

export default Planedtransaction