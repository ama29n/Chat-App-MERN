const express = require("express");
const userRouter = express.Router();
const {
  registerUser,
  authUser,
  allUsers,
} = require("../Controllers/userControllers");
const protect = require("../Middleware/authorizationMiddleware");

// To register the user in the database
userRouter.route("/register").post(registerUser);

// To login the user
userRouter.route("/login").post(authUser);

// To search a user based upon his/her name or email
userRouter.route("/search").get(protect, allUsers);

module.exports = userRouter;
