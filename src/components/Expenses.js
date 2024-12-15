import React, { useEffect, useState } from 'react';

export default function Expenses() {
    const [expenseName, setExpenseName] = useState("");
    const [expenseAmount, setExpenseAmount] = useState("");
    const [expenseCategory, setexpenseCategory] = useState("");
    const [expenseDate, setexpenseDate] = useState("")
    const [expenses, setExpenses] = useState([])
    
  const [currencyRates, setCurrencyRates] = useState({});
  const [selectedCurrency, setSelectedCurrency] = useState("USD");



    useEffect(() => {
        let fetchCurrency = async () => {
            let api_url = `https://api.currencyapi.com/v3/latest?apikey=cur_live_zTf2ZYghFVtK8XLESQBRg5YjN30Pekz2LfIth5X3&base_currency=USD`

            const response = await fetch(api_url)
            const result = await response.json()
            console.log(result)
        }

        fetchCurrency();




    }, [])

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
          setExpenses([
            ...expenses,
            {
              name: expenseName,
              originalAmount: parseFloat(expenseAmount), // Save the original amount
              amount: parseFloat(expenseAmount),
              category: expenseCategory,
              date: expenseDate,
            },
          ]);
        }
        setExpenseName("");
        setExpenseAmount("");
        setexpenseDate("");
        setexpenseCategory("");
      };

    const calculateTotal = () => {
        let total = 0;
        expenses.forEach((expense) => (
            total += expense.amount

        ))

        return total;
    }


    const handleCurrencyChange = (e) => {
        const newCurrency = e.target.value;
        setSelectedCurrency(newCurrency);
      };

    useEffect(() => {
        if (selectedCurrency && currencyRates[selectedCurrency]) {
          const conversionRate = currencyRates[selectedCurrency].value;
          const convertedExpenses = expenses.map((expense) => ({
            ...expense,
            amount: (expense.originalAmount * conversionRate).toFixed(2),
          }));
          setExpenses(convertedExpenses);
        }
      }, [selectedCurrency, currencyRates]);
    


    const handleDeleteExpense = (index) => {
        const newExpenses = [...expenses];
        newExpenses.splice(index, 1);
        setExpenses(newExpenses);
    };



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
                <label htmlFor="expenseCategory" className="form-label">Expense Category</label>
                <select
                    onChange={handleOnChangeForexpenseCategory}
                    className="form-select"
                    aria-label="Default select example"
                    id='expenseCategory'
                    value={expenseCategory}
                >
                    <option defaultValue>Open this select menu</option>
                    <option value="Housing">Housing</option>
                    <option value="Insurance">Insurance</option>
                    <option value="Food">Food</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Health care">Health care</option>
                    <option value="Gas">Gas</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Pet">Pet</option>
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


            <label htmlFor="currencyConvert" className="form-label">
          Convert To:
        </label>
        <select
          onChange={handleCurrencyChange}
          className="form-select w-auto"
          id="currencyConvert"
          value={selectedCurrency}
        >
          <option value="USD">USD</option>
          <option value="CAD">CAD</option>
          <option value="EUR">EUR</option>
          <option value="INR">INR</option>
        </select>

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
                    {expenses.map((expense, index) => (
                        <tr key={index}>
                            <td>{expense.name}</td>
                            <td>{expense.amount}</td>
                            <td>{expense.date}</td>
                            <td>{expense.category}</td>
                            <td>
                                <button className='btn btn-danger' onClick={() => handleDeleteExpense(index)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>


            <div className="mt-3">
                <h4>Total Spent: ${calculateTotal()}</h4>
            </div>
        </div>
    );
}
