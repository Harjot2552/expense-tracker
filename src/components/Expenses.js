import React, { useState } from 'react';

export default function Expenses() {
    const [expenseName, setExpenseName] = useState("");
    const [expenseAmount, setExpenseAmount] = useState("");
    const [expenseCategory, setexpenseCategory] = useState("");
    const [expenseDate, setexpenseDate] = useState("")
    const [expenses, setExpenses] = useState([])


    const handleOnChange = (e) => {
        setExpenseName(e.target.value);
    };

    const handleOnChangeForAmount = (e) => {
        setExpenseAmount(e.target.value);
    };
    const handleOnChangeForExpenseDate = (e) => {
        setexpenseDate(e.target.value);
    };
    const handleOnChangeForexpenseCategory = (e) => {
        setexpenseCategory(e.target.value);
    };

    const handleAddExpense = () => {
        if (expenseName && expenseAmount && expenseCategory && expenseDate) {
            setExpenses([{...expenses,
                name: expenseName, amount: expenseAmount, category: expenseCategory, date: expenseDate
            }])
        }


    }




    return (
        <div className='container'>
            <div className="mb-3">
                <label htmlFor="expenseName" className="form-label">Expense Name</label>
                <input
                    onChange={handleOnChange}
                    value={expenseName}
                    type="text"
                    className="form-control"
                    id="expenseName"
                    placeholder="Enter the name of the expense"
                />

                <label htmlFor="expenseAmount" className="form-label">Expense Amount</label>
                <input
                    onChange={handleOnChangeForAmount}
                    value={expenseAmount}
                    type="number"
                    className="form-control"
                    id="expenseAmount"
                    placeholder="Amount of the expense"
                />

                <select
                    onChange={handleOnChangeForexpenseCategory}
                    class="form-select"
                    aria-label="Default select example"
                    id='expenseCategory'
                    value={expenseCategory}
                >
                    <option selected>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </select>

                <label htmlFor="expenseDate" className="form-label">Expense Date</label>
                <input
                    onChange={handleOnChangeForExpenseDate}
                    value={expenseDate}
                    type="date"
                    className="form-control"
                    id="expenseDate"
                />


            </div>
            <button onClick={handleAddExpense} type='button' className="btn btn-primary">Add</button>

            <table id='table' className="table mt-3">
                <thead>
                    <tr>
                        <th scope="col">Expense Name</th>
                        <th scope="col">Expense Amount</th>
                        <th scope="col">Expense Category</th>
                        <th scope="col">Expense Date</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                {expenses.map((expense, index)=>(
                <tr key={index}>
                    <td>{expense.name}</td>
                    <td>{expense.amount}</td>
                    <td>{expense.date}</td>
                    <td>{expense.category}</td>
                </tr>
                ))}
                </tbody>
            </table>


            <div className="mt-3">
                <h4>Total Spent</h4>
            </div>
        </div>
    );
}
