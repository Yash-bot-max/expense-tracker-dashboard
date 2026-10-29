import mongoose from "mongoose";


const transactionSchema = new mongoose.Schema(
    {
        description: {
            type: String,
            required: true,
            //trim the extra spaces from the starting and ending of the description.
            trim: true,
        },

        amount: {
            type: Number,
            required: true,
            min: 0,
        },

        category: {
            type: String,
            required: true,
        },

        type: {
            type: String,
            required: true,
            enum: ["Income", "Expense"],
        },

        date: {
            type: Date,
            default: Date.now,
        },
        
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

    },
    {
        timestamps: true,
    }
);


const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
