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
    db.collection('Todos').insertOne({
        text: 'Walk the dog',
        completed: false
    }, (err, result) => {
        if (err) {
            return console.log('Unable to insert todo', err);
        }
        // ops store all the docs that were inserted
        console.log(JSON.stringify(result.ops, undefined, 2));
    });

    db.collection('Users').insertOne({
        // id : 123,
        name: 'Ardhendu',
        age: 25,
        location: 'RTP'
    }, (err, result) => {
        if (err) {
            return console.log('Unable to insert todo', err);
        }
        // ops store all the docs that were inserted
        //console.log(JSON.stringify(result.ops, undefined, 2));
        console.log(result.ops[0]._id.getTimestamp() );
    });




    client.close();
}); 