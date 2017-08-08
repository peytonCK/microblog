const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const db = require('./db');

function md5Password(password) {
	let md5 = crypto.createHash('md5');
	md5.update(password);
	return md5.digest('hex');
}

router.post('/api/addUser', function(req, res) {
	console.log(req.body);
	let user = {
		name: req.body.name,
		password: md5Password(req.body.password)
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
					res.cookie(
						"user",
						user, {
							maxAge: 1000 * 60 * 60
						}
					);
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
		password: md5Password(req.body.password)
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
				res.cookie(
					"user",
					user, {
						maxAge: 1000 * 60 * 60
					}
				);
				console.log(req.session);
				res.send(returnData);
			}
		}
	})
});


router.post('/api/addNote', function(req, res) {
	console.log(req.session);
	let item = {
		userName: req.session.user.name,
		content: req.body.content,
		time: new Date()
	};
	let returnData = {
		status: 0,
		error: '',
		data: {}
	};
	db.note.add(item, function(result) {
		if (!result.status) {
			returnData.error = "发布失败，请再次尝试。"
			res.send(returnData)
		} else {
			returnData.status = 1;
			returnData.data = item;
			res.send(returnData);
		}
	})
});

router.get('/api/findNotes', function(req, res) {
	console.log(req.query);

	let item = {};

	if (req.query.userName) {
		item.userName = req.query.userName;
	}

	let returnData = {
		status: 0,
		error: '',
		data: {}
	};
	db.note.find(item, function(result) {
		if (!result.status) {
			returnData.error = "查找失败，请再次尝试。"
			res.send(returnData)
		} else {
			returnData.status = 1;
			returnData.data = result.data;
			res.send(returnData);
		}
	})
});

module.exports = router;