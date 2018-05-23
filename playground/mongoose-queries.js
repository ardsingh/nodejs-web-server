const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} =  require('./../server/models/todo');
const {User} =  require('./../server/models/user');

var id = '5b04baecb69e63701733dbbe';

if(!ObjectID.isValid(id)) {
    console.log('ID is not valid');
}

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos', todos);
// });

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('FindOne Todos', todo);
// });

// Todo.findById(id).then((todo) => {
//     if (!todo) {
//         return console.log('Id not found');
//     }
//     console.log('FindOne Todos', todo);
// }).catch((err) => console.log(err));

User.findById('5b04007c948f65fa487b392f').then((user) => {
    if (!user) {
        return console.log('Id not found');
    }
    console.log(JSON.stringify(user, undefined, 2));
}).catch((err) => console.log(err));

// User.find().then((user) => {
//     if (!user) {
//         return console.log('User Id not found');
//     }
//     console.log(JSON.stringify(user, undefined, 2));
// }).catch((err) => console.log(err));