import { Navbar } from 'react-bootstrap';
import logo from './logo.svg';
import './App.scss';
import { Navigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Sidebar from './Sidebar';

function App() {
  const [user, setUser] = useState([])
  const [isRedirected, setIsRedirected] = useState(false);
  const [updateUser, setUpdateuser] = useState(0);

  useEffect(() => {
    if (!localStorage.getItem('Remember') && !sessionStorage.getItem('Remember')) {
      setIsRedirected(true);
    }
  }, [])
  
  useEffect(() => {
    const log = async () => {
      await fetch('https://dashakol88.pythonanywhere.com/api/user/account', {
        credentials: "include",
        mode: 'cors'
      }).then(data => data.json()).then(data => setUser(data.Account))
    }
    log();

  }, [updateUser])

  function changeColour(e) {
    const atribute = e.target.getAttribute('data-numberlist');
    if (atribute !== null) {
      document.getElementById('main-select').style.setProperty('--sq-trans', atribute); 
    }
  }

  function exit(e) {
    e.target.classList.toggle('exit');
    document.querySelector('.confirmation').classList.toggle('active');
  }
  function decline() {
    document.querySelector('.exit').classList.toggle('exit');
    document.querySelector('.confirmation').classList.toggle('active');
  }

  const handleSubmit = async () => {
    const response = await fetch('https://dashakol88.pythonanywhere.com/api/user/logout', {
      method: 'GET',
      credentials: "include",
      mode: 'cors',
    });

    if (response.ok) {
      localStorage.clear();
      sessionStorage.clear();
      setIsRedirected(true);

    } else {
      console.log('Failed to fetch users');
    }
  };

  function burger() {
    document.querySelector('.navigation').classList.toggle('visible');
  }

  return (<>
    <Navbar className='header' variant="dark">
      <div className='burger-wraper' onClick={burger}>
        <span className='burger'></span>
      </div>
      <Navbar.Brand href='#'>
        <img src={logo}
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt='Logo' />{' '}React Budget
      </Navbar.Brand>
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text className='d-flex '>
          <p className='text-white m-0 mr-3'>Balance: {user[0]?.account_balance} UAH</p>
          <p className='m-0'>Signed in as: <a href="#login" className='text-capitalize'>{user[0]?.account_owner__username}</a></p>
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
    <div className='d-flex'>
      <Sidebar changeColour={changeColour} handleSubmit={handleSubmit} exit={exit} decline={decline}/>
      <Outlet context={[updateUser, setUpdateuser]}/>
    </div>
    {isRedirected ? <Navigate to={`/login`}></Navigate> : ''}
  </>
  );
}

export default App;
