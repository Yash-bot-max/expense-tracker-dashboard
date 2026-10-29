import express from "express";
import dotenv from "dotenv";
import transactionRouter from "./routes/transactionRoutes.js";
import authRouter from "./routes/authRoutes.js";
import connectDB from "./config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(
    cors({
        origin: (origin, callback) => {
            const allowedOrigins = [
                "http://localhost:5173",
                "https://expense-trackerv-2.netlify.app",
            ];

       
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Origin not allowed by CORS"));
        }
    },
    credentials: true,
})

);


app.use(cookieParser());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log("Request received:", req.method, req.url);
    next();
});

// Home route
app.get("/", (req, res) => {
    res.send("Expense Tracker Backend is running!");
});

// Transaction routes, mounts the transaction router on the /transactions path, so all transaction-related routes start with /transactions.
app.use("/transactions", transactionRouter);

// Auth routes, mounts the auth router on the /auth path, so all auth-related routes start with /auth.
app.use("/auth", authRouter);

app.post("/auth/test", (req, res) => {
    res.json({
        success: true,
        message: "Auth route is working!",
    });
});

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
