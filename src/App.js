import React, { useState, useEffect } from "react";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Charts from "./pages/Charts";
import Transactions from "./pages/Transactions";
import Insights from "./pages/Insights";
import { fetchTransactions } from "./api/api";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    fetchTransactions()
      .then((data) => {
        setTransactions(data);
        setLoading(false);
      })
      .catch(() => {
        console.log("Backend not connected → using local data");

        setTransactions([
          { id: 1, date: "2025-01-05", amount: 25000, category: "Salary", type: "income" },
          { id: 2, date: "2025-01-10", amount: 7000, category: "Rent", type: "expense" },
          { id: 3, date: "2025-01-15", amount: 7000, category: "Food", type: "expense" },
          { id: 4, date: "2025-01-18", amount: 5000, category: "Business", type: "income" },
          { id: 5, date: "2025-01-20", amount: 6000, category: "Shopping", type: "expense" },
          { id: 6, date: "2025-01-25", amount: 3500, category: "Transport", type: "expense" },
          { id: 7, date: "2025-02-05", amount: 27500, category: "Salary", type: "income" },
          { id: 8, date: "2025-02-08", amount: 6000, category: "Food", type: "expense" },
          { id: 9, date: "2025-02-10", amount: 7000, category: "Rent", type: "expense" },
          { id: 10, date: "2025-02-12", amount: 6000, category: "Business", type: "income" },
          { id: 11, date: "2025-02-14", amount: 5800, category: "Shopping", type: "expense" },
          { id: 12, date: "2025-02-17", amount: 4000, category: "Transport", type: "expense" },
          { id: 13, date: "2025-02-22", amount: 4000, category: "Bills", type: "expense" },
          { id: 14, date: "2025-03-03", amount: 30000, category: "Salary", type: "income" },
          { id: 15, date: "2025-03-09", amount: 6300, category: "Food", type: "expense" },
          { id: 16, date: "2025-03-10", amount: 7000, category: "Rent", type: "expense" },
          { id: 17, date: "2025-03-13", amount: 4500, category: "Business", type: "income" },
          { id: 18, date: "2025-03-18", amount: 5200, category: "Shopping", type: "expense" },
          { id: 19, date: "2025-03-25", amount: 4000, category: "Transport", type: "expense" },
          { id: 20, date: "2025-04-04", amount: 32500, category: "Salary", type: "income" },
          { id: 21, date: "2025-04-08", amount: 7400, category: "Food", type: "expense" },
          { id: 22, date: "2025-04-10", amount: 7000, category: "Rent", type: "expense" },
          { id: 23, date: "2025-04-13", amount: 6800, category: "Business", type: "income" },
          { id: 24, date: "2025-04-16", amount: 8500, category: "Shopping", type: "expense" },
          { id: 25, date: "2025-04-19", amount: 5000, category: "Transport", type: "expense" },
          { id: 26, date: "2025-04-21", amount: 4100, category: "Bills", type: "expense" }
        ]);

        setLoading(false);
      });
    }, []);

  if (!user) {
    return <Auth setUser={setUser} />;
  }

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading...</p>;
  }

  return (
    <div className="app">

      <div className="top-bar">
        <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
          {theme === "light" ? "🌙" : "☀️"}
        </button>

        <button
          onClick={() => {
            setUser(null);
            setTheme("light");
            localStorage.removeItem("theme");
          }}
        >
          Logout
        </button>
      </div>

      <Dashboard transactions={transactions} />

      <Transactions
        transactions={transactions}
        setTransactions={setTransactions}
        role={user.role}
      />

      <Insights transactions={transactions} />

      <Charts transactions={transactions} />

    </div>
  );
}

export default App;