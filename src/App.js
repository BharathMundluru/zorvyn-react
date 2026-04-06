import React, { useEffect, useContext, useState } from "react";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Charts from "./pages/Charts";
import Transactions from "./pages/Transactions";
import Insights from "./pages/Insights";
import { AppContext } from "./context/Appcontext";
import "./App.css";

function App() {

  const { user, setUser } = useContext(AppContext);

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  if (!user) {
    return <Auth setUser={setUser} />;
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
            localStorage.removeItem("token");
            setTheme("light");
          }}
        >
          Logout
        </button>
      </div>

      <Dashboard />
      <Transactions />
      <Insights />
      <Charts />

    </div>
  );
}

export default App;