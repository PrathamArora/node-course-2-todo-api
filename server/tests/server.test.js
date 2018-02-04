const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server.js');
const {Todo} = require('./../models/todo.js');

const todos = [{
  _id : new ObjectID(),
  text : 'First test Todo'
}, {
  _id : new ObjectID(),
  text : 'Second text Todo'
}]


beforeEach((done) => {
  Todo.remove({}).then( () => {
    return Todo.insertMany(todos);
  }).then(() => {
    done();
  });
});

describe('POST /todos' ,() => {
  it('should create a new todo' , (done) => {
    var text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({text : text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err , res) => {
        if(err){
          return done(err);
        }

        Todo.find({text :text}).then( (todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => {
          done(e);
        });

      });
  });

  it('should not create todo with invalid body data' , (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err , res) => {
        if(err){
          return done(err);
        }

      Todo.find().then( (todos) => {
        expect(todos.length).toBe(2);
        done();
      }).catch((e) => {
        done(e);
      });

    });
  });
});


describe('GET /todos' ,() => {
  it('should get all Todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) =>{
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});

describe('GET /todos/:id' , () => {
  it('should return todo doc' , (done) =>{
      request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.todo.text).toBe(todos[0].text);
        })
        .end(done);
  });

  it('should return 404 if todo not found' , (done)=> {
    var hexId = new ObjectID().toHexString();
    request(app)
      .get(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });


  it('should return 404 for non-object ids' , (done)=> {
    var id = '186';
    request(app)
      .get(`/todos/${id}`)
      .expect(404)
      .end(done);
  });
});



describe('DELETE /todos/:id' , () => {
  it('should remove a todo' , (done) => {
    var hexId = todos[1]._id.toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.deleted_todo._id).toBe(hexId);
      })
      .end((err , res) => {
        if(err){
          return done(err);
        }

        Todo.findById(hexId).then( (todo) => {
          expect(todo).toNotExist();
          done();
        }).catch((e) => {
            done(e);
        });
      });
  });

  it('should return return 404 if todo not found' , (done) =>{
    var hexId = new ObjectID().toHexString();
    request(app)
      .delete(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('should return return 404 if ObjectID is invalid' , (done) =>{
    var id = '186';
    request(app)
      .delete(`/todos/${id}`)
      .expect(404)
      .end(done);

  });

});
