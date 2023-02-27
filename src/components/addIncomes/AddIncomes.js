import { useEffect, useState } from "react"
import { Button, Container, Dropdown, DropdownButton, FormControl, InputGroup } from "react-bootstrap"
import { useParams } from "react-router-dom"
import Categories from "./Categories"
import TodayTransaction from "./TodayTransaction";

function AddIncomes() {
  // const {userId} = useParams();
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState('');
  useEffect(
    () => {
      let a = JSON.parse(localStorage.getItem('User'));
      setUserId(a.id);
    Promise.all([
      new Promise (resolve => {
        fetch(`https://fakestoreapi.com/users/${a.id}`).then(data => data.json().then(data => resolve(data)))
      })
    ]).then(data => setUser(data[0]))
  }, [])


  return <Container className="py-3">
    <div><h2>Add incomes / expenses</h2></div>
    <p>Hello {user.email}</p>
    <InputGroup>
      <Categories/>
      <FormControl placeholder="Price" className="input-price"/>
      <FormControl placeholder="Notes"/>
      <Button variant="success" className="px-5">Add</Button>
    </InputGroup>
    <h2 className="mt-5">Today's transactions:</h2>
    <TodayTransaction/>
  </Container>
}

export default AddIncomes