let chai =require("chai");
let chaiHttp =require("chai-http");
const { response } = require("express");
let server=require("../index");

//assertion style
chai.should();

chai.use(chaiHttp);


describe("teacher API",()=>{


    /**
     * signup API for teacher
     */
    describe("POST /teacher/signUp",()=>{
        it("it should POST / register a  new teacher(instructor)",(done)=>{
           const data= {
                "name": "hello",
                "email": "hello@gmail.com",
                "password": "asdf12",
                "phone": 123455,
                "designation": "prof",
                "description": "i am this this"
            }
            chai.request(server)
                .Post('/teacher/signUp')
                .send(data)
                .end((err,response)=>{
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('message');
                    response.body.should.have.property('status')
                    response.body.should.have.property('status').eq(200);
                    response.body.should.have.property('code');
                done();    
                });
        });
    });

     /**
     * teacherInfo API for teacher details
     */
    describe("GET /teacher/teacherInfo/:teacherInfoId",()=>{
        it("it should get a details of specific :id",(done)=>{
            chai.request(server)
                .get("/teacher/teacherInfo/5f682ca154267959f800c6d8")
                .end((err,response)=>{
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('message');
                    response.body.should.have.property('status')
                    response.body.should.have.property('status').eq(200);
                    response.body.should.have.property('code');
                done();    
                });
        });
    });


});
module.exports = server;



