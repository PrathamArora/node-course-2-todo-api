const {MongoClient , ObjectID} = require('mongodb');
//const MongoClient = require('mongodb').MongoClient;

// var obj = new ObjectID();
// console.log(obj);

const dbName = 'TodoApp';

MongoClient.connect('mongodb://localhost:27017' , (err , client) => {
  if( err ){
    return console.log('Unable to connect to ModngoDB server');
  }

  
  console.log('Connected to MongoDB server');

  // client.db(dbName).collection('Todos').findOneAndUpdate({
  //   _id : new ObjectID('5a71c425fa404629368aa28c')
  // } , {
  //   $set : {
  //     completed : true
  //   } ,
  //   $rename : {
  //     'description' : 'text'
  //   }
  // } , {
  //   returnOriginal : false
  // }).then((result) => {
  //   console.log(result);
  // });

  client.db(dbName).collection('Users').findOneAndUpdate({
    name : 'DEF'
  } , {
    $set : {
      name : 'Pratham Arora'
    } ,
    $inc : {
      age : 1
    }
  } , {
    returnOriginal : false
  }).then((result) => {
    console.log(result);
  });





//  client.close();
});
