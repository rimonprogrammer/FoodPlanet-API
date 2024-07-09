const express = require('express');
const {Signup, Login} = require('../Controller/UserController');

const router = express.Router();

router.post('/SignUp', Signup);
router.post('/Login', Login);

module.exports = router;