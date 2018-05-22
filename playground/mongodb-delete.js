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
    
    // deleteMany. Works
    /*
    db.collection('Todos').deleteMany({text: "Something to do"}).then((result) => {
        console.log(result);
    });
    */

    // deleteOne

    // db.collection('Todos').deleteOne({text: "Walk the dog"}).then((result) => {
    //     console.log(result);
    // });


    // findOne and Delete
    // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
    //     console.log(result);
    // });
    
    // db.collection('Users').deleteMany({name: "Andrew"}).then((result) => {
    //     console.log(result);
    // });

    db.collection('Users').findOneAndDelete({_id: new ObjectID('5b035c3272cdd07e6545f8ad')}).then((result) => {
        console.log(result);
    });

    client.close();
}); 