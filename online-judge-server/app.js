var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

var router = require('./routes/v1/');
app.use('/api/v1/', router);

app.listen(3000, function () {
	console.log('Listening on port 3000')
});