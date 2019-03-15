var db;
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://judge:judge@localhost:27017/app1db';
var dbName = 'app1db';

MongoClient.connect(url, function (err, client) {
	assert.equal(null, err);
	console.log("Connected correctly to server");
	db = client.db(dbName);
});

var collection = function (name) {
	return db.collection(name);
}

module.exports = collection;