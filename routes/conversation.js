const express = require("express");
const router = express.Router();
//const controllers
const { list, create, remove} = require("../controllers/conversation");

router.route("/list/:userId").get(list); //@TODO: remove the :userId and use from token
router.route("/").post(create);
router.route("/:id").delete(remove);

module.exports =router;