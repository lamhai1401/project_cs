const express = require('express');
const router = express.Router();

const users   = require('./users');
const admins  = require('./admins');
const kryptos = require('./kryptos');

router.use('/users', users);
router.use('/admin', admins);
router.use('/kryptos', kryptos);

module.exports = router;