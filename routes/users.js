const express = require('express');
const router= express.Router();
//const controllers
const {list}=require('../controllers/users');

//routes
router.route('/list').get(list);


module.exports =router;