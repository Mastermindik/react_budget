import { Navbar, Nav, Container, ListGroup } from 'react-bootstrap';
import logo from './logo.svg';
import './App.scss';
import { Link, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Sidebar from './Sidebar';

function App() {
  function changeColour(e) {
    document.querySelectorAll('.sidebar-item').forEach(el => el.classList.remove('active'));
    e.target.classList.toggle('active');
  }
  let [user, setUser] = useState({});
  useEffect(() => {
    let a = JSON.parse(localStorage.getItem('User'));
    console.log(a);
    setUser(a);
  }, [])
  return (<>
    <Navbar  bg="dark" variant="dark">
      <Navbar.Brand href='#'>
        <img src={logo}
        width="30"
        height="30"
        className="d-inline-block align-top"
        />{' '}React Budget
      </Navbar.Brand>
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          Signed in as: <a href="#login" className='text-capitalize'>{user?.name?.firstname}</a>
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
    <div className='d-flex'>
    <Sidebar changeColour={changeColour} />
    <Outlet />
    </div>
  </>
  );
}

export default App;
