var port = process.enc_VCAP_APP_PORT || 8080;
let path = require('path');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var ch = require('cheerio');
var request = require('request');
var urlencodedParser = bodyParser.urlencoded({ extended : false});
app.use(express.static('public'));
app.get('/', function(req, res){
	res.sendFile(path.join(__dirname, 'views/index.html'));
});
app.post('/lyrics', urlencodedParser, function(req, res){
	var author = req.body.authorname;
	var song = req.body.songname;
	request("https://genius.com/"+author+"-"+song+"-lyrics", (err, resp, body)=>{
		const htmls = ch.load(body);
		res.send(htmls(".lyrics").html());
	});
});
app.listen(port);