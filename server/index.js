
import express from 'express';
import userRouter from './router/userRouter.js';
import { connectDb } from './config/connectDb.js';
import isAuthenticated from './auth/isAuthenticate.js';
import cookieParser from 'cookie-parser';
import foodRouter from './router/foodRouter.js';
import cors from 'cors';
import cartRouter from './router/cartRouter.js';
import orderRouter from './router/orderRouter.js';
import dotenv from 'dotenv'
const app = express();

dotenv.config({});

console.log(process.env.PORT)

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:5173',
    allowedHeaders: ["Content-Type", "Authorization", "token"],


    credentials: true }));

// Routes
app.use("/api/user/", userRouter);
app.use("/api/food/", foodRouter);
app.use('/api/cart',cartRouter)
app.use("/api/order",orderRouter)
app.use("/images", express.static('uploads'));



// Start Server
app.listen(3001, async () => {
    try {
        await connectDb();
        console.log(`Server is listening on port 3001`);
    } catch (error) {
        console.error("Database connection failed:", error);
    }
});