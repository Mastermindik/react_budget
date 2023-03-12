import moment from 'moment';

function DateFilter({ filter, dateRef, dateRangeStartRef, dateRangeEndRef, filterDateRange, chooseDateRange }) {
  return <div className="select-date">
  <div className="one-date">
    <input type={'date'} onChange={filter} ref={dateRef} className='active'></input>
    <button className="swap-date" onClick={chooseDateRange}>Choose date range</button>
  </div>
  <div className="date-range-group">
    <p className="m-0">From:</p>
    <input className="date-range" type={'date'} ref={dateRangeStartRef} max={moment().format('YYYY-MM-DD')}></input>
    <p className="m-0">to:</p>
    <input className="date-range" type={'date'} ref={dateRangeEndRef} max={moment().format('YYYY-MM-DD')}></input>
    <button onClick={filterDateRange}>Show filtered</button>
  </div>
</div>
} 

export default DateFilter