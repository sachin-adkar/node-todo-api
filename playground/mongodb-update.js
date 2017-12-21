


// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Cannot connevt mongodb');
    }
    console.log('Connected to MongoDB server');


    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('5a3b98825c8dac354b56691a')
    // }, {
    //         $set: {
    //             completed: true
    //         }
    //     },
    //     {
    //         returnOriginal: false
    //     }
    // ).then((res) => {
    //     console.log(res);
    // })
    db.collection('Todos').findOneAndUpdate({
        _id: new ObjectID('5a3ba315dee9f559e2c91616')
    },{
        $inc:{
            age: 1
        }
    },
{
    returnResult: false
}).then((res)=>{
    console.log(res);
    
})
    // db.close();
});