const request =require('supertest')
const app = require('../index')

describe('Test POST /auth/register',()=>{
    test('It should respond with 200 success',async()=>{
         await request(app)
        .post('/auth/adminlogin')
        .send({
            username:'jestRegister',
            email:'jest@gmail.com',
            password:'kenny'
        })
        .expect('Content-Type',/json/)
        .expect(200)
    })
})

describe('Test POST /auth/adminlogin',()=>{
    test('It should respond with 200 success',async()=>{
        await request(app)
        .post('/auth/adminlogin')
        .send({
            email:'jest@gmail.com',
            password:'kenny'
        })
        .expect('Content-Type',/json/)
        .expect(200)
    })
    test('It should respond with 404',async()=>{
        await request(app)
        .post('/auth/adminlogin')
        .send({
            email:'abc@gmail.com',
            password:'kenny'
        })
        .expect('Content-Type',/json/)
        .expect(404)
    })
    test('It should respond with 401',async()=>{
        await request(app)
        .post('/auth/adminlogin')
        .send({
            email:'jest@gmail.com',
            password:'abc'
        })
        .expect('Content-Type',/json/)
        .expect(401)
    })
})