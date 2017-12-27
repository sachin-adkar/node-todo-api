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
  //find all the todos
  Todo.find().then((todos) => {
    res.send({ todos });
  }, (e) => {
    res.status(400).send(e);
  });
});


//Pass the query using the query string

app.get('/todos/:id', (req, res) => {
  //Params has the key value pairs, where key is url and value is whatever we give
  var id = req.params.id;
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


app.delete('/todos/:id', (req, res) => {
  //get id

  var id = req.params.id;

  //Validate the id --> not valid? return 404

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  // remove todo by id
  Todo.findByIdAndRemove(id).then((todo) => {
 
    //if no doc 404
    if (!todo) {
      return res.status(404).send();
    }
    //succes
    //if doc return it
    res.send({todo});
  }).catch((e) => res.status(404).send()); //error 404
});

app.listen(port, () => {
  console.log('Started on port', port);
});

module.exports = { app };