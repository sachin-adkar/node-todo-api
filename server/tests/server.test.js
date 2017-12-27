const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');

const todos = [{
    _id: new ObjectID(),                     //Creating the dummy object 
    text: 'First test todo'
}, {
    _id: new ObjectID(),
    text: 'Second test todo'

}];

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
});


// Test cases for POST request


describe('POST /todos', () => {
    it('Should create a new todo', (done) => {
        var text = 'Test todo text';

        request(app)                                 //Initiating the request
            .post('/todos')                             //Making a POST request
            .send({ text })                               //Sending the object
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find({ text }).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => { done(e) })
            });

    });

    //Test case for sending empty object

    it('Should not create todo with Invalid data', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.find({}).then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e) => { done(e) });
            });
    });
});


//creating test cases for GET request

describe('GET /todos', () => {
    it('Should get all todos', (done) => {
        request(app)                            //initiate request
            .get('/todos')                          //Making GET request
            .expect(200)                            //Checking the response status from postman
            .expect((res) => {                        //creating custom expect
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    });

    describe('GET /todos/:id', () => {
        it('Should return todo doc', (done) => {
            request(app)
                .get(`/todos/${todos[0]._id.toHexString()}`)
                .expect(200)
                .expect((res) => {
                    expect(res.body.todo.text).toBe(todos[0].text);
                    // console.log(res.body);

                })
                .end(done);
        });
        it('Should return 404 if todo not found', (done) => {
            var id = new ObjectID().toHexString();
            request(app)
                .get(`/todos/${id}`)
                .expect(404)
                .end(done);
        });
        it('Should return 404 for non-object id', (done) => {
            request(app)
                .get('/todos/123sfksdnvf')
                .expect(404)
                .end(done)
        });
    });
    describe('DELETE /todos/:id', () => {
        it('Should remove a todo', (done) => {
            var hexId = todos[1]._id.toHexString();

            request(app)
                .delete(`/todos/${hexId}`)
                .expect(200)
                .expect((res) => {
                    // console.log(res.body);

                    expect(res.body.todo._id).toBe(hexId);
                })
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    Todo.findById(hexId).then((todo) => {
                        expect(todo).toNotExist();
                        done();
                    }).catch((e) => done())
                });
        });
        it('Should return a 404 if todo not found', (done) => {
            var hexId = new ObjectID().toHexString();
            request(app)
                .delete(`/todos/${hexId}`)
                .expect(404)
                .end(done);
        });

        it('Should return 404 if object id is invalid', (done) => {
            request(app)
                .delete(`/todos/sosdkj`)
                .expect(404)
                .end(done);
        });
    });
    describe('PATCH /todos/:id', () => {
        it('Should update the todo', (done) => {
            var hexId = todos[0]._id.toHexString();
            var text = "New Update Test"
            request(app)
                .patch(`/todos/${hexId}`)
                .send({
                    completed: true,
                    text
                })
                .expect(200)
                .expect((res) => {
                    expect(res.body.todo.text).toBe(text);
                    expect(res.body.todo.completed).toBe(true);
                    expect(res.body.todo.completedAt).toBeA('number');
                    //   expect(res.body.todo.completed).toBe(true);
                })
                .end(done);

        });
        it('should clear completedAt when todo is not completed', (done)=>{
            var hexId = todos[1]._id.toHexString();
            var text = "New Update Test!!!"
            request(app)
                .patch(`/todos/${hexId}`)
                .send({
                    completed: false,
                    text
                })
                .expect(200)
                .expect((res) => {
                    expect(res.body.todo.text).toBe(text);
                    expect(res.body.todo.completed).toBe(false);
                    expect(res.body.todo.completedAt).toNotExist();
                    //   expect(res.body.todo.completed).toBe(true);
                })
                .end(done);
        });

    });
});