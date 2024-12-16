import React, { useEffect, useState } from "react";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

export default function Expenses() {
    const [expenseName, setExpenseName] = useState("");
    const [expenseAmount, setExpenseAmount] = useState("");
    const [expenseCategory, setExpenseCategory] = useState("");
    const [expenseDate, setExpenseDate] = useState("");
    const [expenses, setExpenses] = useState([]);
    const [selectedCurrency, setSelectedCurrency] = useState("USD");
    const [currencyRate, setCurrencyRate] = useState([]);

    const handleOnChange = (e) => setExpenseName(e.target.value);;
    const handleOnChangeForAmount = (e) => setExpenseAmount(e.target.value);
    const handleOnChangeForExpenseDate = (e) => setExpenseDate(e.target.value);
    const handleOnChangeForExpenseCategory = (e) =>setExpenseCategory(e.target.value);
    const handleSelectedCurrency = (e) => { setSelectedCurrency(e.target.value); convertExpense(e.target.value) }

    const fetchCurrencyRates = async () => {
        const apiUrl = `https://api.currencyapi.com/v3/latest?apikey=cur_live_B1WwVRzOVeuPLPPrCzAhIPGvawR9dICdOIKSeNj1&base_currency=USD`;
        const response = await fetch(apiUrl);
        const result = await response.json();
        setCurrencyRate(result.data);
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
        let total = 0;
        expenses.map((exp)=>(
            total += exp.amount
        ));
        return total;
    };

    const convertExpense = (currency) => {
        if ( currency && currencyRate[currency]) {
            const conversionRate = currencyRate[currency].value;
            console.log(conversionRate);
            const convertedAmount = expenses.map((expense) => (
                {
                    ...expense,
                    amount: (expense.originalAmount * conversionRate).toFixed(2)
                }
            ));
            console.log(convertedAmount);
            setExpenses(convertedAmount)
        }
    }

    const handleDeleteExpense = (index) => {
        const newExpenses = [...expenses];
        newExpenses.splice(index, 1);
        setExpenses(newExpenses);
    };

    useEffect(() => {
        fetchCurrencyRates();
    }, []);


    const categoryTotals = expenses.reduce((totals, expense) => {
        totals[expense.category] = (totals[expense.category] || 0) + parseFloat(expense.amount);
        return totals;
      }, {});
      
    return (
        <div className="container mt-4">
            <div className="row g-3">
                <div className="col-md-6">
                    <label htmlFor="expenseName" className="form-label fw-bold">Expense Name</label>
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
                    <label htmlFor="expenseAmount" className="form-label fw-bold">
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
                    <label htmlFor="expenseCategory" className="form-label fw-bold">
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
                    <label htmlFor="expenseDate" className="form-label fw-bold">
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
                <label htmlFor="currencyConvert" className="form-label fw-bold">
                    Convert To:
                </label>
                <select
                    onChange={handleSelectedCurrency}
                    className="form-select w-auto"
                    id="currencyConvert"
                    value={selectedCurrency}
                >
                    <option defaultValue>USD</option>
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
