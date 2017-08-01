const express = require('express');
const app = express();

app.use(express.static('public')); //静态资源中间件来指定静态资源路径
app.set('views', './views'); //指定模板目录
app.engine('html', require('ejs').renderFile); //定义模板引擎
app.set('view engine', 'html'); //指定模板引擎

app.get('/', function(req, res, next) {
	res.render('index', {
		title: '测试11111'
	});
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