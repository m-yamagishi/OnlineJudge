var express = require('express');
var router = express.Router();

var ObjectID = require('mongodb').ObjectID;
var collection = require('./mongo.js');
var COL = 'usercollection';

router.get('/', function (req, res) {
	console.log('Getting contest list');
	collection(COL).find().toArray(function (err, docs) {
		res.send(docs);
	});
});

// GET http://localhost:3000/api/v1/contest/5c8c5de58c76a67dcf76eea8
router.get('/:id', function (req, res) {
	console.log('request params is :', req.params.id);
	collection(COL).findOne({_id: new ObjectID(req.params.id)}, {}, function (err, r) {
		res.send(r);
	});
});

router.post('/', function (req, res) {
	collection(COL).insertOne(req.body).then(function (r) {
		res.send(r);
	});
});

// curl http://localhost:3000/api/v1/contest/5c936df40481bed848b84b48 -X PUT -d "answer_count=2"
router.put('/:id', function (req, res) {
	collection(COL).findOneAndUpdate({_id: new ObjectID(req.params.id)}, {$set: req.body}, {new: true}, function (err, r) {
		res.send(r);
	});
});

router.delete('/:id', function (req, res) {
	console.log('request params is :', req.params.id);
	collection(COL).findOneAndDelete({_id: new ObjectID(req.params.id)}, {}, function (err, r) {
		res.send(r);
	});
});

module.exports = router;