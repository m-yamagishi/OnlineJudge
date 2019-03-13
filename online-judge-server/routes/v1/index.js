var express = require('express');
var router = express.Router();

router.use('/user', require('./user.js'));
router.use('/run', require('./run.js'));

module.exports = router;