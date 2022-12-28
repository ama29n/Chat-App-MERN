const mongoose = require("mongoose");
const Message = require("../Schemas/messageSchema");
const asyncHandler = require("express-async-handler");

const testerFunction = (req, res) => {
    res.send("Message");
};

module.exports = { testerFunction };