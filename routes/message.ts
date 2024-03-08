import express from "express";
const router = express.Router();
import validator from "../controllers/validator";

import {Append} from "../controllers/message/exports"


router.route("/append/:conversationId").post(validator(Append.schema), Append.controller);



export default router