import React, { useContext, useState } from "react";
import { AppContext } from "../context/Appcontext";

function Settings({ theme, setTheme, setShowSettings }) {

  const { user, setUser } = useContext(AppContext);

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const handlePasswordUpdate = () => {
    if (!password || !confirm) {
      setError("Please fill both fields");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    alert("Password updated (UI only)");

    setPassword("");
    setConfirm("");
  };

  return (
    <div className="settings-container">

      <div className="settings-card">

        <h2>Settings</h2>

        <div className="setting-item">
          <label>Username</label>
          <p>{user.name}</p>
        </div>

        <div className="setting-item">
          <label>Email</label>
          <p>{user.email || "demo@gmail.com"}</p>
        </div>

        <div className="setting-item">
          <label>Change Password</label>

          <br/>

          <div className="password-box">
            <input
              type="password"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <br/>

          <div className="password-box">
            <input
              type="password"
              placeholder="Confirm password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>

          <br/>

          {error && <p className="error">{error}</p>}

          <button onClick={handlePasswordUpdate}>
            Update Password
          </button>
        </div>

        <div className="setting-item">
          <label>Theme</label>
          <button
            onClick={() =>
              setTheme(theme === "light" ? "dark" : "light")
            }
          >
            Switch to {theme === "light" ? "Dark" : "Light"}
          </button>
        </div>

        <div className="setting-actions">

          <button
            className="home-btn"
            onClick={() => setShowSettings(false)}
          >
            ⬅ Home
          </button>

          <button
            className="logout-btn"
            onClick={() => {
              setUser(null);
              localStorage.removeItem("token");
            }}
          >
            Logout
          </button>

        </div>

      </div>

    </div>
  );
}

export default Settings;