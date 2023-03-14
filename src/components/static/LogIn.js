import { useRef, useState } from "react";
import { Form } from "react-bootstrap";
import {
  Link,
  Navigate
} from "react-router-dom";
import './login.scss'

function LogIn() {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const [isRedirected, setIsRedirected] = useState(false);
  const rememberRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let user = {
      username: usernameRef.current.value,
      password: passwordRef.current.value
    }
    const response = await fetch('https://dashakol88.pythonanywhere.com/api/user/login', {
      method: 'POST',
      credentials: "include",
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });

    if (response.ok) {
      if (rememberRef.current.checked) {
        localStorage.setItem('Remember', JSON.stringify(true));
      } else {
        sessionStorage.setItem('Remember', JSON.stringify(true));
      }
      setIsRedirected(true);
    } else {
      alert('Incorrect login or password');
    }

  };


  // useEffect(() => localStorage.clear(), []) ВКЛЮЧИТЬ!

  return <>
    <div className="login-wraper">
      <div className="login-box login-mini">
        <div className="text-center"><h2>Sing In</h2></div>
        <Form className= "login-form d-flex flex-column justify-content-between" onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control className="login-input" type="text" placeholder="Enter username" ref={usernameRef} required/>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control className="login-input" type="password" placeholder="Password" ref={passwordRef} required/>
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Remember me" ref={rememberRef}/>
          </Form.Group>
          <Link to={'/signUp'} >Don't have an account? Sign up!</Link>
          <button type="submit" className="btn-login font-weight-bold text-uppercase">
            sign in
          </button>
        </Form>
      </div>
      {isRedirected ? <Navigate to={`/addtransaction`}></Navigate> : ''}
    </div>
    <div className="login-bg"></div>
  </>
}

export default LogIn