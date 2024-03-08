import express from "express";
const router = express.Router();
import validator from "../controllers/validator";
// const _validator = validator
import { Create, Edit, List, UserList, AdminList, Confirm, ChangePassword, GetProfile, EditProfile } from "../controllers/users/exports";

//admin apis
router.route("/").post(validator(Create.schema, true), Create.controller); //TESTED
router.route("/:id").put(validator(Edit.schema), Edit.controller); //TESTED
router.route("/list").get(validator(List.schema), List.controller); //TESTED
router.route("/list/users").get(validator(UserList.schema), UserList.controller); //TESTED
router.route("/list/admins").get(validator(AdminList.schema), AdminList.controller); //TESTED
router.route("/confirm").post(validator(Confirm.schema), Confirm.controller); //TESTED
router.route("/changePassword/user").post(validator(ChangePassword.schema), ChangePassword.controller); //TESTED

router.route("/user/profile/:id").get(validator(GetProfile.schema), GetProfile.controller);
router.route("/user/profile/:id").put(validator(EditProfile.schema), EditProfile.controller);


export default router
