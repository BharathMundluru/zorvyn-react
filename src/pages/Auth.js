import React, { useState } from "react";
import { loginWithGoogle } from "../api/loginapi";

function Auth({ setUser }) {
  const [isSignup, setIsSignup] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!username || !password) {
      setError("Please fill all fields");
      return;
    }

    if (isSignup && password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    setError("");

    if (!isSignup) {
      if (username === "admin" && password === "admin123") {
        setUser({ name: "Admin", role: "admin" });
      } else if (username === "viewer" && password === "viewer123") {
        setUser({ name: "Viewer", role: "user" });
      } else {
        setError("Invalid credentials");
      }
    } else {
      setUser({ name: username, role: "user" });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const user = await loginWithGoogle();
      setUser(user);
    } catch {
      setError("Google login failed");
    }
  };

  return (
    <div className="login-container">

      <div className="login-box">

        <div className="avatar">👤</div>

        <h2>{isSignup ? "SIGN UP" : "USER LOGIN"}</h2>

        {error && <p className="error">{error}</p>}

        <div className="input-box">
          <span>👤</span>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="input-box">
          <span>🔒</span>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {isSignup && (
          <div className="input-box">
            <span>🔒</span>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>
        )}

        <button className="login-btn" onClick={handleSubmit}>
          {isSignup ? "SIGN UP" : "LOGIN"}
        </button>

        <button className="google-btn" onClick={handleGoogleLogin}>
          🔵 Continue with Google
        </button>

        <p className="switch">
          {isSignup ? "Already have an account?" : "New user?"}
          <span onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? " Login" : " Sign Up"}
          </span>
        </p>

        {!isSignup && (
          <div className="demo-accounts">
            <p>Demo Accounts:</p>
            <p><b>Admin:</b> admin / admin123</p>
            <p><b>Viewer:</b> viewer / viewer123</p>
          </div>
        )}

      </div>
    </div>
  );
}

export default Auth;