const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} =  require('./../server/models/todo');
const {User} =  require('./../server/models/user');


// Todo.remove({}).then((result) => {
//     console.log(result);
// });

//Todo.findOneAndRemove same as findByIdAndRemove


// run node  playground/mongodb-connect.js  to add data
Todo.find().then((todo) => {
    if (!todo) {
        return console.log('todo Id not found');
    }
    console.log(JSON.stringify(todo, undefined, 2));
}).catch((err) => console.log(err));

// here you can query other than _id too.
Todo.findOneAndRemove({_id: '5b055ea9aff90b85a02e5bb2'}).then((todo) => {
    console.log(todo);
});

// Todo.findByIdAndRemove('5b055df003b43e831da62e82').then((todo) => {
//     console.log(todo);
// });