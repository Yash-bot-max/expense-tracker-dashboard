import { useState } from "react";
import "./Auth.css";

const API_URL = "https://expense-tracker-dashboard-1-rm03.onrender.com/auth";

function Auth({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const endpoint = isLogin ? "/login" : "/signup";

      const payload = isLogin
        ? {
            email: formData.email,
            password: formData.password,
          }
        : formData;

      const response = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const responseText = await response.text();

      console.log("Status:", response.status);
      console.log("Response:", responseText);

      let result;

      try {
        result = JSON.parse(responseText);
      } catch {
        console.error("Invalid JSON response:", responseText);

        throw new Error(
          `Server returned non-JSON response. Status: ${response.status}. Check Console.`,
        );
      }

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Authentication failed");
      }

      if (isLogin) {
        onLogin({
          user: result.user,
        });
      } else {
        setIsLogin(true);

        setFormData({
          name: "",
          email: formData.email,
          password: "",
        });

        alert("Account created successfully! Please log in.");
      }
    } catch (error) {
      setError(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-brand">
          Expense<span>Flow</span>
        </div>

        <h1>{isLogin ? "Welcome back!" : "Create your account"}</h1>

        <p className="auth-subtitle">
          {isLogin
            ? "Log in to manage your finances."
            : "Start tracking your income and expenses."}
        </p>

        <div className="auth-tabs">
          <button
            type="button"
            className={isLogin ? "auth-tab active" : "auth-tab"}
            onClick={() => {
              setIsLogin(true);
              setError("");
            }}
          >
            Login
          </button>

          <button
            type="button"
            className={!isLogin ? "auth-tab active" : "auth-tab"}
            onClick={() => {
              setIsLogin(false);
              setError("");
            }}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="auth-field">
              <label htmlFor="auth-name">Full Name</label>

              <input
                id="auth-name"
                name="name"
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
                autoComplete="name"
              />
            </div>
          )}

          <div className="auth-field">
            <label htmlFor="auth-email">Email Address</label>

            <input
              id="auth-email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />
          </div>

          <div className="auth-field">
            <label htmlFor="auth-password">Password</label>

            <input
              id="auth-password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete={isLogin ? "current-password" : "new-password"}
            />
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="auth-submit" disabled={loading}>
            {loading
              ? "Please wait..."
              : isLogin
                ? "Login to Dashboard"
                : "Create Account"}
          </button>
        </form>

        <p className="auth-footer">Your finances, organized in one place.</p>
      </div>
    </div>
  );
}

export default Auth;
