const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// This loads the variables from your .env file
require('dotenv').config(); 

const app = express();
const port = process.env.PORT || 5000;

// --- Middleware ---
app.use(cors()); // Allows cross-origin requests
app.use(express.json()); // Allows the server to accept JSON in the body

// --- Database Connection ---
const uri = process.env.MONGO_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

// --- API Routes ---
// This tells the server to use the auth.js file
// for any URL that starts with '/api/auth'
const authRouter = require('./routes/auth');
app.use('/api/auth', authRouter);

const lessonsRouter = require('./routes/lessons');
app.use('/api/lessons', lessonsRouter);

// --- Start Server ---
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});