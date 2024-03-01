const express = require("express");
const router = express.Router();
const validator = require("../controllers/validator")

// const { list, create, messageGroup, remove, listGroups, listAllGroups, createGroup, 
//     editGroup, deleteGroup, lastMessageUpdate 
// } = require("../controllers/conversation");
const listAllGroups = require("../controllers/conversation/listAllGroups")
const createGroup = require("../controllers/conversation/createGroup")
const editGroup = require("../controllers/conversation/editGroup")
const remove = require("../controllers/conversation/remove")

const list = require("../controllers/conversation/list")
const create = require("../controllers/conversation/create")

// admin api
router.route("/groups/list").get(validator(listAllGroups.schema), listAllGroups.controller);
router.route("/groups/").post(validator(createGroup.schema), createGroup.controller);
router.route("/groups/:groupId").put(validator(editGroup.schema), editGroup.controller);
router.route("/:conversationId").delete(validator(remove.schema), remove.controller);

// user api
router.route("/list/:userId").get(validator(list.schema), list.controller); //@TODO: remove the :userId and use from token
router.route("/:userId").post(validator(create.schema), create.controller);




// router.route("/groups").get(listGroups);
// router.route("/groups/:groupId").delete(deleteGroup);


module.exports =router;