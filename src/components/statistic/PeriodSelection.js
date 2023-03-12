function PeriodSelection({ periodRef, selectPeriod }) {
  return <select className="period-select" ref={periodRef} onChange={selectPeriod}>
    <option value={'lw'}>Last week</option>
    <option value={'cw'}>Current week</option>
    <option value={'y'}>Yesterday</option>
    <option value={'t'}>Today</option>
    <option value={'lm'}>Last month</option>
  </select>
}

export default PeriodSelection