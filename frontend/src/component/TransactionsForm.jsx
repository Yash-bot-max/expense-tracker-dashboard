import "./TransactionsForm.css";
import { MdOutlinePostAdd } from "react-icons/md";
import Swal from "sweetalert2";
import { useState } from "react";

const TransactionsForm = ({
  setTransactions,
  setEditId,
  EditId,
  handleSubmit,
  register,
  errors,
  reset,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const onSubmit = async (data) => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      // UPDATE EXISTING TRANSACTION
      if (EditId !== null) {
        try {
          const response = await fetch(
            `http://localhost:5000/transactions/update-transaction/${EditId}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                description: data.description,
                amount: Number(data.amount),
                type:
                  data.type.charAt(0).toUpperCase() +
                  data.type.slice(1).toLowerCase(),
                category: data.category,
                date: data.date,
              }),
            },
          );

          const result = await response.json();

          if (!response.ok) {
            throw new Error(
              result.error || result.message || "Failed to update transaction",
            );
          }

          const updatedTransaction = {
            ...result.data,
            id: result.data._id,
          };

          setTransactions((prev) =>
            prev.map((transaction) =>
              transaction.id === EditId ? updatedTransaction : transaction,
            ),
          );

          setEditId(null);
          reset();

          Swal.fire({
            title: "Updated!",
            text: "Transaction updated successfully.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
            background: "#0F172A",
            color: "#F8FAFC",
          });
        } catch (error) {
          console.error("Error updating transaction:", error);

          Swal.fire({
            title: "Error!",
            text: error.message || "Unable to update transaction.",
            icon: "error",
            background: "#0F172A",
            color: "#F8FAFC",
          });
        }

        return;
      }

      // ADD NEW TRANSACTION
      const isSuccess = await addTransaction(data);

      if (isSuccess) {
        reset();
      }
      
    } finally {
      setIsSubmitting(false);
    }
  };

  const addTransaction = async (data) => {
    try {
      const response = await fetch(
        "http://localhost:5000/transactions/create-transaction",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            description: data.description,
            amount: Number(data.amount),
            type: data.type,
            category: data.category,
            date: data.date || new Date().toISOString(),
          }),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to create transaction");
      }

      const savedTransaction = {
        ...result.data,
        id: result.data._id,
      };

      setTransactions((prev) => [...prev, savedTransaction]);

      showAlert();

      return true;
    } catch (error) {
      console.error("Error adding transaction:", error);

      Swal.fire({
        title: "Error!",
        text: error.message || "Unable to save transaction.",
        icon: "error",
        background: "#0F172A",
        color: "#F8FAFC",
      });

      return false;
    }
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
      color: "#F8FAFC",
    });
  };
  return (
    <div>
      <div className="add">
        <div className="add-logo">
          <MdOutlinePostAdd size={25} />
          <h3>Add Transactions</h3>
        </div>

        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="form">
            <span>
              <p>Description</p>
              <input
                type="text"
                {...register("description", { required: true })}
                placeholder="eg.Butter Milk"
              />
            </span>

            <span className="input-group">
              <p>Amount</p>

              <input
                type="number"
                {...register("amount", {
                  required: "Amount is required",
                  min: {
                    value: 1,
                    message: "Amount must be greater than 0",
                  },
                })}
                placeholder="eg.50"
                className={errors.amount ? "input-error" : ""}
              />

              {errors.amount && (
                <span className="error-message">⚠ {errors.amount.message}</span>
              )}
            </span>
          </div>

          <div className="form-details">
            <span>
              <p>Type</p>
              <select className="select" {...register("type")}>
                <option value="Income">Income</option>
                <option value="Expense">Expense</option>
              </select>
            </span>

            <span>
              <p>Category</p>
              <select className="select" {...register("category")}>
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
          <button
            className="add-transaction-btn"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : EditId !== null ? "Update" : "Add"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TransactionsForm;
