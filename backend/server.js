import express from "express";
import dotenv from "dotenv";
import transactionRouter from "./routes/transactionRoutes.js";
import connectDB from "./config/db.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());

// Middleware
app.use(express.json());

app.use((req, res, next) => {
    console.log("Request received:", req.method, req.url);
    next();
});

// Home route
app.get("/", (req, res) => {
    res.send("Expense Tracker Backend is running!");
});

// Transaction routes
app.use("/transactions", transactionRouter);

// Start server after connecting to MongoDB
const startServer = async () => {
    try {
        await connectDB();

        const PORT = process.env.PORT || 5000;

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });


    } catch (error) {
        console.error("Failed to start server:", error.message);
        process.exit(1);
    }
};

startServer();
