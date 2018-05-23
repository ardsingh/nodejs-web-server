const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} =  require('./../server');
const {Todo} =  require('./../models/todo');

const todos = [{
    _id: new ObjectID(),
    text: 'First test todo'
}, {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 345
}];

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = 'Test1 todo text';

        // below text is converted to JSON by the supertest
        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
               expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((err) => done(err));
            });
    });

    it('should not create todo with invalid body data', (done) => {
        request(app)
        .post('/todos')
        .send({})
        .expect(400)
        .end((err, res) => {
            if (err) {
                return done(err);
            }
            Todo.find().then((todos) => {
                expect(todos.length).toBe(2);
                done();
            }).catch((err) => done(err));
        });
    });
});


describe('Get /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    });
});

describe('GET /todos/:id', () => {
    // it is an asynchronous test, so we provide done argument
    it('should return todo doc', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => { // the todo is what is being returned by server.js as a response to this quyer
                expect(res.body.abc.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it('should return 404 if todo id not found', (done) => {
        var newId = new ObjectID().toHexString();
        request(app)
            .get(`/todos/${newId}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 for non-valid ID', (done) => {
        request(app)
            .get('/todos/123')
            .expect(404)
            .end(done);
    });
});


describe('DELETE /todos/:id', () => {
    it('should remove a todo', (done) => {
        var hexId = todos[1]._id.toHexString();

        request(app)
            .delete(`/todos/${hexId}`) 
            .expect(200)
            .expect((res) => {
                expect(res.body.efg._id).toBe(hexId);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                // query database using findById toNotExist
                Todo.findById(hexId).then((todo) => {
                    expect(todo).toBeFalsy();
                    done();
                }).catch((err) => done(err));
            })
    });

    it('should return 404 if todo not found', (done) => {
        var newId = new ObjectID().toHexString();
        request(app)
            .delete(`/todos/${newId}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 if object ID is invalid', (done) => {
        request(app)
        .delete('/todos/123')
        .expect(404)
        .end(done);
    });
});

describe('PATCH /todos/:id', () => {
    it('should update the todo', (done) => {
        var hexId = todos[0]._id.toHexString();
        var text = 'This should be the new text';
        request(app)
            .patch(`/todos/${hexId}`)
            .send({
                completed:true,
                text
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(true);
                expect(typeof res.body.todo.completedAt).toBe('number');
            })
            .end(done);
    });

    it('should set null completedAt when completed flag is set to false', (done) => {
        var hexId = todos[1]._id.toHexString();
        var text = 'Second test todo';
        request(app)
            .patch(`/todos/${hexId}`)
            .send({
                completed:false,
            })
            .expect(200)
            .expect((res) => {
                console.log(res.body.todo.text);
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(false);
                expect(res.body.todo.completedAt).toBeNull();
            })
        .end(done);
    });
});