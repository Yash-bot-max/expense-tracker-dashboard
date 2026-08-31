import "./TransactionsForm.css"
import { MdOutlinePostAdd } from "react-icons/md";
import Swal from 'sweetalert2';

const TransactionsForm = ({ setTransactions, setEditId, EditId, handleSubmit, register, errors, reset }) => {

    // Handle form submission for both editing an existing transaction and adding a new one.
    const onSubmit = (data) => {

        // If an existing transaction is being edited, update its details.
        if (EditId !== null) {
            // Update the transaction that matches EditId while keeping all other transactions unchanged.
            setTransactions(prev =>
                prev.map(transaction => transaction.id === EditId ? {
                    ...transaction,
                    amount: data.amount,
                    description: data.description,
                    type: data.type,
                    date: data.date,
                    category: data.category
                } : transaction)
            );

            // Exit edit mode and reset the form.
            setEditId(null);
            reset();
            Swal.fire({
                title: "Updated!",
                text: "Transaction updated successfully.",
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
                background: "#0F172A",
                color: "#F8FAFC"
            });
            return;

        } else {

            // Add a new transaction when no transaction is being edited.
            addTransaction(data);

            // Clear the form after adding the transaction.
            reset();
            return;
        }
    };


    // Create a new transaction object using the submitted form data.
    const addTransaction = (data) => {
        const newTransaction = {
            // Generate a unique ID for the new transaction.
            id: crypto.randomUUID(),

            // Store the transaction details from the form.
            amount: data.amount,
            description: data.description,
            type: data.type,
            category: data.category,

            // Use the selected date, or use the current date if no date is provided.
            date: data.date ? data.date : new Date().toISOString(),
        };

        // Add the new transaction to the existing transactions array.
        setTransactions(prev => [...prev, newTransaction]);

        // Show a confirmation alert after adding the transaction.
        showAlert();
    };


    // Display a success alert to notify the user that the transaction was added successfully.
    const showAlert = () => {

        Swal.fire({
            title: "Success!",
            text: "Your Data Was Successfully Added.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
            background: "#0F172A",
            color: "#F8FAFC"
        });
    };
    return (
        <div>

            <div className="add">

                <div className='add-logo'>
                    <MdOutlinePostAdd size={25}  />
                    <h3>Add Transactions</h3>
                </div>

                <form action="" onSubmit={handleSubmit(onSubmit)}>
                    <div className='form'>
                        <span>
                            <p>Description</p>
                            <input type="text" {...register("description", { required: true })} placeholder='eg.Butter Milk' />
                        </span>

                        <span className="input-group">
                            <p>Amount</p>

                            <input
                                type="number"
                                {...register("amount", {
                                    required: "Amount is required",
                                    min: {
                                        value: 1,
                                        message: "Amount must be greater than 0"
                                    }
                                })}
                                placeholder="eg.50"
                                className={errors.amount ? "input-error" : ""}
                            />

                            {errors.amount && (
                                <span className="error-message">
                                    ⚠ {errors.amount.message}
                                </span>
                            )}
                        </span>
                    </div>

                    <div className="form-details">

                        <span>
                            <p>Type</p>
                            <select className='select' {...register("type")}>
                                <option value="Income">Income</option>
                                <option value="Expense">Expense</option>
                            </select>
                        </span>

                        <span>
                            <p>Category</p>
                            <select className='select' {...register("category")}>
                                <option value="Food">Food</option>
                                <option value="Shopping">Shopping</option>
                                <option value="Transportation">Transportation</option>
                                <option value="Bills & Utilities">Bills & Utilities</option>
                                <option value="Health">Health</option>
                                <option value="Education">Education</option>
                                <option value="Travel">Travel</option>
                                <option value="Technology">Technology</option>
                                <option value="Other">Other</option>
                            </select>
                        </span>

                        <span>
                            <p>Date</p>
                            <input type="date" {...register("date")} />
                        </span>

                    </div>
                    <button className="add-transaction-btn" type="submit">
                        {EditId !== null ? "Update" : "Add"}
                    </button>
                </form>


            </div>

        </div>
    )
}

export default TransactionsForm
