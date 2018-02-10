const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abc!';

bcrypt.genSalt(10 , (err , salt)=> {
  bcrypt.hash(password , salt , (err , hash) => {
    console.log(hash);
  });
});

var hashedPassword = '$2a$10$nw13tWTblX7.nMkB9vJzQOVY/zd9fmoMxzvDznMrx7Ch0KmFpqF4O';
bcrypt.compare(password , hashedPassword , (err , res) => {
  console.log(res);
});


// var data = {
//   id : 8
// };
//
// var token = jwt.sign(data , '123abc');
// console.log(token);
//
// var decoded = jwt.verify(token , '123abc');
// console.log('decoded', decoded);

// var message = 'I am user number 3';
// var hash = SHA256(message).toString();
//
// console.log(`message : ${message}`);
// console.log(`hash : ${hash}`);
//
// var data = {
//   id : 4
// };
//
// var token = {
//   data : data,
//   hash : SHA256(JSON.stringify(data) + 'somesecretstring').toString()
// };
//
//
// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecretstring').toString();
//
// if(resultHash === token.hash){
//   console.log('Data was not changed');
// }else{
//   console.log('Data was changed. Dont trust');
// }
