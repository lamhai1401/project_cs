const express = require('express');
const router = express.Router();

const users   = require('./users');
const admins  = require('./admins');

router.use('/users', users);
router.use('/admin', admins);

module.exports = router;