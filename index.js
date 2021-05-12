let express = require('express');
var http = require('http');
var bodyParser = require('body-parser');

////////////////////////////////////////////
let app = express();
var port = process.env.PORT || 3002;
app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', '*');
	res.setHeader('Access-Control-Allow-Headers', '*');
	res.setHeader('Access-Control-Allow-Credentials', '*');
	next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.listen(port, function () {
	console.log("Running Resthub on port" + port);
})

app.get('/', function (req, res, next) {
	res.jsonp({ "status": 1, "message": 'server running...' });
});
///////////////////////////////////////////

app.post('/setDriverLocation', async function (req, res, next) {
	var params = req.body;
	console.log("Get Driver Location----",params )
});


app.get('/getTest', function (req, res, next) {
	console.log("Test Working ")
});
