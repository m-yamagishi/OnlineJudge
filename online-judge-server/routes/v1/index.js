var express = require('express');
var router = express.Router();

router.use('/sample', require('./sample.js'));

router.use('/user', require('./user.js'));
router.use('/run', require('./run.js'));
router.use('/contests', require('./contests.js'));

module.exports = router;