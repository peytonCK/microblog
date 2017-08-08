const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const redisStore = require('connect-redis')(session);
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
	//store: new redisStore(),
	resave: false,
	saveUninitialized: true,
	cookie: {
		maxAge: 5 * 60 * 1000
	}
}))

app.use(express.static('public')); //静态资源中间件来指定静态资源路径
app.set('views', './views'); //指定模板目录
app.engine('html', require('ejs').renderFile); //定义模板引擎
app.set('view engine', 'html'); //指定模板引擎
app.set("view options", {
	"layout": true
});

app.use(function(req, res, next) {
	// if (!req.session.user) {
	// 	res.redirect("/login");
	// } else {
	// 	next();
	// }
	if (res.cookie && res.cookie.user) {
		req.session.user = res.cookie.user;
	}
	next();
})

app.get('/', function(req, res, next) {
	let user = {};
	console.log(req.session);
	if (req.session.user) {
		user = req.session.user;
	}
	res.render('index', {
		user: user
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

app.get('/logout', function(req, res, next) {
	req.session.destroy(function(err) {
		if (err) {
			res.json({
				ret_code: 2,
				ret_msg: '退出登录失败'
			});
			return;
		}

		// req.session.loginUser = null;
		res.clearCookie("microblog");
		res.redirect('/');
	})
})

app.get('/register', function(req, res) {
	res.render("register", {
		user: {}
	});
});

app.get('/user/:userId', function(req, res) {
	let user = {};
	console.log(req.session);
	if (req.session.user) {
		user = req.session.user;

	}
	res.render('user', {
		user: user
	});
});

app.use(dataApi);


const server = app.listen(9009, function() {
	const host = server.address().address;
	const port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
})