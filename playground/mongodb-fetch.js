// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Cannot connevt mongodb');
    }
    console.log('Connected to MongoDB server');


    // db.collection('Todos').find({
    //     _id: new ObjectID('5a3b4dca07ab761bff385525')
    // }).toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('Unable to fetch the document', err);
    // });



    // db.collection('Todos').find().count().then((count) => {
    //     console.log('Todos count:',count);

    // }, (err) => {
    //     console.log('Unable to fetch the document', err);
    // });


    db.collection('Users').find({name: "Sachin"}).toArray().then((docs) => {
        console.log("Todos");
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Cannot fetch the document', err);
    });

    // db.close();
});