const express = require('express');
const session = require('express-session');
//const MongoStore = require('connect-mongo')(session);
const FileStore = require('session-file-store')(session);
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const multer = require('multer');

const dataApi = require('./dataApi');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
//app.use(multer());
app.use(cookieParser());
app.use(session({
	secret: '12345',
	name: 'microblog',
	store: new FileStore(),
	resave: false,
	saveUninitialized: true,
	cookie: {
		path: "/",
		maxAge: 10 * 1000
	}
}))

app.use(express.static('public')); //静态资源中间件来指定静态资源路径
app.set('views', './views'); //指定模板目录
app.engine('html', require('ejs').renderFile); //定义模板引擎
app.set('view engine', 'html'); //指定模板引擎
app.set("view options", {
	"layout": true
});

app.get('/', function(req, res, next) {
	let user = {};
	console.log(req.session);
	if (req.session.user) {
		user = req.session.user;

	}
	res.render('index', {
		user: user,
		items: [{
			userId: 111111,
			userName: 'gpd1',
			time: '2017-7-26',
			content: "测试内容"
		}, {
			userId: 111112,
			userName: 'gpd2',
			time: '2017-7-26',
			content: "测试内容2"
		}]
	});
});

app.get('/login', function(req, res) {
	let user = {};
	console.log(req.session);
	if (req.session.user) {
		user = req.session.user;

	}
	res.render("login", {
		user: {}
	});
});

app.get('/register', function(req, res) {
	res.render("register", {
		user: {}
	});
});

app.get('/user/:userId', function(req, res) {
	res.render('user', {
		title: '测试11111',
		user: {
			// userId: 222222,
			// userName: "gpd"
		},
		items: [{
			userId: 111111,
			userName: 'gpd1',
			time: '2017-7-26',
			content: "测试内容"
		}, {
			userId: 111112,
			userName: 'gpd2',
			time: '2017-7-26',
			content: "测试内容2"
		}]
	});
});

app.use(dataApi);

const server = app.listen(9009, function() {
	const host = server.address().address;
	const port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
})