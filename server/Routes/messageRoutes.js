const express = require("express");
const messageRouter = express.Router();

const { testerFunction } = require("../Controllers/messageControllers");

messageRouter.route("/").get(testerFunction);

module.exports = messageRouter;
