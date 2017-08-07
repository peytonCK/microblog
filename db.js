const MongoClient = require('mongodb').MongoClient;
const DB_CONN_STR = 'mongodb://localhost:27017/microblog';

let dbConnect = function(data, callback) {
	MongoClient.connect(DB_CONN_STR, callback);
}


//{status:0/1,error:"插入失败！",data:{}/[]}

let user = {
	add: function(user, callback) {
		dbConnect(user, function(err, db) {
			let collection = db.collection('users');
			collection.insert(user, function(err, result) {
				let res = {
					status: err ? 0 : 1,
					error: err ? err : "",
					data: result
				}
				callback(res);

				db.close();
			})
		})
	},
	update: function() {

	},
	find: function(user, callback) {
		dbConnect(user, function(err, db) {
			let collection = db.collection('users');
			collection.find(user).toArray(
				function(err, result) {
					let res = {
						status: err ? 0 : 1,
						error: err ? err : "",
						data: result
					}
					callback(res);

					db.close();
				})
		})
	}
}


let note = {
	add: function(note, callback) {
		dbConnect(note, function(err, db) {
			let collection = db.collection('notes');
			collection.insert(note, function(err, result) {
				let res = {
					status: err ? 0 : 1,
					error: err ? err : "",
					data: result
				}
				callback(res);

				db.close();
			})
		})
	},
	update: function() {

	},
	delete: function() {

	},
	find: function(note, callback) {
		dbConnect(note, function(err, db) {
			let collection = db.collection('notes');
			collection.find(note).sort({
				time: -1
			}).toArray(
				function(err, result) {
					let res = {
						status: err ? 0 : 1,
						error: err ? err : "",
						data: result
					}
					callback(res);

					db.close();
				})
		})
	}
}

module.exports = {
	user,
	note
}