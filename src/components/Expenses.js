import React, { useEffect, useState } from "react";

export default function Expenses() {
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("");
  const [expenseDate, setExpenseDate] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [currencyRates, setCurrencyRates] = useState({});
  const [selectedCurrency, setSelectedCurrency] = useState("USD");

  useEffect(() => {
    const fetchCurrencyRates = async () => {
      const apiUrl = `https://api.currencyapi.com/v3/latest?apikey=cur_live_zTf2ZYghFVtK8XLESQBRg5YjN30Pekz2LfIth5X3&base_currency=USD`;
      const response = await fetch(apiUrl);
      const result = await response.json();
      setCurrencyRates(result.data);
    };

    fetchCurrencyRates();
  }, []);

  const handleOnChange = (e) => {
    setExpenseName(e.target.value);
  };

  const handleOnChangeForAmount = (e) => {
    setExpenseAmount(e.target.value);
  };

  const handleOnChangeForExpenseDate = (e) => {
    setExpenseDate(e.target.value);
  };

  const handleOnChangeForExpenseCategory = (e) => {
    setExpenseCategory(e.target.value);
  };

  const handleAddExpense = () => {
    if (expenseName && expenseAmount && expenseCategory && expenseDate) {
      setExpenses([
        ...expenses,
        {
          name: expenseName,
          originalAmount: parseFloat(expenseAmount),
          amount: parseFloat(expenseAmount),
          category: expenseCategory,
          date: expenseDate,
        },
      ]);
    }
    setExpenseName("");
    setExpenseAmount("");
    setExpenseDate("");
    setExpenseCategory("");
  };

  const calculateTotal = () => {
    return expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0).toFixed(2);
  };

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
    <div className="container mt-4">
      <div className="row g-3">
        <div className="col-md-6">
          <label htmlFor="expenseName" className="form-label ">Expense Name</label>
          <input
            onChange={handleOnChange}
            value={expenseName}
            type="text"
            className="form-control"
            id="expenseName"
            placeholder="Enter the name of the expense"
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="expenseAmount" className="form-label">
            Expense Amount
          </label>
          <input
            onChange={handleOnChangeForAmount}
            value={expenseAmount}
            type="number"
            className="form-control"
            id="expenseAmount"
            placeholder="Amount of the expense"
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="expenseCategory" className="form-label">
            Expense Category
          </label>
          <select
            onChange={handleOnChangeForExpenseCategory}
            className="form-select"
            id="expenseCategory"
            value={expenseCategory}
          >
            <option defaultValue>Choose a category</option>
            <option value="Housing">Housing</option>
            <option value="Insurance">Insurance</option>
            <option value="Food">Food</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Health care">Health care</option>
            <option value="Gas">Gas</option>
            <option value="Clothing">Clothing</option>
            <option value="Pet">Pet</option>
          </select>
        </div>
        <div className="col-md-6">
          <label htmlFor="expenseDate" className="form-label">
            Expense Date
          </label>
          <input
            onChange={handleOnChangeForExpenseDate}
            value={expenseDate}
            type="date"
            className="form-control"
            id="expenseDate"
          />
        </div>
      </div>
      <button onClick={handleAddExpense} type="button" className="btn btn-primary mt-3">
        Add Expense
      </button>

      <div className="mt-4">
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
      </div>

      <table id="table" className="table mt-4 table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th scope="col">Expense Name</th>
            <th scope="col">Expense Amount ({selectedCurrency})</th>
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
              <td>{expense.category}</td>
              <td>{expense.date}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteExpense(index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-3">
        <h4>Total Spent: {selectedCurrency} {calculateTotal()}</h4>
      </div>
    </div>
  );
}
