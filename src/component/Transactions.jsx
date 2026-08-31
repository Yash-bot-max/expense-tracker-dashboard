import React, { useState } from 'react'
import "./Transactions.css"
import { useForm } from 'react-hook-form'
import TransactionsForm from './TransactionsForm';
import TransactionFilter from './TransactionFilter';
import TransactionList from './TransactionList';
import PiechartComponent from './PiechartComponent';

const Transactions = ({ transactions, setTransactions }) => {

    const [SearchValue, setSearchValue] = useState("")
    const [EditId, setEditId] = useState(null)
    const [CategoryFilter, setCategoryFilter] = useState("All");
    const [TypeFilter, setTypeFilter] = useState("All");
    const [Sort, setSort] = useState("All")
    const [FromDate, setFromDate] = useState("")
    const [ToDate, setToDate] = useState("")


    // Extract form handling methods and validation errors from React Hook Form.
    const {
        register,
        handleSubmit,
        watch,
        reset,
        setValue,
        formState: { errors },
    } = useForm()


    // Find the transaction that matches the selected transaction ID.
    const handleEdit = (taskId) => {
        const transaction = transactions.find(t => t.id === taskId);

        // If the transaction exists, load its data into the edit form.
        if (transaction) {

            // Store the ID of the transaction currently being edited.
            setEditId(taskId);

            // Set the existing transaction values in the form fields.
            setValue("amount", transaction.amount);
            setValue("description", transaction.description);
            setValue("type", transaction.type);
            setValue("category", transaction.category);
            setValue("date", transaction.date);
        }
    };

    // Delete the transaction with the matching ID and update the transactions state.
    const handleDelete = (taskId) => {
        const newTransactions = transactions.filter(
            transactions => transactions.id !== taskId
        );
        setTransactions(newTransactions);
    };



    // Filter transactions based on search, category, type, and date range.
    const filteredTransactions = transactions.filter(transaction => {

        // Check whether the transaction description matches the search input.
        const matchesSearch = transaction.description
            .toLowerCase()
            .includes(SearchValue.toLowerCase());

        // Check whether the transaction matches the selected category.
        const matchesCategory =
            CategoryFilter === "All" || transaction.category === CategoryFilter;

        // Check whether the transaction matches the selected transaction type.
        const matchesType =
            TypeFilter === "All" || transaction.type === TypeFilter;

        // Set the end date to the last millisecond of the selected day.
        const endDate = new Date(ToDate);
        endDate.setHours(23, 59, 59, 999);

        // Check whether the transaction date falls within the selected date range.
        const mathesDate =
            (FromDate !== ""
                ? new Date(transaction.date) >= new Date(FromDate)
                : true) &&
            (ToDate !== ""
                ? new Date(transaction.date) <= endDate
                : true);

        // Keep the transaction only if it passes all the selected filters.
        return matchesSearch && matchesCategory && matchesType && mathesDate;
    });


    // Create a copy of the filtered transactions so the original array is not modified.
    let sortedTransactions = [...filteredTransactions];

    // Keep the current order when no sorting option is selected.
    if (Sort === "All") {
        sortedTransactions = sortedTransactions;
    }

    // Sort transactions from oldest to newest based on their date.
    if (Sort === "newest") {
        sortedTransactions.sort(
            (a, b) => new Date(a.date) - new Date(b.date)
        );
    }

    // Sort transactions from newest to oldest based on their date.
    if (Sort === "oldest") {
        sortedTransactions.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
        );
    }

    // Sort transactions from highest to lowest amount.
    if (Sort === "highest") {
        sortedTransactions.sort((a, b) => b.amount - a.amount);
    }

    // Sort transactions from lowest to highest amount.
    if (Sort === "lowest") {
        sortedTransactions.sort((a, b) => a.amount - b.amount);
    }


    // Find  how many filter are applied on transaction-list
    const active = (CategoryFilter !== "All" ? 1 : 0) + (TypeFilter !== "All" ? 1 : 0) + (Sort !== "All" ? 1 : 0) + (FromDate !== "" || ToDate !== "" ? 1 : 0)

    return (
        <>
            <div className="section">

                <TransactionsForm setTransactions={setTransactions} setEditId={setEditId} EditId={EditId} handleSubmit={handleSubmit} register={register} errors={errors} reset={reset} />

                {transactions.length > 0 ? (
                    <div className="recent">

                        <TransactionFilter setSearchValue={setSearchValue} SearchValue={SearchValue} setCategoryFilter={setCategoryFilter} CategoryFilter={CategoryFilter} TypeFilter={TypeFilter} setTypeFilter={setTypeFilter} Sort={Sort} setSort={setSort} FromDate={FromDate} Todate={ToDate} setFromDate={setFromDate} setToDate={setToDate} active={active} />

                        <TransactionList sortedTransactions={sortedTransactions} handleEdit={handleEdit} handleDelete={handleDelete} />

                        <PiechartComponent filteredTransactions={filteredTransactions} />

                    </div>) : (
                    <div className="empty-transactions">
                        <div className="empty-icon">💳</div>

                        <h3>No Transactions Yet</h3>

                        <p>
                            You haven't added any transactions yet.
                            Add your first transaction to start tracking your finances.
                        </p>

                        <span>Start by adding your income or expense above.</span>
                    </div>
                )}

            </div>
        </>
    )
}

export default Transactions
