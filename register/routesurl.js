const { json } = require('express');
const express =  require('express');
const user = require('../schema/userdata');
const router = express.Router();

const operations = require('./register');


// usercurd


router.post('/users',operations.newuser);

module.exports = router;