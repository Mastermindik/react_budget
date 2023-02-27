import { Navbar, Nav, Container, ListGroup } from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';

function Sidebar({changeColour}) {
  return <nav className='navigation bg-secondary'>
  <ListGroup variant='flush'>
    <ListGroup.Item variant='dark' className='p-0' onClick={changeColour}>
      <Link className='sidebar-item nav-link text-dark p-3' to={"/addIncomes"}>Додати доходи</Link>
    </ListGroup.Item>
    <ListGroup.Item variant='dark' className='p-0' onClick={changeColour}>
      <Link className='sidebar-item nav-link text-dark p-3' to={"/history"}>Переглянути історію</Link>
    </ListGroup.Item>
    <ListGroup.Item variant='dark' className='p-0' onClick={changeColour}>
      <Link className='sidebar-item nav-link text-dark p-3' to={"/statistic"}>Переглянути статистику</Link>
    </ListGroup.Item>
    <ListGroup.Item variant='dark' className='p-0' onClick={changeColour}>
      <Link className='sidebar-item nav-link text-dark p-3' to={"/options"}>Налаштування</Link>
    </ListGroup.Item>
    <ListGroup.Item variant='dark' className='p-0' onClick={changeColour}>
      <Link className='sidebar-item nav-link text-dark p-3'>Вийти</Link>
    </ListGroup.Item>
  </ListGroup>
</nav>
}

export default Sidebar