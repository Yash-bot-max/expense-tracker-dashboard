import express from "express";
import { signup, login, getMe, logout, } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.get("/me", protect, getMe);
authRouter.post("/logout", logout);

export default authRouter;