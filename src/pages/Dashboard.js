import React, { useContext } from "react";
import { AppContext } from "../context/Appcontext";

function Dashboard() {
  const { transactions } = useContext(AppContext);

  const income = transactions
    .filter(t => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expense = transactions
    .filter(t => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  const balance = income - expense;

  return (
    <div className="dashboard">
      <div className="card">Balance: ₹{balance}</div>
      <div className="card">Income: ₹{income}</div>
      <div className="card">Expense: ₹{expense}</div>
    </div>
  );
}

export default Dashboard;