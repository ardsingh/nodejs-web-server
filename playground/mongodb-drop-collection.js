// this gives us access to mongo Client from this library
//const MongoClient = require('mongodb').MongoClient;
// object destructuring
const {MongoClient, ObjectID} = require('mongodb');

// connect to database using a URL
MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true },(err, client) => {
    if(err) {
        return console.log('Unable to connect to MongoDB server');
    }
    const db = client.db('TodoApp')
    console.log('Connected to MongoDB server');
    
    //db.collection('Users').dropCollection().then((result) => {
    db.collection('Users').drop().then((result) => {
        console.log('Users collection deleted');
    }, (err) => {
        console.log('Unable to delete the collection Users');
    });
    
    client.close();
}); 