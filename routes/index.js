const express = require('express');
const router = express.Router();

const users = require('./users');
const roles = require('./roles');

router.use('/users', users);
// router.use('/roles', roles);

module.exports = router;