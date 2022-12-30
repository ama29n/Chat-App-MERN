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
      return;
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
  try {
    let result = await Chat.find({
      users: { $elemMatch: { $eq: req.user._id } },
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 });
    result = await User.populate(result, {
      path: "latestMessage.sender",
      select: "name email profilePhoto",
    });
    res.send(result);
  } catch (error) {
    console.log(error + ", in fetchChats");
  }
});

const createGroupChat = asyncHandler(async (req, res) => {
  if (!req.body.users || !req.body.groupName) {
    res.status(400).send("Enter all fields");
  }
  let users = JSON.parse(req.body.users);
  if (users.length < 2) {
    res
      .status(400)
      .send("Number of users to form a group should be more than 2");
    return;
  }
  users.push(req.user);
  try {
    let groupChat = await Chat.create({
      chatName: req.body.groupName,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });
    groupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    res.send(groupChat);
  } catch (error) {
    console.log(error + ", in createGroupChat");
  }
});

const renameGroupChat = asyncHandler(async (req, res) => {
  if (!req.body.newName) {
    res.send("New name not provided");
  }
  try {
    let group = await Chat.findOne({ _id: req.body.id });
    group.chatName = req.body.newName;
    await group.save();
    res.send(group);
  } catch (error) {
    console.log(error, ", in renameGroupchat");
  }
});

const addUserToGroupChat = asyncHandler(async (req, res) => {
  const { groupId, userId } = req.body;
  if (!userId) {
    res.status(400).send("select a user");
    return;
  }
  try {
    let group = await Chat.findOne({ _id: groupId });
    if (group.users.find((id) => { if (JSON.stringify(userId) === JSON.stringify(id)) return true; })) {
      res.status(400).send("User already present in the group");
    }
    group.users.push(userId);
    await group.save();
    group = await Chat.findOne({ _id: groupId }).populate("users", "-password");
    res.send(group);
  } catch (error) {
    console.log(error + ", in addUserToGroupChat()");
  }
});

const removeUserFromGroupChat = asyncHandler(async (req, res) => {
  const { groupId, userId } = req.body;
  if (!userId) {
    res.status(400).send("select a user");
    return;
  }
  try {
    let group = await Chat.findOne({ _id: groupId });
    if (group.users.find((id) => { if (JSON.stringify(userId) === JSON.stringify(id)) return true; })) {
    } else {
      res.status(400).send("User not present");
    }
    group.users = group.users.map(id => {
      if(JSON.stringify(id) !== JSON.stringify(userId)) 
        return id;
    })
    await group.save();
    group = await Chat.findOne({ _id: groupId }).populate("users", "-password");
    res.send(group);
  } catch (error) {
    console.log(error + ", in removeUserFromGroupChat()");
  }
});

module.exports = {
  accessChats,
  fetchChats,
  createGroupChat,
  renameGroupChat,
  addUserToGroupChat,
  removeUserFromGroupChat,
};
