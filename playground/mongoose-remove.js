const {ObjectID} = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/users')

// Todo.remove({}).then((result)=>{
//     console.log(result);
    
// });

// Todo.findOneAndRemove
// Todo.findByIdAndRemove

Todo.findByIdAndRemove('5a436cfd677b03ff32b56844').then((todo)=>{
    console.log(todo);  
});