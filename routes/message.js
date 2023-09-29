const express = require("express");
const router = express.Router();

const { append } = require("../controllers/message");

router.route("/append/:conversationId").post(append);

module.exports =router;