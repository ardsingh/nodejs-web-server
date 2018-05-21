// this gives us access to mongo Client from this library
//const MongoClient = require('mongodb').MongoClient;
// object destructuring
const {MongoClient, ObjectID} = require('mongodb');

var user = {name: 'Ardhendu', age: 25};
var {name} = user;
console.log(name);

var obj = new ObjectID();
console.log(obj);

// connect to database using a URL
MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true },(err, client) => {
    if(err) {
        return console.log('Unable to connect to MongoDB server');
    }
    const db = client.db('TodoApp')
    console.log('Connected to MongoDB server');
    
    // this return cursor.toArray() return a promise object.
    //db.collection('Todos').find({completed: true}).toArray().then((docs) => {
    // for other function, look at cursor section
    db.collection('Todos').find({
        _id: new ObjectID('5b034a813c09c3438313eddc')
        }).toArray().then((docs) => {
        console.log('Todos documents');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch Todos object', err);
    });

    db.collection('Todos').find().count().then((count) => {
        console.log(`Todos documents ${count}`);
    }, (err) => {
        console.log('Unable to count Todos object', err);
    });

    db.collection('Users').find({
        name: 'Andrew'
        }).toArray().then((docs) => {
        console.log('Users documents');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch Todos Andrew object', err);
    });


    client.close();
}); 