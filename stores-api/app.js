require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

// Connect DB
const connectDB = require("./db/connect");

// Router
const products = require("./routes/products");

// Error handlers
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");

// Middleware 
app.use(express.json());

// Home Page
app.get("/", (req, res) => {
  res.send("<h1>Stores API</h1>");
});

// Products Route
app.use("/api/v1/products", products);

// Error handler
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    // Connect DB
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server listening on port ${port}`));
  } catch (error) {
    console.log("SERVER STARTUP ERROR :(")
  }
}

start();