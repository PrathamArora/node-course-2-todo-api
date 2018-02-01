const express = require('express');
const bodyParser = require('body-parser');


const {mongoose} = require('./db/mongoose.js');
const {ObjectID} = require('mongodb');
var {Todo} = require('./models/todo.js');
var {User} = require('./models/user.js');


// var newTodo = new Todo({
//   text : 'Something to do'
// });
//
// newTodo.save().then((doc) => {
//   console.log(JSON.stringify( doc , undefined , 2));
// } , (e) => {
//   console.log(JSON.stringify(e , undefined , 2));
// });
//
//
//
//
// var newUser = new User({
//   email : 'abc@gmail.com'
// });
//
// newUser.save().then((doc) => {
//   console.log(JSON.stringify(doc , undefined , 2));
// } , (e) => {
//   console.log(JSON.stringify(e , undefined , 2));
// });

var app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());

app.post('/todos' , (req , res) =>{
  var todo = new Todo({
    text : req.body.text
  });

  todo.save().then( (doc) => {
    res.send(doc);
  } , (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos' , (req , res) => {
  Todo.find().then((todos) => {
    res.send({
      todos : todos ,
      code : 'done'
    });
  } , (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos/:id' , (req , res) => {
  var id = req.params.id;
//  res.send(req.params);
  if(!ObjectID.isValid(id)){
    res.status(404).send();
  }
  Todo.findById(id).then((todo) => {
    if(!todo){
      return res.status(404).send();
    }
    res.send({todo : todo});
  }).catch((e) => {
    res.status(400).send();
  });

});



app.listen(port , () =>{
  console.log(`Started on port ${port}`);
});


module.exports = {
  app : app
};
