const express = require("express");
const router = express.Router();
//const controllers
const { list, create, verify, userId } = require("../controllers/users");

//routes
router.route("/list").get(list);
router.route("/").post(create);
router.route("/:id").get(userId);
//I made a verify function but didn't complete it. please CHECK!
// router.route('/').update(create);
// router.route('/').delete(create);


module.exports =router;