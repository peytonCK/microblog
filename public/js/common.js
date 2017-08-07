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
		$.post('/api/addNote', note, function(data) {
			callback(data);
		}, "json")
	},
	fetchAllNotes: function(callback) {
		$.get('/api/findNotes', function(data) {
			callback(data);
		}, "json")
	},
	fetchUserNotes: function(userName, callback) {
		$.get('/api/findNotes?userName=' + userName, function(data) {
			callback(data);
		}, "json")
	},
	renderNotes: function(notes) {
		let html = "";
		for (let i = 0; i < notes.length; i++) {
			html += `<li><h3><a href="/user/${notes[i].userName}">${notes[i].userName}</a></h3>
				<span class="time">${notes[i].time}</span>
				<p>${notes[i].content}</p></li>`;
		}
		$(".items ul").html(html);
	}
}

console.log(location.pathname);


let pathname = location.pathname;
if (pathname == '/') {
	Note.fetchAllNotes(function(data) {
		console.log("fetch all notes!");
		if (data.status) {
			let items = data.data;
			Note.renderNotes(items);
		}
	})
} else if (pathname.indexOf("/user/") > -1) {
	let userName = pathname.substring(6);
	let name = $("a.user-link").text();
	if (userName != name) {
		$('.publish,.message').hide();
	}
	Note.fetchUserNotes(userName, function(data) {
		console.log("fetch user notes!");
		if (data.status) {
			let items = data.data;
			Note.renderNotes(items);
		}
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


$(".btn-publish").click(function() {
	let parentObj = $(this).parents('.publish');
	let content = parentObj.find('textarea#publish-content')[0].value;
	let message = "";
	if (!content) {
		message = "请输入内容！";
		showMessage(message);
	} else {
		let item = {
			content: content
		};
		console.log(item);
		Note.publish(item, function(data) {
			if (data.status) {
				//showMessage();
				//在列表中展示出来？？？？
				let item = data.data;
				let html = "";
				html += `<li><h3><a href="/user/${item.userName}">${item.userName}</a></h3>
				<span class="time">${item.time}</span>
				<p>${item.content}</p></li>`;
				$(".items ul").prepend(html);
			} else {
				showMessage(data.error);
			}
		})
	}
})

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
				location.href = "/";
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