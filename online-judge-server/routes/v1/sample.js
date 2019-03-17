var express = require('express');
var router = express.Router();

var objectID = require('mongodb').ObjectID;
var collection = require('./mongo.js');
var COL = 'usercollection';

// GET  http://localhost:3000/api/v1/sample
router.get('/', function (req, res) {
	res.json({
		message: "This is sample api"
	})
})

/*
mongo admin -u username -p password

ues app1db
db.createUser({user:"judge",pwd:"judge",roles:[{role:"readWrite",db:"app1db"}]})
mongo -u "judge" -p "judge" -authenticationDatabase "app1db"
db.usercollection.insert({id: 1, title: "FizzBuzz", packageName: "FizzBuzz", question: "「FizzBuzzをとく」", answerCode: "xx", answerCodePath: "", testCode: "yy", testCodePath: ""})
db.usercollection.insert({id: 1, title: "swap", packageName: "swap", question: "swapする", answerCode: "xx", answerCodePath: "", testCode: "yy", testCodePath: ""})
*/

/*
db.system.users.find()
db.system.users.remove({"_id" : "admin.judge"})
*/

/*
db.createUser({user:"judge",pwd:"judge",roles:[{role:"readWrite",db:"app1db"}],mechanisms:["SCRAM-SHA-1"]})
*/


// GET  http://localhost:3000/api/v1/sample/contests
router.get('/contests', function (req, res) {
	console.log(collection(COL).find());
	collection(COL).find().toArray(function(err, docs) {
		res.json({
			message: docs
		})
	})
})

module.exports = router;