const express = require("express");
const router = express.Router();
const validator = require("../controllers/validator")


const list = require("../controllers/users/list")
const userList = require("../controllers/users/userList")
const adminList = require("../controllers/users/adminList")
const create = require("../controllers/users/create")
const edit = require("../controllers/users/edit")
const confirm = require("../controllers/users/confirm")
const changePassword = require("../controllers/users/changePassword")

const getProfile = require("../controllers/users/getProfile")
const editProfile = require("../controllers/users/editProfile")


//admin apis
router.route("/").post(validator(create.schema), create.controller);
router.route("/:id").put(validator(edit.schema), edit.controller);
router.route("/list").get(validator(list.schema), list.controller);
router.route("/list/users").get(validator(userList.schema), userList.controller);
router.route("/list/admins").get(validator(adminList.schema), adminList.controller);
router.route("/confirm").post(validator(confirm.schema), confirm.controller);
router.route("/changePassword/user").post(validator(changePassword.schema), changePassword.controller)


router.route("/user/profile/:id").get(validator(getProfile.schema), getProfile.controller)
router.route("/user/profile/:id").put(validator(editProfile.schema), editProfile.controller)


// const remove = require("../controllers/users")
// router.route("/:id").delete(remove);


module.exports =router;