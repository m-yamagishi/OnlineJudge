var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
	next();
});

app.use(express.static('public'));
app.use(bodyParser.json());

app.use('/api/v1/', require('./routes/v1/'))

app.listen({ port: 3000, host: '0.0.0.0' }, function () {
	console.log('Listening on port 3000')
});