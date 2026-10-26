
import "./Dashboard Summary.css"
import walletIcon from '../assets/wallet.png';
import { IoWallet } from "react-icons/io5";
import { FiTrendingUp } from "react-icons/fi";
import { FiTrendingDown } from "react-icons/fi";


const DashboardSummary = ({ transactions, darkMode, setDarkMode }) => {

  const income = transactions.filter(transaction => transaction.type === "Income").reduce((total, transaction) => total + Number(transaction.amount), 0);

  const expense = transactions.filter(transaction => transaction.type === "Expense").reduce((total, transaction) => total + Number(transaction.amount), 0);

  const balance = income - expense;

  const hasLargeAmount =
    String(Math.abs(balance)).length >= 8 ||
    String(income).length >= 8 ||
    String(expense).length >= 8;

  return (
    <>
      <nav>

        <div className='set'>

          <img src={walletIcon} alt="Wallet" />

          <div>
            <h1>Expense Tracker</h1>
            <p>Track your income and expense and take control of your finances.</p>
          </div>

        </div>

        <button
          className="theme-btn"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>



      </nav>

      <main>

        <div className="hero">

          <div className={`inquiry ${hasLargeAmount ? "large-amount" : ""}`}>

            <div className={`card balance  ${hasLargeAmount ? "large-amount" : ""}`}>

              <div className="icon">
                <IoWallet size={40} />
              </div>

              <div className="inner">
                <p>Balance</p>
                <div className="value">₹{balance}</div>
                <p>Income-Expense</p>
              </div>

            </div>

            <div className={`card income  ${hasLargeAmount ? "large-amount" : ""}`}>

              <div className="icon">
                <FiTrendingUp size={40} />
              </div>

              <div className="inner">
                <p>Income</p>
                <div className="value">₹{income}</div>
                <p>Total Income</p>
              </div>

            </div>

            <div className={`card expence ${hasLargeAmount ? "large-amount" : ""} `}>

              <div className="icon">
                <FiTrendingDown size={40} />
              </div>

              <div className="inner">
                <p>Expense</p>
                <div className="value">₹{expense}</div>
                <p>Total Expense</p>
              </div>

            </div>

          </div>

        </div>

      </main>

    </>
  )
}

export default DashboardSummary
