import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ok from './img/App/ok.svg';
import cancel from './img/App/decline.svg';

function Sidebar({changeColour, handleSubmit, exit, decline}) {
  return <nav className='navigation'>
  <ListGroup variant='flush'>
    <ListGroup.Item className='p-0' id='main-select' onClick={changeColour}>
      <Link className='sidebar-item nav-link text-dark p-3' to={"/addtransaction"} data-numberlist='0%'>Add transaction</Link>
    </ListGroup.Item>
    <ListGroup.Item className='p-0' onClick={changeColour}>
      <Link className='sidebar-item nav-link text-dark p-3' to={"/history"} data-numberlist='100%'>History of transaction</Link>
    </ListGroup.Item>
    <ListGroup.Item className='p-0' onClick={changeColour}>
      <Link className='sidebar-item nav-link text-dark p-3' to={"/statistic"} data-numberlist='200%'>Statistic</Link>
    </ListGroup.Item>
    <ListGroup.Item className='p-0' onClick={changeColour}>
      <Link className='sidebar-item nav-link text-dark p-3' to={"/planed"} data-numberlist='300%'>Planed transactions</Link>
    </ListGroup.Item>
    <ListGroup.Item className='p-0' onClick={changeColour}>
      <a className='sidebar-item nav-link text-dark p-3' href='#' onClick={exit}>Exit</a>
      <div className='confirmation'>
        <p>Do you want to log out?</p>
        <button className='submit' onClick={handleSubmit}><img src={ok} alt='ok'/></button>
        <button className='cancel' onClick={decline}><img src={cancel} alt='cancel'/></button>
      </div>
    </ListGroup.Item>
  </ListGroup>
</nav>
}

export default Sidebar