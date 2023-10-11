const express = require("express");
const router = express.Router();
//const controllers
const { list, create, verify, remove, signIn, edit, forgetpassword, confirm, userList, adminList, adminSignin } = require("../controllers/users");

//admin apis
router.route("/list").get(list);
router.route("/list/users").get(userList);
router.route("/list/admins").get(adminList);
router.route("/").post(create);
router.route("/:id").delete(remove);
router.route("/:id").put(edit);
router.route("/confirm").post(confirm);

// admin sign in for users crud table
router.route("/adminSignin").post(adminSignin);

// user api/:userIds
// router.route("/signin").post(signIn);
router.route("/forgetpassword").post(forgetpassword)


module.exports =router;