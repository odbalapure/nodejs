const mongoose = require("mongoose");

// We can pass a connectionString to mongoose.connect() but the Mongo Cluster
//  credentials will be visble to all, so add them a .env file and pass it to mongo.connect()
// const connectionString = "mongodb+srv://ombalapure7:nodejsprojects@nodejsprojects.9b6xe.mongodb.net/taskmanager?retryWrites=true&w=majority";

const connectDb = (url) => {
  return mongoose.connect(url, {
    // No need if Mongoose version is 6+
    useNewUrlParser: true,
    userCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  });
};

// NOTE: mongoose.connect() returns a PROMISE, we can call it here and use require("./db/connection")
//  in the app.js BUT it is good to check for a databse connection and then run the server
module.exports = connectDb;
