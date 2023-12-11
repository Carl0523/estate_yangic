import express from 'express';
import dotenv from 'dotenv'

dotenv.config(); // Load .env file content into process.env

const port = process.env.PORT;

const app = express();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

