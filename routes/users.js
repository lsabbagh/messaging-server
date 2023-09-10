const express = require('express');
const router= express.Router();
//const controllers
const {list, create}=require('../controllers/users');

//routes
router.route('/list').get(list);
router.route('/').post(create);
// router.route('/').update(create);
// router.route('/').delete(create);


module.exports =router;