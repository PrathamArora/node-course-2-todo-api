const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server.js');
const {Todo} = require('./../models/todo.js');
const {todos , populateTodos , users , populateUsers} = require('./seed/seed.js');
const {User} = require('./../models/user.js');

beforeEach(populateUsers);
beforeEach(populateTodos);

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



  describe('PATCH /todos/:id' , () => {
    it('should update the todo' , (done) => {
      var hexId = todos[0]._id.toHexString();
      var text = 'This is the new text';

      request(app)
        .patch(`/todos/${hexId}`)
        .send({text : text , completed : true})
        .expect(200)
        .expect((res) => {
          expect(res.body.todo.text).toBe(text);
          expect(res.body.todo.completed).toBe(true);
          expect(res.body.todo.completedAt).toBeA('number');
        })
        .end(done);
    });


    it('should clear completedAt when todo is not completed' , (done) => {
      var hexId = todos[1]._id.toHexString();
      var text = 'This is the new text part 2';

      request(app)
        .patch(`/todos/${hexId}`)
        .send({text : text , completed : false})
        .expect(200)
        .expect((res) => {
          expect(res.body.todo.text).toBe(text);
          expect(res.body.todo.completed).toBe(false);
          expect(res.body.todo.completedAt).toNotExist();
        })
        .end(done);

    });
  });


describe('GET /users/me' , () => {
  it('should return user if authenticated' , (done) => {
    request(app)
      .get('/users/me')
      .set('x-auth' , users[0].tokens[0].token)
      .expect(200)
      .expect( (res) =>{
        expect(res.body._id).toBe(users[0]._id.toHexString());
        expect(res.body.email).toBe(users[0].email);
      })
      .end(done);
  });


  it('should return a 401 if not token is provided' , (done) => {
    request(app)
      .get('/users/me')
      .expect(401)
      .expect( (res) => {
        expect(res.body.status).toBe(401);
      })
      .end(done);
  });
});


describe('POST /users' , () => {
  it('should create a user' , (done)=> {
    var email = 'example@example.com';
    var password = '123mnb!';
    request(app)
      .post('/users')
      .send({email : email , password : password})
      .expect(200)
      .expect((res) => {
        expect(res.headers['x-auth']).toExist();
        expect(res.body._id).toExist();
        expect(res.body.email).toBe(email);
      })
      .end( (err) => {
        if(err){
          done(err);
        }
        User.findOne({email:email}).then( (user) => {
          expect(user).toExist();
          expect(user.password).toNotBe(password);
          done();
        }).catch((e) => {
          done(e);
        });
      });
  });


  it('should return validation errors if request is invalid' , (done)=>{
    request(app)
      .post('/users')
      .send({email : 'abcdeail.com' , password : 'abc'})
      .expect(400)
      .end(done);
  });

  it('should not create user if email is already in use' , (done) => {
    request(app)
      .post('/users')
      .send({email : 'abc@gmail.com' , password : 'password'})
      .expect(400)
      .end(done);
  });
});


describe('POST /users/login' , () =>{
  it('should login user and return auth token' , (done) => {
    request(app)
      .post('/users/login')
      .send({
        email : users[1].email,
        password : users[1].password
      })
      .expect(200)
      .expect((res) => {
        expect(res.header['x-auth']).toExist();
      })
      .end( (err , res) => {
        if(err){
          done(err);
        }

        User.findById(users[1]._id).then((user) => {
          expect(user.tokens[0]).toInclude({
            access : 'auth' ,
            token : res.headers['x-auth']
          });
          done();
        }).catch( (e) => {
          done(e);
        });
      });
  });

  it('should reject invalid login' , (done) =>{
    request(app)
      .post('/users/login')
      .send({
        email : users[1].email,
        password : users[1].password+'1'
      })
      .expect(400)
      .expect((res) => {
        expect(res.header['x-auth']).toNotExist();
      })
      .end( (err , res) => {
        if(err){
          return done(err);
        }

        User.findById(users[1]._id).then((user) => {
          expect(user.tokens.length).toBe(0);
          done();
        }).catch( (e) => {
          done(e);
        });
      });
    });
});
