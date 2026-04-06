import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export function AppProvider({ children }) {

  const [user, setUser] = useState(null);

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved
      ? JSON.parse(saved)
      : [
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
        ];
  });

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  return (
    <AppContext.Provider value={{
      user,
      setUser,
      transactions,
      setTransactions
    }}>
      {children}
    </AppContext.Provider>
  );
}