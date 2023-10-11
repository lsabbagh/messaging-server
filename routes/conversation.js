const express = require("express");
const router = express.Router();
//const controllers
const { list, create, messageGroup, remove, listGroups, listAllGroups, createGroup, editGroup, deleteGroup } = require("../controllers/conversation");


router.route("/groups/list").get(listAllGroups);
router.route("/groups/").post(createGroup);
router.route("/groups/:groupId").put(editGroup);


router.route("/list/:userId").get(list); //@TODO: remove the :userId and use from token
router.route("/:userId").post(create);
router.route("/:conversationId").delete(remove);
// router.route("/groups").get(listGroups);
// router.route("/groups/:groupId").delete(deleteGroup);


module.exports =router;