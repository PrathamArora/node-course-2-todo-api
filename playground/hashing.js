const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');


var data = {
  id : 8
};

var token = jwt.sign(data , '123abc');
console.log(token);

var decoded = jwt.verify(token , '123abc');
console.log('decoded', decoded);

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
