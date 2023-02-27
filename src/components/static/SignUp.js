import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import {
  Navigate
} from "react-router-dom";

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRedirected, setIsRedirected] = useState(false);
  const [user, setUser] = useState({});

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const url = 'https://fakestoreapi.com/users';
    const response = await fetch(url);

    if (response.ok) {
      const users = await response.json();

      const currentUser = users.filter((user) => user.email === email && user.password === password);

      if (currentUser) {
        console.log('User authenticated successfully');
        console.log(currentUser[0].id);
        localStorage.setItem('User', JSON.stringify(currentUser[0]))
        // setUser(currentUser[0]);
        setIsRedirected(true);
        // handle successful authentication
      } else {
        console.log('Invalid email or password');
        // handle authentication failure
      }
    } else {
      console.log('Failed to fetch users');
      // handle fetch failure
    }

    setIsLoading(false);
  };

  // useEffect(() => localStorage.clear(), []) ВКЛЮЧИТЬ!

  return <div className="login-wraper">
  <div className="login-box d-flex flex-column justify-content-center">
    <div className="text-center"><h2>Sing Up</h2></div>
    <Form className= "login-form d-flex flex-column justify-content-between" onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control className="login-input" type="email" placeholder="Enter email" value={email} onChange={handleEmailChange} required/>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control className="login-input" type="password" placeholder="Password" value={password} onChange={handlePasswordChange} required/>
      </Form.Group>
      <button type="submit" className="btn-login font-weight-bold text-uppercase">
        sign Up
      </button>
    </Form>
  </div>
  {isRedirected ? <Navigate to={`/addIncomes`}></Navigate> : ''}
</div>
}

export default SignUp