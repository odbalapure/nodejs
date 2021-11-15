/* Using the jsonwebtoken package */
const jwt = require("jsonwebtoken");
const { BadRequestError } = require("../errors");

const login = async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);

  // Check details in the database
  // Add validation layer
  // Check if username and password were passed
  if (!username || !password) {
    throw new BadRequestError("Please provide username and password!");
  }

  /* No db connection for now, create a dummy id */
  // A payload can be bigger than just id and username
  // It is better to keep the payload small
  const id = new Date().getDate();

  /* Creating a JWT token */
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  // res.send("Fake login/resgister");
  res.status(200).json({ msg: "User created", token });
};

const dashboard = async (req, res) => {
  console.log("User data:", req.user);

  const luckyNumber = Math.random() * 100;
  res.status(200).json({
    msg: `Hi ${req.user.username}`,
    secret: `Your lucky number is ${luckyNumber}`,
  });
};

module.exports = {
  login,
  dashboard,
};
