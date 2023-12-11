import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
