const {ObjectID} = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/users')

var id = '5a423bc362b416e2182f11121';
var userId = '5a3ca8f6d449941e180fa369';

// if(!ObjectID.isValid(id)){
// console.log('Id is not valid');
// }

//Query (find) by using the id 


//  Todo.find({             
//      _id: id
//  }).then((todos)=>{            //then returns the todos  
// console.log('Todos', todos);
//  });

//  Todo.findOne({
//     _id: id
// }).then((todo)=>{
// console.log('Todo', todo);
// });


// Todo.findById(id).then((todo) => {
//     if (!todo) {
//         return console.log("ID not found");
//     }
//     else {
//         console.log('Todo by id', todo);
//     }
// }).catch((e) => console.log(e));

User.findById(userId).then((user)=>{
    if(!user){
        console.log('User not found');
    }
    else{
        console.log('User', user);
        }
}).catch((e)=> console.log(e));



