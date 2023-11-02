const express = require("express");
const router = express.Router();
//const controllers
const { list, create, verify, remove, signIn, edit, 
    forgetpassword, confirm, userList, adminList, adminSignin, 
    getProfile, editProfile 
} = require("../controllers/users");

//admin apis
router.route("/list").get(list);
router.route("/list/users").get(userList);
router.route("/list/admins").get(adminList);
router.route("/").post(create);
router.route("/:id").delete(remove);
router.route("/:id").put(edit);
router.route("/confirm").post(confirm);


router.route("/user/profile/:id").get(getProfile)
router.route("/user/profile/:id").put(editProfile)


router.route("/forgetpassword").post(forgetpassword)


module.exports =router;