import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "./context/Appcontext";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Charts from "./pages/Charts";
import Transactions from "./pages/Transactions";
import Insights from "./pages/Insights";
import Settings from "./pages/Settings";
import "./App.css";

function App() {
  const { user, setUser } = useContext(AppContext);

  const [showSettings, setShowSettings] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const closeMenu = () => setOpenMenu(false);
    window.addEventListener("click", closeMenu);
    return () => window.removeEventListener("click", closeMenu);
  }, []);

  useEffect(() => {
    if (user) {
      setShowSettings(false);
    }
  }, [user]);

  if (!user) return <Auth setUser={setUser} />;

  return (
    <div className="app">
      <div className="top-bar">
        <div className="role-switch">
          <button
            className={user.role === "admin" ? "active" : ""}
            onClick={() =>
              setUser({ ...user, role: "admin" })
            }
          >
            Admin
          </button>

          <button
            className={user.role === "user" ? "active" : ""}
            onClick={() =>
              setUser({ ...user, role: "user" })
            }
          >
            Viewer
          </button>
        </div>

        <div className="right-controls">
          <button
            className="theme-btn"
            onClick={() =>
              setTheme(theme === "light" ? "dark" : "light")
            }
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>

          <div
            className="profile-circle"
            onClick={(e) => {
              e.stopPropagation();
              setOpenMenu(!openMenu);
            }}
          >
            {user.name?.charAt(0).toUpperCase()}
          </div>

          {openMenu && (
            <div
              className="profile-dropdown"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="dropdown-header">
                <div className="dropdown-avatar">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="profile-name">{user.name}</p>
                  <p className="profile-email">
                    {user.email || "demo@gmail.com"}
                  </p>
                </div>
              </div>

              <div className="dropdown-divider"></div>

              <button
                className="dropdown-btn"
                onClick={() => {
                  setShowSettings(true);
                  setOpenMenu(false);
                }}
              >
                ⚙ Settings
              </button>
            </div>
          )}
        </div>
      </div>

      {showSettings ? (
        <Settings
          theme={theme}
          setTheme={setTheme}
          setShowSettings={setShowSettings}
        />
      ) : (
        <>
          <Dashboard />
          <Transactions />
          <Insights />
          <Charts />
        </>
      )}
    </div>
  );
}

export default App;