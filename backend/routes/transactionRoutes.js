import express from "express";
import { getTransactions,createTransaction,updateTransaction,deleteTransaction} from "../controllers/transactionController.js";
import { protect } from "../middleware/authMiddleware.js";

//creates a new Express router to manage transaction-related API routes separately.
const transactionRouter = express.Router();

transactionRouter.get("/get-transaction", protect, getTransactions);
transactionRouter.post("/create-transaction", protect, createTransaction);
transactionRouter.put("/update-transaction/:id", protect, updateTransaction);
transactionRouter.delete("/delete-transaction/:id", protect, deleteTransaction);
export default transactionRouter;
