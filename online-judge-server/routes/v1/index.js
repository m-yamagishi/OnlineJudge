var express = require('express');
var router = express.Router();

router.use('/user', require('./user.js'));
router.use('/run', require('./run.js'));
router.use('/contest', require('./contest.js'));
router.use('/result', require('./result.js'));

module.exports = router;