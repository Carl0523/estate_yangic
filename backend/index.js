import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";

dotenv.config(); // Load .env file content into process.env

// Connect to MongoDB database
mongoose
  .connect(process.env.MONGO_URI)
  .then(console.log("Connected to mongoDB server successfully"))
  .catch((error) => {
    console.log(error);
  });

const port = process.env.PORT;

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "HEAD", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type"],
    exposedHeaders: ["Content-Type"],
  })
);

app.use(cookieParser());

// Middleware functions for parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up the connection between the routers and paths
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

// Middleware function to handle the error
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const errorMessage = err.message || "Internal Server error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message: errorMessage,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
