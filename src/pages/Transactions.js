import React, { useState } from "react";
import {
  addTransactionApi,
  deleteTransactionApi,
} from "../api/api";

function Transactions({ transactions, setTransactions, role }) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("expense");

  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");

  const [editingId, setEditingId] = useState(null);

  const addTransaction = async () => {
    if (!amount || !category) {
      alert("Please fill all fields");
      return;
    }

    const newTx = {
      date: new Date().toISOString().split("T")[0],
      amount: Number(amount),
      category,
      type,
    };

    if (editingId) {
      const updated = transactions.map((t) =>
        t.id === editingId ? { ...t, ...newTx, id: editingId } : t
      );

      setTransactions(updated);
      setEditingId(null);
    } else {
      try {
        const saved = await addTransactionApi(newTx);
        setTransactions([...transactions, saved]);
      } catch {
        const localTx = { ...newTx, id: Date.now() };
        setTransactions([...transactions, localTx]);
      }
    }

    setAmount("");
    setCategory("");
    setType("expense");
  };

  const deleteTransaction = async (id) => {
    try {
      await deleteTransactionApi(id);
      setTransactions(transactions.filter((t) => t.id !== id));
    } catch {
      setTransactions(transactions.filter((t) => t.id !== id));
    }
  };

  const handleEdit = (t) => {
    setAmount(t.amount);
    setCategory(t.category);
    setType(t.type);
    setEditingId(t.id);
  };

  const filteredTransactions = transactions
    .filter((t) => {
      if (!search) return true;

      if (filterType === "date") return t.date.includes(search);
      if (filterType === "month") return t.date.slice(0, 7).includes(search);

      return t.category.toLowerCase().includes(search.toLowerCase());
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 8);

  return (
    <div className="section">

      <h3>Transactions</h3>

      <div className="form">
        <input
          placeholder={
            filterType === "date"
              ? "Search date (YYYY-MM-DD)"
              : filterType === "month"
              ? "Search month (YYYY-MM)"
              : "Search category..."
          }
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="all">All</option>
          <option value="date">By Date</option>
          <option value="month">By Month</option>
        </select>
      </div>

      {role === "admin" && (
        <div className="form">
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <input
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>

          <button onClick={addTransaction}>
            {editingId ? "Update" : "Add"}
          </button>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Type</th>
            {role === "admin" && <th>Actions</th>}
          </tr>
        </thead>

        <tbody>
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((t) => (
              <tr key={t.id}>
                <td>{t.date}</td>
                <td>₹{t.amount}</td>
                <td>{t.category}</td>
                <td>{t.type}</td>

                {role === "admin" && (
                  <td>
                    <button onClick={() => handleEdit(t)}>Edit</button>
                    <button onClick={() => deleteTransaction(t.id)}>
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No transactions found</td>
            </tr>
          )}
        </tbody>
      </table>

    </div>
  );
}

export default Transactions;