const express = require("express");
const router = express.Router();
//const controllers
const { list, create, remove } = require("../controllers/users");

router.route("/list").get(list);
router.route("/").post(create);
router.route("/:id").delete(remove);

module.exports =router;