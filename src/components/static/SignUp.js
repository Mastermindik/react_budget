import { useRef, useState } from "react";
import { Form } from "react-bootstrap";
import {
  Navigate
} from "react-router-dom";

function SignUp() {
  const [isRedirected, setIsRedirected] = useState(false);
  const emailRef = useRef(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const handleSubmit = async (event) => {
    event.preventDefault();
    let user = {
      email: emailRef.current.value,
      username: usernameRef.current.value,
      password: passwordRef.current.value
    }
    const response = await fetch('https://dashakol88.pythonanywhere.com/api/user/register', {
      method: 'POST',
      credentials: "include",
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });

    if (response.ok) {
      localStorage.setItem('Remember', JSON.stringify(true));
      setIsRedirected(true);
      
    } else {
      alert('Email or username is already used!');
    }
  };

  // useEffect(() => localStorage.clear(), []) ВКЛЮЧИТЬ!

  return <div className="login-wraper">
  <div className="login-box d-flex flex-column justify-content-center">
    <div className="text-center"><h2>Sing Up</h2></div>
    <Form className= "login-form d-flex flex-column justify-content-between" onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control className="login-input" type="email" placeholder="Enter email" ref={emailRef} required/>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      <Form.Group>
        <Form.Label>Username</Form.Label>
        <Form.Control className="login-input" type="text" placeholder="Enter username" ref={usernameRef} required/>
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control className="login-input" type="password" placeholder="Password" minLength={6} ref={passwordRef} required/>
      </Form.Group>
      <button type="submit" className="btn-login font-weight-bold text-uppercase">
        sign Up
      </button>
    </Form>
  </div>
  {isRedirected ? <Navigate to={`/addtransaction`}></Navigate> : ''}
  <div className="login-bg"></div>
</div>
}

export default SignUp