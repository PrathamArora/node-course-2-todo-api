const {MongoClient , ObjectID} = require('mongodb');
//const MongoClient = require('mongodb').MongoClient;

// var obj = new ObjectID();
// console.log(obj);

const dbName = 'TodoApp';

// var user = {name : 'Pratham' , age : 21};
// var {name} = user;
// console.log(name);


MongoClient.connect('mongodb://localhost:27017' , (err , client) => {
  if( err ){
    return console.log('Unable to connect to ModngoDB server');
  }
  console.log('Connected to MongoDB server');

  // const col = client.db(dbName).collection('Todos').insertOne({
  //   text : 'Something to do' ,
  //   completed : false
  // } , (err , result) => {
  //   if(err){
  //     return console.log('Unable to insert todo',err);
  //   }
  //   console.log(JSON.stringify(result.ops , undefined , 2));
  // });

  // const col2 = client.db(dbName).collection('Users').insertOne({
  //   name : 'Pratham Arora' ,
  //   age : 21 ,
  //   location : 'Delhi'
  // } , (err , result) => {
  //   if(err){
  //     return console.log('Unable to insert user',err);
  //   }
  //   console.log(JSON.stringify(result.ops[0]._id.getTimestamp() , undefined , 2));
  //
  // });

  client.close();
});
