
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
    
    // db.collection('Todos').findOneAndUpdate(
    //     {
    //     _id: new ObjectID('5b035c3272cdd07e6545f8ac')
    //     }, {
    //         $set:{completed : true}
    //     }, {
    //         returnOriginal:false
    //     }).
    // then((result) => {
    //     console.log(result);
    // });
    
    db.collection('Users').findOneAndUpdate(
        {
        _id: new ObjectID('5b0360fc2f853b8e2ea609e6')
        }, {
            $set:{name : 'Jen'},
            $inc:{age:2}
        }, {
            returnOriginal:false
        }).
    then((result) => {
        console.log(result);
    });


    client.close();
}); 