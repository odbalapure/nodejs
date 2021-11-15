require("./db/connection");
// Setup an express server
const express = require("express");
const app = express();
// Import the Router
const tasks = require("./routes/tasks");
// Database connection
const connectDb = require("./db/connection");
// Get access to varibales in .env file
// NOTE: No need to assign it to a variable
require("dotenv").config();

// Middleware
// NOTE: If we don't do this then we won't have the data in req.body
//  It is a method inbuilt in express to recognize the incoming Request Object as a JSON Object
app.use(express.json());

// Writing entire logic in app.js is not advisable
// app.get('/hello', (req, res) => {
//   res.send("Task Manager");
// });

app.use("/api/v1/tasks", tasks);

const port = 3000;

// Run the server ONLY IF the databse is running 
const start = async () => {
  try {
    // process.env is a GLOBAL variable
    await connectDb(process.env.MONGO_URI);
    app.listen(port, console.log(`Server listening on port ${port}...`));
  } catch (errror) {
    console.log("DB CONNECTION FAILED :(", errror)
  }
}

start();