var bodyParser = require('body-parser');
var express = require('express');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    //console.log(req.body);
    var todo = new Todo({
        text: req.body.text
    });
    todo.save().then((doc) => {
        res.send(doc);
    }, 
    (err) => {
        res.status(400).send(err);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, 
    (err) => {
        res.status(400).send(err);
    });
});

// GET /todos/123456
app.get('/todos/:id', (req, res) => {
    // let us send the parameter key:value back in response to check in postman
    //res.send(req.params);
    var id = req.params.id;
    if(!ObjectID.isValid(id)) {
        console.log('ID is not valid');
        return res.status(404).send();
    }
    // findById
    // we replace todo with abc
    // this abc must match with argument name in the server-test.js
    Todo.findById(id).then((abc) => {
        if (!abc) {
            console.log('Id not found');
            return res.status(404).send();
        }
        return res.send({abc});
    }).catch((err) => res.status(400).send());
})

app.listen(3000, () => {
    console.log('Started on port 3000');

});

module.exports = {app};