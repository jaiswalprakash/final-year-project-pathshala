// const expect = require('chai').expect;
// const request = require('supertest');

// const app = require('../../../index');
// const conn = require('../../../index');

// describe('POST/teacher/signUp', () => {
//     before((done) => {
//         conn.connect()
//             .then(() => done())
//             .catch((err) => done(err));

//     })

//     // after((done)=>{
//     //     conn.close()
//     //     .then(()=>done())
//     //     .catch((err)=>done(err));

//     // })

//     it('OK, creating a new teacher account  works', (done) => {
//         request(app).post('/teacher/signUp')
//             .send({
//                 "name": "hello",
//                 "email": "hello@gmail.com",
//                 "password": "asdf12",
//                 "phone": 123455,
//                 "designation": "prof",
//                 "description": "i am this this"
//             })
//             .then((res) => {
//                 const body = res.body;
//                 expect(body).to.contain.property('status')
//                 expect(body).to.contain.property('message')
//                 done();
//             })
//             .catch((err) => done(err));
//     })
// })