var express = require('express');
var router = express.Router();

var ObjectID = require('mongodb').ObjectID;
var mongo = require('./mongo.js');
var COL = 'user';

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
        res.send(r);
    })
})

/*
body = {
llllkioooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo    name: user name,
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