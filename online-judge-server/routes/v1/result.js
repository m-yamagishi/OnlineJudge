var express = require('express');
var router = express.Router();

var ObjectID = require('mongodb').ObjectID;
var mongo = require('./mongo.js');
var COL = 'result';

// GET  http://localhost:3000/api/v1/result
router.get('/', function (req, res) {
	mongo(COL).find().toArray(function (err, docs) {
		res.send(docs)
	})
})

router.get('/:id', function (req, res) {
	mongo(COL).findOne({ _id: new ObjectID(req.params.id) }, {}, function (err, r) {
		res.send(r)
	})
})

/**
 * body = {
 * 	contest_id: contest id,
 * 	contest_name: contest name,
 * 	answerer: user who answer the contest,
 *  date_time: when answer the contest,
 * 	answer_code: answer code,
 *	answer_stdout: ,
 * 	answer_stderr: ,
 * 	ansewr_exit_code: ,
 *  exe_time: answer code execution time
 * 	test_code: test code,
 * 	test_stdout: stdout of test code,
 * 	test_stderr: ,
 * 	test_exit_code:
 * }
 */
router.post('/', function (req, res) {
	mongo(COL).insertOne(req.body).then(function (r) {
		res.send(r)
	})
})


module.exports = router;