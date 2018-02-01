const express = require('express');
const bodyParser = require('body-parser');


const {mongoose} = require('./db/mongoose.js');
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


app.listen(3000 , () =>{
  console.log('Started on port 3000');
});


module.exports = {
  app : app
};
