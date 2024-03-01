const express = require("express");
const router = express.Router();
const validator = require("../controllers/validator")

// const { append } = require("../controllers/message");

const append = require("../controllers/message/append")

router.route("/append/:conversationId").post(validator(append.schema), append.controller);

module.exports =router;