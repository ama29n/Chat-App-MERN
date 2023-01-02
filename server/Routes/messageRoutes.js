const express = require("express");
const messageRouter = express.Router();
const protect = require("../Middleware/authorizationMiddleware");
const { sendMessage, fetchMessages } = require("../Controllers/messageControllers");

messageRouter.route("/").post(protect, sendMessage);

messageRouter.route("/:chatId").get(protect, fetchMessages);

module.exports = messageRouter;
