import { Button, Container } from "react-bootstrap"
import { Link } from "react-router-dom"
import bug from '../../img/NotFound/bug_icon.png'


function NotFound() {
  return <Container className="d-flex flex-column justify-content-center" style={{height: '100vh'}}>
  <div className="d-flex align-item-canter justify-content-center" style={{gap: '4rem'}}>
    <div>
      <img src={bug}></img>
    </div>
    <p className="m-0 display-1 font-weight-bold">404</p>
  </div>
  <div className="text-center">
    <h2 className='my-4 display-4 font-weight-bold'>Sorry, page not found.</h2>
    <p className="">We're sorry, the page you requested could not be found. Please go back to the homepage or contact us at supportReactBudget@gmail.com</p>
  <Link to={'/react_budget/addIncomes'}>
    <Button variant="primary" className="mt-3">Back to Main page</Button>
  </Link>
  </div>
</Container>
}

export default NotFound
