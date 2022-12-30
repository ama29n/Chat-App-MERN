const mongoose = require("mongoose");
const Chat = require("../Schemas/chatSchema");
const User = require("../Schemas/userSchema");
const asyncHandler = require("express-async-handler");

const accessChats = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      res.status(400).send("User ID not sent in the body");
    }
    // If chat already exists between the 2 users
    let validChat = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user._id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");
    validChat = await User.populate(validChat, {
      path: "latestMessage.sender",
      select: "name email profilePhoto",
    });
    if (validChat.length > 0) {
      res.send(validChat[0]);
    }
    // If chat doesn't exists between the 2 users
    let chatData = {
      isGroupChat: false,
      chatName: "sender",
      users: [req.user._id, userId],
    };
    let createdChat = await Chat.create(chatData);
    createdChat = await Chat.findOne({ _id: createdChat._id }).populate(
      "users",
      "-password"
    );
    res.send(createdChat);
  } catch (error) {
    console.log(error + ", in accessChat()");
  }
});

const fetchChats = asyncHandler(async (req, res) => {
  res.send("Working");
});

const createGroupChat = asyncHandler(async (req, res) => {
  res.send("Working");
});

const renameGroupChat = asyncHandler(async (req, res) => {
  res.send("Working");
});

const addUserToGroupChat = asyncHandler(async (req, res) => {
  res.send("Working");
});

const removeUserFromGroupChat = asyncHandler(async (req, res) => {
  res.send("Working");
});

module.exports = {
  accessChats,
  fetchChats,
  createGroupChat,
  renameGroupChat,
  addUserToGroupChat,
  removeUserFromGroupChat,
};
