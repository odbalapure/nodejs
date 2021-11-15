const jwt = require("jsonwebtoken");
const { UnAuthenticatedError } = require("../errors");

const authenticationMiddleware = async (req, res, next) => {
  /* Get the token */
  const authHeader = req.headers.authorization;

  /* Check if the token was passed */
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnAuthenticatedError("No token provided");
  }

  /* Extract the token */
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // iat: issued at
    // { id: 14, username: 'Om', iat: 1636890243, exp: 1639482243 }
    console.log("Decoded: ", decoded);

    const { id, username } = decoded;
    req.user = { id, username };
    next();
  } catch (error) {
    throw new UnAuthenticatedError("Not authorized to access the route");
  }
};

module.exports = authenticationMiddleware;
