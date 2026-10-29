import { useState, useEffect, useCallback } from "react";
import DashboardSummary from "./component/Dashboard Summary";
import Transactions from "./component/Transactions";
import Auth from "./component/Auth";
import "./App.css";

const API_URL =
  "https://expense-tracker-dashboard-1-rm03.onrender.com/transactions";

function App() {
  const [auth, setAuth] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [authChecking, setAuthChecking] = useState(true);

  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode") ?? "true"),
  );

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    document.body.className = darkMode ? "dark-body" : "light-body";
  }, [darkMode]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(
          "https://expense-tracker-dashboard-1-rm03.onrender.com/auth/me",
          {
            credentials: "include",
          },
        );

        const result = await response.json();

        if (response.ok) {
          setAuth({
            user: result.user,
          });
        } else {
          setAuth(null);
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        setAuth(null);
      } finally {
        setAuthChecking(false);
      }
    };

    checkAuth();
  }, []);

  const fetchTransactions = useCallback(async () => {
    if (!auth?.user) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/get-transaction`, {
        credentials: "include",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch transactions");
      }

      setTransactions(
        result.data.map((transaction) => ({
          ...transaction,
          id: transaction._id,
        })),
      );
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setError(error.message || "Unable to load transactions.");
    } finally {
      setLoading(false);
    }
  }, [auth?.user]);

  useEffect(() => {
    if (auth?.user) {
      fetchTransactions();
    } else {
      setTransactions([]);
      setLoading(false);
      setError("");
    }
  }, [auth?.user, fetchTransactions]);

  const handleLogin = (loginData) => {
    setTransactions([]);
    setAuth(loginData);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(
        "https://expense-tracker-dashboard-1-rm03.onrender.com/auth/logout",
        {
          method: "POST",
          credentials: "include",
        },
      );

      if (!response.ok) {
        console.error("Backend logout failed");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setAuth(null);
      setTransactions([]);
      setError("");
    }
  };

  if (authChecking) {
    return <p>Checking authentication...</p>;
  }
  if (!auth) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <div className={darkMode ? "app dark" : "app light"}>
      <header className="user-header">
        <div>
          <span className="user-welcome">Welcome back, </span>
          <strong>{auth.user.name}</strong>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <DashboardSummary
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        transactions={transactions}
      />

      {loading ? (
        <div className="app-loading">
          <div className="loading-spinner"></div>
          <p>Loading your transactions...</p>
        </div>
      ) : error ? (
        <div className="app-error">
          <p>{error}</p>

          <button
            onClick={fetchTransactions}
            className="retry-btn"
            disabled={loading}
          >
            Try Again
          </button>
        </div>
      ) : (
        <Transactions
          transactions={transactions}
          setTransactions={setTransactions}
        />
      )}
    </div>
  );
}

export default App;
