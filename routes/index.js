const express = require('express');
const router = express.Router();

const users   = require('./users');
const roles   = require('./roles');
const admins  = require('./admins.');

router.use('/users', users);
router.use('/admin', admins);
// router.use('/roles', roles);

module.exports = router;