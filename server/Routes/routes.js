const express = require("express");
const router = express.Router();
const { testerFunction } = require("../Controllers/controllers");

router.route("/data").get(testerFunction);

module.exports = router;