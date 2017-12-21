


// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Cannot connevt mongodb');
    }
    console.log('Connected to MongoDB server');
    // db.collection('Todos').deleteMany({text:"Drink beer"}).then((result)=>{
    //     console.log(result)
    // })
    // db.collection('Todos').deleteOne({text:"drink beer"}).then((res)=>{
    //     console.log(res);
    // })
    // db.collection('Todos').findOneAndDelete({"completed" : false}).then((result) => {
    //     console.log(result);

    // });
    // db.collection('Todos').deleteOne({text:"Something new"}).then((res)=>{
    //     console.log(res);
//    })

// db.collection('Todos').deleteMany({text:"Something new"}).then((res)=>{
//     console.log(res);
db.collection('Todos').findOneAndDelete({text:"Something new"}).then((res)=>{
    console.log(res);
    
});

    // db.close();
});