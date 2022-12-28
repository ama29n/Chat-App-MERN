const User = require("../Schemas/userSchema");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findOne({ _id: decoded.id }).select("-password");
      next();
    } catch {
      res.status(400).send({ message: "Not authorized, token failed" });
    }
  }
  if(!token) {
    res.status(400).send({ message: "Not authorized, token failed" });
  }
});

module.exports = protect;
