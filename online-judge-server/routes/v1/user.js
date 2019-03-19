var express = require('express');
var router = express.Router();

var ObjectID = require('mongodb').ObjectID;
var mongo = require('./mongo.js');
var COL = 'user';

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

// GET http://localhost:3000/api/v1/user
router.get('/', function (req, res) {
    console.log('Getting user list')
    mongo(COL).find().toArray(function(err, docs) {
        res.send(docs)
    })
})

router.get('/:name', function(req, res) {
    console.log('param is ', req.params.name)
    mongo(COL).findOne({name: req.params.name}, {}, function(err, r) {
        res.send(r)
    })
})

/*
body = {
    name: user name,
    password: user password,
    role: Answerer or Questioner or Administrator
}
*/
router.post('/', function(req, res) {
    mongo(COL).insertOne(req.body).then(function (r) {
        res.send(r)
    })
})

module.exports = router;