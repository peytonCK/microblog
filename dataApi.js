const express = require('express');
const router = express.Router();
const db = require('./db');

router.post('/api/addUser', function(req, res) {
	console.log(req.body);
	let user = {
		name: req.body.name,
		password: req.body.password
	};
	db.user.find({
		name: req.body.name
	}, function(result) {
		let returnData = {
			status: 0,
			error: '',
			data: {}
		}
		if (!result.status) {
			returnData.error = "注册失败，请再次尝试。"
			res.send(returnData)
		} else {
			if (result.data.length) {
				returnData.error = "此用户名已经被占用，请尝试其他用户名。"
				res.send(returnData)
			} else {
				db.user.add(user, function(result) {
					req.session.user = user;
					console.log(req.session);
					res.send(result);

				})
			}
		}
	})

});

router.post('/api/findUser', function(req, res) {
	console.log(req.body);
	let user = {
		name: req.body.name,
		password: req.body.password
	};
	let returnData = {
		status: 0,
		error: '',
		data: {}
	};
	db.user.find(user, function(result) {
		if (!result.status) {
			returnData.error = "登录失败，请再次尝试。"
			res.send(returnData)
		} else {
			if (!result.data.length) {
				returnData.error = "用户名或密码错误！"
				res.send(returnData)
			} else {
				returnData.status = 1;
				req.session.user = user;
				console.log(req.session);
				res.send(returnData);
			}
		}
	})
});

module.exports = router;