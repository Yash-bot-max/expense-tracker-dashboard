import './TransactionList.css'
import { MdOutlineEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaUtensils } from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";
import { FaCar } from "react-icons/fa";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { FaHeartbeat } from "react-icons/fa";
import { FaGraduationCap } from "react-icons/fa";
import { FaPlane } from "react-icons/fa";
import { FaLaptop } from "react-icons/fa";
import { FaEllipsisH } from "react-icons/fa";

const TransactionList = ({ sortedTransactions, handleEdit,
    handleDelete }) => {

    const categoryIcons = {
        Food: <FaUtensils />,
        Shopping: <FaShoppingBag />,
        Transportation: <FaCar />,
        "Bills & Utilities": <FaFileInvoiceDollar />,
        Health: <FaHeartbeat />,
        Education: <FaGraduationCap />,
        Travel: <FaPlane />,
        Technology: <FaLaptop />,
        Other: <FaEllipsisH />,
    };
    const formatAmount = (amount) => {
        const num = Number(amount);

        if (num > 10000000) {
            return `₹${(num / 10000000).toFixed(1).replace(".0", "")}Cr`;
        }

        if (num > 100000) {
            return `₹${(num / 100000).toFixed(1).replace(".0", "")}L`;
        }

        if (num > 1000) {
            return `₹${(num / 1000).toFixed(1).replace(".0", "")}K`;
        }

        return `₹${num}`;
    };
    return (
        <div>
            <div className="transaction-list">
                {sortedTransactions.length > 0 ? (
                    sortedTransactions.map((transaction) => {
                        return (
                            <div
                                key={transaction.id}
                                className={`transaction-card ${transaction.type.toLowerCase()}`}
                            >

                                <div className="top">
                                    <div className="category-icon">
                                        {categoryIcons[transaction.category]}
                                    </div>

                                    <div>
                                        <h3>
                                            {transaction.description.charAt(0).toUpperCase() +
                                                transaction.description.slice(1)}
                                        </h3>

                                        <small>
                                            <p>{transaction.category}--</p>

                                            {transaction.date.includes("T")
                                                ? new Date(transaction.date).toLocaleString()
                                                : new Date(
                                                    transaction.date + "T00:00:00"
                                                ).toLocaleDateString("en-GB")
                                            }
                                        </small>
                                    </div>
                                </div>

                                <div className="side">

                                    <div className="amount-type">
                                        <h2 className="amount">
                                            <span className="full-amount">
                                                ₹{transaction.amount}
                                            </span>

                                            <span className="short-amount">
                                                {formatAmount(transaction.amount)}
                                            </span>
                                        </h2>

                                        <p className="type">
                                            {transaction.type}
                                        </p>
                                    </div>

                                    <div className="actions">
                                        <button
                                            onClick={() => handleEdit(transaction.id)}
                                            className="edit-btn"
                                        >
                                            <MdOutlineEdit size={20} />
                                        </button>

                                        <button
                                            onClick={() => handleDelete(transaction.id)}
                                            className="delete-btn"
                                        >
                                            <MdDelete size={20} />
                                        </button>
                                    </div>

                                </div>

                            </div>
                        );
                    })
                ) : (
                    <div className="no-results">
                        <div className="no-results-icon">🔍</div>

                        <h3>No Transactions Found</h3>

                        <p>
                            No transaction matches your current search or filters.
                        </p>
                    </div>
                )}
            </div>
        </div >
    )
}

export default TransactionList
