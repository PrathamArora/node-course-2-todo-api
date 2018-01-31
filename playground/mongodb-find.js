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

  // client.db(dbName).collection('Todos').find({
  //   _id : new ObjectID('5a719fd2fa404629368a9d4e')
  // }).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined , 2));
  // } , (err) => {
  //   console.log('Unable to fetch todos', err);
  // });

  // client.db(dbName).collection('Todos').find().count().then((count) => {
  //   console.log(`Todos Count : ${count}`);
  // } , (err) => {
  //   console.log('Unable to fetch todos', err);
  // });

  client.db(dbName).collection('Users').find({
    name : 'ABC'
  }).count().then((count) => {
    console.log(`Users Count : ${count}`);
  } , (err) => {
    console.log('Unable to fetch users', err);
  });



//  client.close();
});
