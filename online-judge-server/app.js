var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.use(express.static('public'));
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
// 	extended: false
// }));

var router = require('./routes/v1/');
app.use('/api/v1/', router)
app.use('/api/sample', function (req, res) {
	res.json({
		message: 'hello from server'
	});
})

app.listen(3000, function () {
	console.log('Listening on port 3000')
});