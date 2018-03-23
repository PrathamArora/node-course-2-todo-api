const {ObjectID} = require('mongodb');
const {Todo} = require('./../../models/todo.js');
const {User} = require('./../../models/user.js');
const jwt =  require('jsonwebtoken');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users =[{
    _id : userOneId,
    email : 'abc@gmail.com',
    password : 'User1Pass',
    tokens : [{
      access : 'auth' ,
      token : jwt.sign({_id : userOneId , access : 'auth'} , 'abc123').toString()
    }]
}, {
    _id : userTwoId ,
    email : 'def@gmail.com' ,
    password : 'User2Pass',
    tokens : [{
      access : 'auth' ,
      token : jwt.sign({_id : userTwoId , access : 'auth'} , 'abc123').toString()
    }]
  }];

const todos = [{
  _id : new ObjectID(),
  text : 'First test Todo',
  _creator : userOneId
}, {
  _id : new ObjectID(),
  text : 'Second text Todo',
  completed : true,
  completedAt : 123,
  _creator : userTwoId
}];

const populateTodos = (done) => {
  Todo.remove({}).then( () => {
    return Todo.insertMany(todos);
  }).then(() => {
    done();
  });
};

const populateUsers = (done) => {
  User.remove({}).then( () => {
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();

    return Promise.all([userOne , userTwo]);
  }).then(() => {
    done();
  });
};

module.exports = {
  todos : todos ,
  populateTodos : populateTodos,
  users : users,
  populateUsers : populateUsers
};
