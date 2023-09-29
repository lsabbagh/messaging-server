const express = require("express");
const router = express.Router();
//const controllers
const { list, create, remove, getById} = require("../controllers/conversation");

router.route("/list").get(list); //@TODO: remove the :userId and use from token
router.route("/:userId/:participantId").post(create);
router.route("/:userId").delete(remove);


module.exports =router;