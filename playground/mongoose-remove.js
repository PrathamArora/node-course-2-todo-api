const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose.js');
const {Todo} = require('./../server/models/todo.js');
const {User} = require('./../server/models/user.js');

// if( !ObjectID.isValid(id) ){
//   console.log('ID not valid');
// }

// Todo.remove({}).then((result) => {
//   console.log(result);
// });


//Todo.findOneAndRemove()

//Todo.findByIdAndRemove()

Todo.findOneAndRemove({_id : '5a76a159d5394fa469d43e61'}).then((todo) => {

});

Todo.findByIdAndRemove('5a76a159d5394fa469d43e61').then( (todo) => {
  console.log(todo);
});
