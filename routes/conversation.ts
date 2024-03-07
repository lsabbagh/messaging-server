const express = require("express");
const router = express.Router();
const validator = require("../controllers/validator")

import { List, Create, Remove, ListAllGroups, CreateGroup, EditGroup, } from "../controllers/conversation/exports";


// admin api
router.route("/groups/list").get(validator(ListAllGroups.schema), ListAllGroups.controller);
router.route("/groups/").post(validator(CreateGroup.schema), CreateGroup.controller);
router.route("/groups/:groupId").put(validator(EditGroup.schema), EditGroup.controller);
router.route("/:conversationId").delete(validator(Remove.schema), Remove.controller);

// user api
router.route("/list/:userId").get(validator(List.schema), List.controller); //@TODO: remove the :userId and use from token
router.route("/:userId").post(validator(Create.schema), Create.controller);



module.exports =router;