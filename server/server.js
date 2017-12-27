var { ObjectID } = require('mongodb');


var express = require('express');
var bodyParser = require('body-parser');


var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/users');

var app = express();
//The process.env is set app is running on heroku, else it will run locally on port 3000
const port = process.env.PORT || 3000; 

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  console.log(req.body);
  var todo = new Todo({
    text: req.body.text
  });
  todo.save().then((doc) => {
    res.send(doc)
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {          //find all the todos
    res.send({ todos });
  }, (e) => {
    res.status(400).send(e);
  });
});


//Pass the query using the query string

app.get('/todos/:id', (req, res) => {
  var id = req.params.id;             //Params has the key value pairs, where key is url and value is whatever we give
  if (!ObjectID.isValid(id)) {
    res.status(404).send();
  }
  Todo.findById(id).then((todo) => {
    if (!todo) {
      console.log("Todo not found");
      res.status(404).send();
    }
    else {

      res.send({ todo });
    }
  }
  ).catch((e) => res.status(404).send());
});

app.listen(port, () => {
  console.log('Started on port',port);
});

module.exports = { app };