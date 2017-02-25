var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
<<<<<<< HEAD
=======
var db = require ('./db.js');
>>>>>>> abfed4ff7f10021e87ebe32394d32214fc20611f

var app = express();
var PORT = process.env.PORT || 3000;

var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());

app.get('/', function (req, res){
  res.send('Todo API Root');  
});

//GET /todos?completed=true
app.get('/todos', function (req, res){
<<<<<<< HEAD
    var queryParams = req.query;
=======
    var query = req.query;

    var where = {};

    if(query.hasOwnProperty('completed') && query.completed === 'true') {
        where.completed = true;
    } else if (query.hasOwnProperty ('completed') && query.completed ==='false') {
        where.completed = false;
    }

    if(query.hasOwnProperty('q') && query.q.length > 0) {
        where.description = {
            $like: '%' + query.q + '%'
        };
    }

    db.todo.findAll({where: where}).then(function (todos){
        res.json(todos);
    }, function (e) {
        res.status(500).send();
    });
    /*var queryParams = req.query;
>>>>>>> abfed4ff7f10021e87ebe32394d32214fc20611f
    var filteredTodos = todos;
    
    //filter by todos true or false
    if (queryParams.hasOwnProperty('completed') && queryParams.completed === 'true') {
        filteredTodos = _.where(filteredTodos, {completed: true});
    } else if (queryParams.hasOwnProperty('completed') && queryParams.completed === 'false') {
        filteredTodos = _.where(filteredTodos,{completed:false});
    }
    
    //filter by description
    if (queryParams.hasOwnProperty('q') && queryParams.q.length >0) {
        filteredTodos = _.filter(filteredTodos, function (todo){
            return todo.description.toLowerCase().indexOf(queryParams.q.toLowerCase()) > -1;
        });
    }
    
    
<<<<<<< HEAD
    res.json(filteredTodos);
=======
    res.json(filteredTodos);*/
>>>>>>> abfed4ff7f10021e87ebe32394d32214fc20611f
});

//GET /todos/:id
app.get('/todos/:id', function (req, res){
<<<<<<< HEAD
    var todoId = parseInt (req.params.id);
    var matchedTodo = _.findWhere(todos, {id: todoId})
=======
    var todoId = parseInt (req.params.id, 10);

    db.todo.findById(todoId).then(function(todo){
        if(!!todo) {
            res.json(todo.toJSON());
        } else {
            res.status(404).send();
        }

    }, function (e){
        res.status(500).send();

    });


    //var matchedTodo = _.findWhere(todos, {id: todoId})
>>>>>>> abfed4ff7f10021e87ebe32394d32214fc20611f
   
    /* var matchedTodo;
    
    todos.forEach(function (todo){
        if (todoId === todo.id){
            matchedTodo = todo;
        }
        
    });
    */
    
    /*if (matchedTodo) {
        res.json(matchedTodo);
    } else {
        res.status(404).send();    
    }*/
    
   
    //res.send('Asking for todo with id of ' + req.params.id); 
    
});


//POST /todos

app.post('/todos', function (req, res){
    var body = _.pick(req.body, 'description', 'completed'); // use _.pick to only pick 'description', 'completed'
<<<<<<< HEAD
    
=======
   
    db.todo.create(body).then(function (todo){
        res.json(todo.toJSON());
    }, function (e) {
        res.status(400).json(e);
    });

    /*
>>>>>>> abfed4ff7f10021e87ebe32394d32214fc20611f
    if(!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0) {
        return res.status(400).send();
    }
    //console.log('description ' + body.description);
    
    // delete space blank at the beginning of description
    body.description = body.description.trim();
    
    //add id field
    body.id = todoNextId++;
    
    //push body into array
    todos.push(body);

    
<<<<<<< HEAD
    res.json(body);
=======
    res.json(body); */
>>>>>>> abfed4ff7f10021e87ebe32394d32214fc20611f
  
});

//DELETE /todo/:id

app.delete('/todos/:id', function (req, res){
    var todoId = parseInt(req.params.id, 10);
    var matchedTodo = _.findWhere(todos, {id: todoId});
    
    if(!matchedTodo){
        res.status(404).json({"error": "no todo found with that id"});
    } else {
        todos = _.without(todos, matchedTodo);
        res.json (matchedTodo);
    }
});

//PUT /todo/:id

app.put('/todos/:id', function(req,res){
    var todoId = parseInt(req.params.id, 10);
    var matchedTodo = _.findWhere(todos, {id: todoId});
    var body = _.pick(req.body, 'description', 'completed');
    var validAttributes = {};
    
    if (!matchedTodo) {
        return res.status(404).send();
    }
    
    // Check if completed is a boolean  and exists
    if (body.hasOwnProperty('completed') && _.isBoolean(body.completed)) {
        validAttributes.completed = body.completed;
    } else if (body.hasOwnProperty('completed')) {
        return res.status(400).send();
    } 
    
    // Check if description is a String, not empty and exists    
    if (body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length > 0) {
        validAttributes.description = body.description;
    } else if (body.hasOwnProperty('description')) {
        return res.status(400).send();
    } 
    
    //Update
    _.extend(matchedTodo, validAttributes);
    res.json(matchedTodo);
    
    
});

<<<<<<< HEAD
app.listen(PORT, function () {
   console.log('Express listening on port ' + PORT + '!'); 
=======
db.sequelize.sync().then(function() {
    app.listen(PORT, function () {
       console.log('Express listening on port ' + PORT + '!'); 
    });
>>>>>>> abfed4ff7f10021e87ebe32394d32214fc20611f
});


