const mongoose = require("mongoose");
const Message = require("../Schemas/messageSchema");
const User = require("../Schemas/userSchema");
const Chat = require("../Schemas/chatSchema");
const asyncHandler = require("express-async-handler");

const sendMessage = asyncHandler(async (req, res) => {
  const { message, chatId } = req.body;
  if (!message || !chatId || message.length < 1) {
    res.status(400).send("Message or chat id missing");
  }
  try {
    let newMessage = await Message.create({
      sender: req.user._id,
      content: message,
      chat: chatId,
    });
    newMessage = await Message.findOne({ _id: newMessage._id })
      .populate("chat")
      .populate("sender", "name profilePhoto");
    newMessage = await User.populate(newMessage, {
      path: "chat.users",
      select: "name email profilePhoto",
    });

    await Chat.findByIdAndUpdate(chatId, {
      latestMessage: newMessage,
    });
    res.send(newMessage);
  } catch (error) {
    console.log(error + ", in sendMessage()");
  }
});

const fetchMessages = asyncHandler(async (req, res) => {
  try {
    let messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name profilePhoto email")
      .populate("chat");
    res.send(messages);
  } catch (error) {
    console.log(error + ", in fetchMessage()");
  }
});

module.exports = { sendMessage, fetchMessages };
