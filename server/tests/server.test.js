const expect = require('expect');
const request = require('supertest');


const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{                            //Creating the dummy object 
    text: 'First test todo'
},{
    text: 'Second test todo'
}];

beforeEach((done)=>{
    Todo.remove({}).then(()=>{
     return   Todo.insertMany(todos);
    }).then(()=>done());
});


// Test cases for POST request


describe('POST /todos', ()=>{
    it('Should create a new todo',(done)=>{
        var text = 'Test todo text';

        request(app)                                 //Initiating the request
        .post('/todos')                             //Making a POST request
        .send({text})                               //Sending the object
        .expect(200)
        .expect((res)=>{
            expect(res.body.text).toBe(text);
        })
        .end((err, res) =>{
            if (err){
                return done(err);
            }

            Todo.find({text}).then((todos)=>{
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            }).catch((e)=>{done(e)}    )
        });
        
    });

//Test case for sending empty object

    it('Should not create todo with Invalid data', (done)=>{
        request(app)                                        
        .post('/todos')
        .send({})
        .expect(400)
        .end((err, res) =>{
            if(err){
                return done(err);
            }
            Todo.find({}).then((todos)=>{
            expect(todos.length).toBe(2);
            done();
            }).catch((e)=>{done(e)});
        });
    });
});


//creating test cases for GET request

describe('GET /todos', ()=>{                                    
    it('Should get all todos', (done)=>{
        request(app)                            //initiate request
        .get('/todos')                          //Making GET request
        .expect(200)                            //Checking the response status from postman
        .expect((res)=>{                        //creating custom expect
        expect(res.body.todos.length).toBe(2);
    })
    .end(done);
    });
});