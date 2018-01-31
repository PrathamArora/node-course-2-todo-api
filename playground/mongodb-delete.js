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
//delete many
  // client.db(dbName).collection('Todos').deleteMany({text : 'Eat Lunch'}).then((result) => {
  //   console.log(result);
  // });


//delete one
  // client.db(dbName).collection('Todos').deleteOne({text : 'Eat Lunch'}).then((result) => {
  //   console.log(result);
  // });

//find one and delete
  // client.db(dbName).collection('Todos').findOneAndDelete({completed : false}).then((result) => {
  //   console.log(result);
  // });


  // client.db(dbName).collection('Users').deleteMany({name : 'Pratham Arora'}).then((result) => {
  //   console.log(result);
  // });

  client.db(dbName).collection('Users').findOneAndDelete({ _id : ObjectID('5a7195a9e4e896117ca9d941')}).then((result) => {
    console.log(result);
  });






//  client.close();
});
