const express = require('express');
const app = express();

app.get('/', function(req, res) {
	res.send('Hello World!');
});

app.get('/login', function(req, res) {
	res.send("login page1");
});

app.get('/register', function(req, res) {
	res.send("register page");
});

app.get('/user/:userId', function(req, res) {
	res.send("user:" + req.params.userId + " page");
});

const server = app.listen(9009, function() {
	const host = server.address().address;
	const port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
})