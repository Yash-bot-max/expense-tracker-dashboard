// import DashboardSummary from "./component/Dashboard Summary"
// import Transactions from "./component/Transactions"
// import { useState, useEffect } from "react";
// import "./App.css"

// function App() {

//   // transactions stores the current array of all transactions.
//   // setTransactions updates the transactions state, which causes React to re-render the UI with the updated data.
//   // Initialize transactions from localStorage, or use an empty array if no data exists.
//   const [transactions, setTransactions] = useState(
//     JSON.parse(localStorage.getItem("transaction")) || []);

//   useEffect(() => {
//     localStorage.setItem("transaction", JSON.stringify(transactions));
//   }, [transactions]);

//   // Initialize the dark mode state using the user's saved preference from localStorage.
//   // If no preference is saved, dark mode is enabled by default.
//   const [darkMode, setDarkMode] = useState(
//     JSON.parse(localStorage.getItem("darkMode")) ?? true
//   );

//   // Save the current dark/light mode preference to localStorage whenever it changes.
//   useEffect(() => {
//     localStorage.setItem("darkMode", JSON.stringify(darkMode));
//   }, [darkMode]);

//   // Apply the corresponding theme class to the body whenever the theme changes.
//   useEffect(() => {
//     document.body.className = darkMode ? "dark-body" : "light-body";
//   }, [darkMode]);

//   return (
//     <>

//       <div className={darkMode ? "app dark" : "app light"}>

//         <DashboardSummary
//           darkMode={darkMode}
//           setDarkMode={setDarkMode}
//           transactions={transactions}
//         />

//         <Transactions
//           transactions={transactions}
//           setTransactions={setTransactions}
//         />

//       </div>

//     </>
//   )
// }

// export default App

import DashboardSummary from "./component/Dashboard Summary";
import Transactions from "./component/Transactions";
import { useState, useEffect } from "react";
import "./App.css";

const API_URL = "http://localhost:5000/transactions";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTransactions = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/get-transaction`);

      if (!response.ok) {
        throw new Error("Failed to fetch transactions");
      }

      const result = await response.json();

      setTransactions(
        result.data.map((transaction) => ({
          ...transaction,
          id: transaction._id,
        })),
      );
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setError("Unable to load transactions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // Dark mode preference.
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) ?? true,
  );

  // Save dark mode preference.
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  // Apply theme to the body.
  useEffect(() => {
    document.body.className = darkMode ? "dark-body" : "light-body";
  }, [darkMode]);

  return (
    <div className={darkMode ? "app dark" : "app light"}>
      {" "}
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

          <button onClick={fetchTransactions} className="retry-btn" disabled={loading} >
            {loading ? "Retrying..." : "Try Again"}
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
