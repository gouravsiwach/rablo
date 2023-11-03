const jwt = require("jsonwebtoken");
const Token = require("../models/token");
const secretKey = "your-secret-key";

function verifyToken(req, res, next) {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const parts = authorizationHeader.split(" ");

  if (parts.length !== 2) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const [bearer, token] = parts;

  if (bearer !== "Bearer" || !token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = decoded.email;
    next();
  });
}

module.exports = verifyToken;
};

module.exports = verifyToken;
