const jwt = require("jsonwebtoken");
const Token = require("../models/token");
const secretKey = process.env.JWT_SECRET;

const verifyToken = async (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "Access denied, no token provided" });
  }

  const [bearer, token] = authHeader.split(" ");

  if (bearer !== "Bearer" || !token) {
    return res
      .status(401)
      .json({ message: "Access denied, invalid authorization format" });
  }

  try {
    const decoded = jwt.verify(token, secretKey);

    if (!decoded.email) {
      console.log("Email not found in the token payload");
      return res.status(401).json({ message: "Access denied, invalid token" });
    }

    const email = decoded.email;

    // Retrieve the user's token from the database
    const tokenFromDB = await Token.findOne({ email });

    if (!tokenFromDB || tokenFromDB.token !== token) {
      console.log("Tokens do not match");
      return res.status(401).json({ message: "Access denied, invalid token" });
    }

    // Attach the email to the request for further use if needed
    req.user = { email };

    next();
  } catch (error) {
    console.error(error);
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    } else if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    } else {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
};

module.exports = verifyToken;
