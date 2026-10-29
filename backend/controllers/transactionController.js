import Transaction from "../models/Transaction.js";

export const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({
            user: req.userId,
        });

        return res.status(200).json({
            success: true,
            count: transactions.length,
            data: transactions,
        });
    } catch (error) {
        console.error("Get transactions error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch transactions",
        });
    }
};




export const createTransaction = async (req, res) => {
    try {
        const { description, amount, category, type, date } = req.body;
        console.log("Request body:", req.body);
        console.log("Content-Type:", req.headers["content-type"]);

        const transaction = await Transaction.create({
            description,
            amount,
            category,
            type,
            date,
            user: req.userId,
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
    const { description, amount, category, type, date } = req.body;

    const updatedTransaction = await Transaction.findOneAndUpdate(
      {
        _id: id,
        user: req.userId,
      },
      {
        description,
        amount,
        category,
        type,
        date,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedTransaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found or access denied",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Transaction updated successfully",
      data: updatedTransaction,
    });
    
  } catch (error) {
    console.error("Update transaction error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to update transaction",
    });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTransaction = await Transaction.findOneAndDelete({
      _id: id,
      user: req.userId,
    });

    if (!deletedTransaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found or access denied",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Transaction deleted successfully",
    });
  } catch (error) {
    console.error("Delete transaction error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to delete transaction",
    });
  }
};

