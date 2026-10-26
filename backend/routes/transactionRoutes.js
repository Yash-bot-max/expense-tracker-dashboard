import express from "express";
import { getTransactions,createTransaction,updateTransaction,deleteTransaction} from "../controllers/transactionController.js";

const transactionRouter = express.Router();

transactionRouter.get("/get-transaction", getTransactions);
transactionRouter.post("/create-transaction", createTransaction);
transactionRouter.put("/update-transaction/:id", updateTransaction);
transactionRouter.delete("/delete-transaction/:id", deleteTransaction);
export default transactionRouter;
