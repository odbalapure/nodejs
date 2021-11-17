require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();

// Db connection
const connectDb = require("./db/connect");

// Auth middleware
const authMiddleware = require("./middleware/authentication");

// Routers
const authRouter = require("./routes/auth");
const jobsRouter = require("./routes/jobs");

// Error handlers
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(express.json());


// Routes
app.get("/", (req, res) => {
  res.send("jobs api");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authMiddleware, jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
