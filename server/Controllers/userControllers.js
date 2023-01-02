const mongoose = require("mongoose");
const User = require("../Schemas/userSchema");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../Config/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, profilePhoto } = req.body;
  if (!name || !email || !password) {
    res.status(400).send("Enter all fields");
  }
  const alreadyExists = await User.exists({ email: email });
  if (alreadyExists) {
    res.status(400).send("An user with this account is already registered");
  }
  const user = await User.create({
    name,
    email,
    password,
    profilePhoto,
  });
  res.send("User Created");
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).send("Enter all fields");
  }
  const user = await User.findOne({ email: email });
  if (!user) {
    res.status(404).send("No User Found");
  }
  if (await user.matchPassword(password)) {
    const token = generateToken(user["_id"]);
    res.send({
      id: user._id,
      name: user.name,
      email: user.email,
      profilePhoto: user.profilePhoto,
      token: token,
    });
  } else {
    res.status(400).send("Invalid Password");
  }
});

const allUsers = asyncHandler(async (req, res) => {
  try {
    const keyword = req.query.input
      ? {
          $or: [
            { name: { $regex: req.query.input, $options: "i" } },
            { email: { $regex: req.query.input, $options: "i" } },
          ],
        }
      : {};
    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    if(users.length < 1) {
      res.status(400).send("No matching user found");
      return;
    }
    res.send(users);
  } catch (error) {
    console.log(error, ", in allUsers");
  }
});

module.exports = { registerUser, authUser, allUsers };
