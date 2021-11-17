const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const register = async (req, res) => {
  /* 
  // No need for this code as we are encoding password in UserSchema
  const {name, email, password} = req.body;
  // 10 is default value
  // Increase the value for stronger encoding but it requires more processing
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user object with hashed password
  const tempUser = {name, email, password: hashedPassword};
 */

  const user = await User.create({ ...req.body });
  /*
  // No need for this code  
  // Method to create token on registration is present in UserSchema
  const token = jwt.sign({ userId: user._id, name: user.name }, "jwtSecret", {
    expiresIn: "30d",
  }); */

  // Get the token from custom Schema instance method
  const token = user.createJwt();
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  // User must provide email and password
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  // Check if the user exists in the database
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid credentials");
  }

  // Compare passwords
  const isPassCorrect = await user.comparePassword(password);
  if (!isPassCorrect) {
    throw new UnauthenticatedError("Invalid credentials");
  }

  const token = user.createJwt();
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

module.exports = {
  register,
  login,
};
