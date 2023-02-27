import { Button, Table } from "react-bootstrap"

function TodayTransaction() {
  return <div className="d-flex justify-content-between mb-4">
    <div className="today-incomes-transaction">
    <div className="transaction-category text-center">
      <p className="m-0">Category</p>
    </div>
    <div className="transaction-price text-center">
      <p className="m-0">Price</p>
    </div>
    <div className="transaction-notes">
      <p className="m-0">Notes</p>
    </div>
  </div>
    <Button variant="danger" className="px-5">Remove</Button>
  </div>
}

export default TodayTransaction