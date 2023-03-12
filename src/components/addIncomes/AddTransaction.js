import { useEffect, useRef, useState } from "react"
import Categories from "./Categories"
import LatestTransaction from "./LatestTransaction";
import "./addtransaction.scss";
import ConfirmRemove from "./ConfirmRemove";


function AddTransaction() {
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [type, setType] = useState('');
  const [summ, setSumm] = useState('');
  const [date, setDate] = useState('');
  const [latest, setLatest] = useState([]);
  const [render, setRender] = useState(0);
  const [idToDelete, setIdToDelete] = useState('');
  const [categories, setCategories] = useState([]);
  const typeRef = useRef(null);
  const categoryRef = useRef(null);
  const notesRef = useRef(null);
  const dateRef = useRef(null);

  useEffect(() => {
    fetch('https://dashakol88.pythonanywhere.com/api/categories', {
      credentials: "include",
      mode: 'cors'
    }).then(data => data.json()).then(data => setCategories(data.data))
    let date = new Date();
    setDate(date.toJSON().slice(0, 10));
  }, [])

  useEffect(() => {
    fetch('https://dashakol88.pythonanywhere.com/api/transaction/latest', {
      credentials: "include",
      mode: 'cors'
    }).then(data => data.json()).then(data => setLatest(data.transactions.sort(((a, b) => a.id > b.id ? -1 : 1))))
  }, [render])

  const deleteTransaction = async () => {
    await fetch(`https://dashakol88.pythonanywhere.com/api/transaction/${idToDelete}/delete`, {
      method: 'POST',
      credentials: "include",
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: idToDelete })
    }).then(response => response.json()).then(data => {
      console.log('Success:', data);
    })
      .catch((error) => {
        console.error('Error:', error);
      });
    setRender(render + 1);
    setShowModalDelete(false);
  }

  const addTransaction = async () => {
    if (typeRef.current.value === '' || categoryRef.current.value === '' || summ === '') {
      alert('Заповніть поля');
      return
    }
    let newtransaction = {
      transaction_type: typeRef.current.value,
      transaction_category: categoryRef.current.value,
      transaction_date: dateRef.current.value,
      transaction_sum: (+summ).toFixed(2),
      transaction_comment: notesRef.current.value
    }
    await fetch('https://dashakol88.pythonanywhere.com/api/transaction/add', {
      method: 'POST',
      credentials: "include",
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newtransaction)
    }).then(response => response.json()).then(data => {
      console.log('Success:', data);
    })
      .catch((error) => {
        console.error('Error:', error);
      });
    setRender(render + 1);
    typeRef.current.value = '';
    categoryRef.current.value = '';
    setSumm('');
    notesRef.current.value = '';
  }

  function modalDelete(id) {
    setShowModalDelete(true);
    setIdToDelete(id);
  }

  return <div className="container-react">
    <div className="add-header animated">
      <h2>Add incomes / expenses</h2>
      <input type={'date'} defaultValue={date} max={date} ref={dateRef}></input>
    </div>
    <div className="add-income-group animated">
      <select className="add-select" ref={typeRef} onChange={() => setType(typeRef.current.value)}>
        <option value={''}>Type</option>
        <option value={1}>Income</option>
        <option value={0}>Expense</option>
      </select>
      <select className="add-select" ref={categoryRef} disabled={type === ''}>
        <option value={''}>Category</option>
        {(type === '1' ? categories.filter(el => el.category_type === 1) : categories.filter(el => el.category_type === 0)).map(category => <Categories category={category} key={category.category_name} />)}
      </select>
      <input type={'number'} placeholder='Summ' className="add-input number" value={summ} onChange={(e) => setSumm(e.target.value)}></input>
      <input type={'text'} placeholder='Notes' className="add-input text" ref={notesRef} maxLength={100}></input>
      <button className="add-button" onClick={addTransaction}>Add</button>
    </div>

    <h2 className="mt-5 animated">Latest transactions:</h2>
    {latest.slice(0, 5).map(transaction => <LatestTransaction
      key={transaction.id}
      modalDelete={modalDelete}
      transaction={transaction}
      showModalDelete={showModalDelete}
      setShowModalDelete={setShowModalDelete} />)}
    <ConfirmRemove
      showModalDelete={showModalDelete}
      setShowModalDelete={setShowModalDelete}
      deleteTransaction={deleteTransaction} />
  </div>
}

export default AddTransaction