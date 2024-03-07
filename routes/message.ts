const express = require("express");
const router = express.Router();
const validator = require("../controllers/validator")

import {Append} from "../controllers/message/exports"


router.route("/append/:conversationId").post(validator(Append.schema), Append.controller);



module.exports =router;