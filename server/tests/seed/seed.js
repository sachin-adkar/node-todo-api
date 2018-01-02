const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');

const { Todo } = require('./../../models/todo');
const { User } = require('./../../models/users');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [
  {
    _id: userOneId,
    email: 'sachin@example.com',
    password: 'userOnePass',
    tokens: [{
      access: 'auth',
      token: jwt.sign({ _id: userOneId, access: 'auth' }, process.env.JWT_SECRET).toString()
    }]
  }, 
  {
    _id: userTwoId,
    email: 'glen@example.com',
    password: 'userTwoPass',
    tokens: [{
      access: 'auth',
      token: jwt.sign({ _id: userTwoId, access: 'auth' }, process.env.JWT_SECRET).toString()
    }]
  }];

const todos = [{
  _id: new ObjectID(),
  _creator: userOneId,
  text: 'First test todo'
}, {
  _id: new ObjectID(),
  text: 'Second test todo',
  _creator: userTwoId,
  completed: true,
  completedAt: 333
}];

const populateTodos = (done) => {


  Todo.remove({})
    .then(() => {
      return Todo.insertMany(todos);
    })
    .then(() => done())
    .catch((err) => {

    })
};

const populateUsers = (done) => {
  User.remove({})
    .then(() => {
      var userOne = new User(users[0]).save();
      var userTwo = new User(users[1]).save();

      return Promise.all([userOne, userTwo])
    })
    .then(() => done())
    .catch((err) => {

    });
};

module.exports = { todos, populateTodos, users, populateUsers };