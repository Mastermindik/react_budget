import { useEffect, useRef, useState } from "react";
import "./statistic.scss"
import IncomeTransactions from "./IncomeTransactions";
import ExpenceTransactions from "./ExpenceTransactions";
import OveralTransactions from "./OveralTransactions";
import moment from 'moment';
import NoData from "./NoData";
import PeriodSelection from "./PeriodSelection";

function Statistic() {
  const [incomeCategories, setIncomeCategories] = useState([]);
  const [expenceCategories, setExpenceCategories] = useState([]);
  const [overalStatistic, setOveralStatistic] = useState([]);
  const [fullStatistic, setFullStatistic] = useState([]);
  const dateStartRef = useRef(null);
  const dateEndRef = useRef(null);
  const periodRef = useRef(null);
  const [render, setRender] = useState(0);
  const [start, setStart] = useState(moment().subtract(6, 'days').startOf('isoWeek').format("YYYY-MM-DD"));
  const [end, setEnd] = useState(moment().subtract(6, 'days').endOf('isoWeek').format("YYYY-MM-DD"));

  useEffect(() => {
    // Promise.all([
    //   new Promise(resolve => {
    //     fetch('https://dashakol88.pythonanywhere.com/api/categories', {
    //     credentials: "include",
    //     mode: 'cors'
    //    }).then(data => data.json()).then(data => resolve(data))
    //   }),
    //   new Promise(resolve => {
    //     fetch('https://dashakol88.pythonanywhere.com/api/transaction/statistic?transaction_start_date=2023-02-01&transaction_end_date=2023-03-05', {
    //     credentials: "include",
    //     mode: 'cors'
    //   }).then(data => data.json()).then(data => resolve(data))
    //   })
    // ]).then(data => {
    //   setIncomeCategories(data[0].data.filter(el => el.category_type === 1).map(el => el.category_name));
    //   setExpenceCategories(data[0].data.filter(el => el.category_type === 0).map(el => el.category_name));
    //   setOveralStatistic(data.statistic_data.slice(0, 2));
    //   setFullStatistic(data.statistic_data.slice(2, data.statistic_data.length));
    //   setIncomelStatistic(fullStatistic.filter(el => incomeCategories.some(key => el.hasOwnProperty(key))));
    //   setExpenceStatistic(fullStatistic.filter(el => expenceCategories.some(key => el.hasOwnProperty(key))));
    // })
    const getCategories = async () => {
      await fetch('https://dashakol88.pythonanywhere.com/api/categories', {
        credentials: "include",
        mode: 'cors'
       }).then(data => data.json()).then(data => {
        setIncomeCategories(data.data.filter(el => el.category_type === 1).map(el => el.category_name));
        setExpenceCategories(data.data.filter(el => el.category_type === 0).map(el => el.category_name));
       })
      
    }
    const getStatistic = async () => {
      await fetch(`https://dashakol88.pythonanywhere.com/api/transaction/statistic?transaction_start_date=${dateStartRef.current.value ? dateStartRef.current.value : start}&transaction_end_date=${dateEndRef.current.value ? dateEndRef.current.value : end}`, {
        credentials: "include",
        mode: 'cors'
      }).then(data => data.json()).then(data => {
        setOveralStatistic(data.statistic_data.slice(0, 2));
        setFullStatistic(data.statistic_data.slice(2, data.statistic_data.length));
      });
    }
    getCategories();
    getStatistic();
  }, [render])

  function resetCustomPeriod() {
    dateStartRef.current.value = null;
    dateEndRef.current.value = null;
  }
  function selectPeriod() {
    if (periodRef.current.value === 'lw') {
      resetCustomPeriod();
      setStart(moment().subtract(6, 'days').startOf('isoWeek').format("YYYY-MM-DD"));
      setEnd(moment().subtract(6, 'days').endOf('isoWeek').format("YYYY-MM-DD"));
      setRender(render + 1);
    }
    if (periodRef.current.value === 'cw') {
      resetCustomPeriod();
      setStart(moment().startOf('isoWeek').format("YYYY-MM-DD"));
      setEnd(moment().format("YYYY-MM-DD"));
      setRender(render + 1);
    }
    if (periodRef.current.value === 'y') {
      resetCustomPeriod();
      setStart(moment().subtract(1, 'days').format("YYYY-MM-DD"));
      setEnd(moment().subtract(1, 'days').format("YYYY-MM-DD"));
      setRender(render + 1);
    }
    if (periodRef.current.value === 't') {
      resetCustomPeriod();
      setStart(moment().format("YYYY-MM-DD"));
      setEnd(moment().format("YYYY-MM-DD"));
      setRender(render + 1);
    }
    if (periodRef.current.value === 'lm') {
      resetCustomPeriod();
      setStart(moment().subtract(1, 'month').startOf('month').format("YYYY-MM-DD"));
      setEnd(moment().subtract(1, 'month').endOf('month').format("YYYY-MM-DD"));
      setRender(render + 1);
    }
  }
  
    
  return<div className="container-react">
    {/* {JSON.stringify(overalStatistic[0][0] < 0 && overalStatistic[1][0] < 0 )} */}
    <div className="statistic-wraper row">
      <div className="choose-date col-lg-5">
        <h4>Choose date</h4>
        <PeriodSelection periodRef={periodRef} selectPeriod={selectPeriod}/>
        
        <p className="mt-4">Or you can choose another period to view:</p>
        <div className="set-new-date">
          <input type={'date'} ref={dateStartRef} max={moment().format("YYYY-MM-DD")}></input>
          <p className="m-0">to</p>
          <input type={'date'} ref={dateEndRef} max={moment().format("YYYY-MM-DD")}></input>
          <button onClick={() => setRender(render + 1)}>Confirm</button>
        </div>
      </div>
      <div className="income-statistic col-lg-7">
        <h4>Incomes</h4>
        <div>
          {!fullStatistic.filter(el => incomeCategories.some(key => el.hasOwnProperty(key))).length ? <NoData/> : <IncomeTransactions
          fullStatistic={fullStatistic}
          incomeCategories={incomeCategories}/>}
        </div>
      </div>
      <div className="overal-statistic col-lg-5">
        <h4>Overal statistic</h4>
        <div>
          {fullStatistic.length ? <OveralTransactions overalStatistic={overalStatistic}/> : <NoData/>}
          
        </div>
      </div>
      <div className="expence-statistic col-lg-7">
        <h4>Expenses</h4>
        <div>
          {!fullStatistic.filter(el => expenceCategories.some(key => el.hasOwnProperty(key))).length ? <NoData/> : <ExpenceTransactions
          fullStatistic={fullStatistic}
          expenceCategories={expenceCategories}/>}
          
        </div>

      </div>
    </div>
  </div>
}

export default Statistic