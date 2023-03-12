import Categories from "../addIncomes/Categories"

function AddPlanedTransaction({categories, setType, type, typeRef, categoryRef, notesRef, summ, setSumm, addTransaction}) {
  return <>
        <select ref={typeRef} onChange={() => setType(typeRef.current.value)}>
          <option value={''}>Type</option>
          <option value={1}>Income</option>
          <option value={0}>Expense</option>
        </select>
        <select ref={categoryRef} disabled={type === ''}>
          <option value={''}>Category</option>
          {(type === '1' ? categories.filter(el => el.category_type === 1) : categories.filter(el => el.category_type === 0)).map(category => <Categories category={category} key={category.category_name}/>)}   
        </select>
        <input type={'number'} placeholder='Summ' value={summ} onChange={(e) => setSumm(e.target.value)}></input>
        <input type={'text'} placeholder='Notes' maxLength={'100'} ref={notesRef}></input>
        <button onClick={addTransaction}>Add</button>
        </>
}

export default AddPlanedTransaction