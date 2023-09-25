const express = require("express");
const router = express.Router();
//const controllers
const { list, create, verify, remove, signIn } = require("../controllers/users");

//admin apis
router.route("/list").get(list);
router.route("/").post(create);
router.route("/:id").delete(remove);


// user apis
router.route("/signin").post(signIn);


module.exports =router;