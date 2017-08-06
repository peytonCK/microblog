const User = {
	login: function(user, callback) {
		$.post('/api/findUser', user, function(data) {
			callback(data);
		}, "json")
	},
	register: function(user, callback) {
		$.post('/api/addUser', user, function(data) {
			callback(data);
		}, "json")
	}
}

const Note = {
	publish: function(note, callback) {

	},
	fetchNote: function(note, callback) {
		callback();
	}
}

console.log(location.pathname);
let pathname = location.pathname;
if (pathname == '/') {
	Note.fetchNote({}, function() {
		console.log("fetch all notes!");
	})
}

function showMessage(message) {
	if (message) {
		$(".message .info").hide();
		$(".message .error").html(message).show();
	} else {
		$(".message .error").hide();
		$(".message .info").show();
	}
}


$(".btn-login").click(function() {
	let parentObj = $(this).parents('.form-wrapper');
	let name = parentObj.find('input#username')[0].value,
		password = parentObj.find('input#password')[0].value;
	let message = "";
	if (!name || !password) {
		message = "表单中的输入项都是必填！";
		showMessage(message);
	} else {
		let user = {
			name: name,
			password: password
		};
		console.log(user);
		User.login(user, function(data) {
			if (data.status) {
				showMessage();
				//location.href = "/";
			} else {
				showMessage(data.error);
			}
		})
	}


});

$(".btn-register").click(function() {
	let parentObj = $(this).parents('.form-wrapper');
	let name = parentObj.find('input#username')[0].value,
		password = parentObj.find('input#password')[0].value,
		passwordConfirm = parentObj.find('input#passwordConfirm')[0].value;
	let message = "";
	if (!name || !password || !passwordConfirm) {
		message = "表单中的三项都是必填！";
		showMessage(message);

	} else if (password != passwordConfirm) {
		message = "两次输入密码不一致!";
		showMessage(message);

	} else {
		let user = {
			name: name,
			password: password
		};
		console.log(user);
		User.register(user, function(data) {
			if (data.status) {
				showMessage();
				location.href = "/";
			} else {
				showMessage(data.error);
			}
		})
	}
});