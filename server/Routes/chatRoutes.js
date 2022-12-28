const express = require("express");
const chatRouter = express.Router();
const protect = require("../Middleware/authorizationMiddleware");
const { accessChats, fetchChats, createGroupChat, renameGroupChat, addUserToGroupChat, removeUserFromGroupChat } = require("../Controllers/chatControllers");

// To access the chat if it exists or create it if it doesn't
chatRouter.route("/").post(protect, accessChats);

// To get the chat list of the user
chatRouter.route("/").get(protect, fetchChats);

// To create a group chat
chatRouter.route("/group/create").post(protect, createGroupChat);

// To rename a group chat
chatRouter.route("/group/rename").put(protect, renameGroupChat);

// To add a user to group
chatRouter.route("/group/add").put(protect, addUserToGroupChat);

// To remove user from group chat
chatRouter.route("/group/remove").put(protect, removeUserFromGroupChat);

module.exports = chatRouter;
