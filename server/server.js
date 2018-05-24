
require('./config/config');

const _ = require('lodash');
const bodyParser = require('body-parser');
const express = require('express');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000; // this sets up for Heroku

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
});

app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id)) {
        console.log('ID is not valid');
        return res.status(404).send();
    }
    Todo.findByIdAndRemove(id).then((efg) => {
        if (!efg) {
            console.log('Id not found');
            return res.status(404).send();
        }
        return res.send({efg});
    }).catch((err) => res.status(400).send());

});

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);
    if(!ObjectID.isValid(id)) {
        console.log('ID is not valid');
        return res.status(404).send();
    }
    if(_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null; // this will remove the  value from the database, set it to null
    }

    // normally $set should be written as $set:{name : 'Jen'}, but the body is already in that form
    // {new:true} will written the update object, similar to returnOriginal:false in mongodb world
    Todo.findByIdAndUpdate(id, {$set: body},{new: true})
    .then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        // since we have already update the document with the updated value, we are ready to send out
        res.send({todo});
    }).catch((err) => {
        res.status(400).send();
    }); 
});

app.listen(port, () => {
    console.log(`Started on port ${port}`);

});

module.exports = {app};