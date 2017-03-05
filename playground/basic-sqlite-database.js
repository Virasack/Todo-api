var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
	'dialect' : 'sqlite',
	'storage' : __dirname + '/basic-sqlite-database.sqlite'
});

var Todo = sequelize.define('todo', {
	description: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			len: [1, 250]
		}
	},
	completed: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false
	}
});

var User = sequelize.define('user', {
	email: Sequelize.STRING
});

Todo.belongsTo(User);
User.hasMany(Todo);

sequelize.sync({
	//force:true
}).then(function (){
	console.log('Everything is synced');

	User.findById(1).then(function (user){
		user.getTodos({
			where: {
				completed:false
			}
		}).then(function (todos) {
			todos.forEach(function (todo){
				console.log(todo.toJSON());
			});
		});
	});


	// User.create({
	// 	email: 'nikos@email.com'
	// }).then( function () {
	// 	return Todo.create({
	// 		description: 'Clean bathroom'
	// 	});
	// }).then (function (todo) {
	// 	User.findById(1).then(function (user){
	// 		user.addTodo(todo);
	// 	});
	//});
	// Todo.findById(2).then(function(todo){
	// 	if(todo) {
	// 		console.log(todo.toJSON());
	// 	}
	// 	else {
	// 		console.log('Todo not found!');
	// 	}
	//});

	/*

	Todo.create({
		description : 'Take out trash',
		//completed : false
	}).then(function (todo){
		return Todo.create({
			description : 'Walk the dog'
		});
	}).then(function(){
		return Todo.findAll({
			where: {
				//description: {
				//	$like: '%dfsf%'

				//}, 
				completed : true
			}
		});
	}).then(function (todos){
		if (todos) {
			todos.forEach(function(todo){
				console.log(todo.toJSON());
			});
		} else {
			console.log("Todos not found!");
		} 
	})
	.catch(function (e){
		console.log(e);
	}); */
});