import Transaction from "../models/Transaction.js";

export const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find();

        res.status(200).json({
            success: true,
            count: transactions.length,
            data: transactions,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch transactions",
            error: error.message,
        });
    }
};


export const createTransaction = async (req, res) => {
    try {
        const { description, amount, category, type, date } = req.body;


        const transaction = await Transaction.create({
            description,
            amount,
            category,
            type,
            date,
        });

        res.status(201).json({
            success: true,
            message: "Transaction created successfully!",
            data: transaction,
        });


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create transaction",
            error: error.message,
        });
    }
};


export const updateTransaction = async (req, res) => {
    try {
        const { id } = req.params;


        const updatedTransaction = await Transaction.findByIdAndUpdate(id,
            req.body,
            {
                //it returns updated data instead of old data.
                new: true,
                // check if the data is valid according to the schema before updating it.
                runValidators: true,
            }
        );

        if (!updatedTransaction) {
            return res.status(404).json({
                success: false,
                message: "Transaction not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Transaction updated successfully!",
            data: updatedTransaction,
        });


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update transaction",
            error: error.message,
        });
    }
};

export const deleteTransaction = async (req, res) => {
    try {
        const { id } = req.params;


        const deletedTransaction = await Transaction.findByIdAndDelete(id);

        if (!deletedTransaction) {
            return res.status(404).json({
                success: false,
                message: "Transaction not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Transaction deleted successfully!",
            data: deletedTransaction,
        });


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete transaction",
            error: error.message,
        });
    }
};
