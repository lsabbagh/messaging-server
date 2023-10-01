const express = require("express");
const router = express.Router();
//const controllers
const { list, create, verify, remove, signIn, edit } = require("../controllers/admins");

//admin apis
router.route("/list").get(list);
router.route("/").post(create);
router.route("/:id").delete(remove);
router.route("/:id").put(edit);


// user api/:userIds
router.route("/signin").post(signIn);


module.exports =router;