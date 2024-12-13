import React, { useState } from 'react'

export default function Expenses() {
    const [expenseName, setexpenseName] = useState("");
    const [expenseAmount, setexpenseAmount] = useState(0)


    const handleOnChange =(e)=>{
        e.preventDefault();
        setexpenseName(e.target.value);
        setexpenseAmount(e.target.value)
    }

    const handleAddExpense = ()=>{

    }
    return (
        <div className='container'>
            <div className="mb-3">
                <label htmlFor="formGroupExampleInput" className="form-label">Example label</label>
                <input onChange={handleOnChange} value={expenseName} type="text" className="form-control" id="expenseName" placeholder="Enter the name of the expense" />
                <input onChange={handleOnChange} value={expenseAmount} type="number" className="form-control" id="expenseName" placeholder="Amount of the expense" />
            </div>
            <button onClick={handleAddExpense} type='button'>Add</button>
        </div>
    )
}
