let express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var gplay = require('google-play-scraper');
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

app.post('/getAppInfo', async function (req, res, next) {
	var params = req.body;
	const { appIds } = params;
	getPackageDataHandler(appIds).then(appData => {
		res.jsonp({ "status": 1, data: appData });
	}).catch(err => {
		res.jsonp({ "status": 0, data: null });
	});

});

const getPackageDataHandler = async (idsData) => {
	let appsData = [];
	for (let i = 0; i < idsData.length; i++) {
		let dt = await gplay.app({ appId: idsData[i] })
			.then((appdata) => {
				const { title = "", genreId = "", genre = "", appId = "", url = "" } = appdata;
				let collectData = { title, genreId, genre, appId, url };
				return collectData;
			}).catch(err => console.log("eeee", err))
		appsData.push(dt)
	}
	return appsData;
}

app.get('/getAppInfo', function (req, res, next) {
	let appId = req.query.appId;
	if (!appId) { res.jsonp({ "status": 0, "message": 'send app id in request' }); }
	gplay.app({ appId: appId })
		.then(appdata => {
			const { title = "", genreId = "", genre = "", appId = "", url = "" } = appdata;
			let collectData = { title, genreId, genre, appId, url };
			res.jsonp({ "status": 1, "message": 'success', data: collectData });
		}).catch(err => {
			console.log(err)
			res.jsonp({ "status": 0, "message": 'error', data: null });
		});
});

app.get('/getAppCat', function (req, res, next) {
	let appCat = gplay.category;
	res.jsonp({ "status": 1, "message": 'success', data: appCat });
});
