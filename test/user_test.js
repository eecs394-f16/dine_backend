process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');
var should = chai.should();
var expect = chai.expect;

chai.use(chaiHttp);

describe("/GET user", function(){
    var userid = undefined;
    it('should Create a test account', function(done){
        chai.request(server)
            .post('/user')
            .send(
            {
                "first_name": "TEST_USER_FIRST",
                "last_name": "TEST_USER_LAST",
                "username": "TEST_USER_USERNAME",
                "email": "TEST@USER.EMAIL",
                "password": "TESTPASSWORD"

            }
        )
            .end(function(err, res){
                res.should.have.status(200);
                done();
            })
    });

    it('it should return the test account when requesting by username', function(done){
        var username = "TEST_USER_USERNAME";
        chai.request(server)
            .get('/user')
            .query({username:"TEST_USER_USERNAME"})
            .end(function(err, res){
                res.should.have.status(200);
                expect(res.body[0].username).to.equal(username);
                userid= res.body[0].id;
                expect(userid).to.be.above(-1);
                done();
            })
    });

    it('it should return the test account when requesting by id', function(done){
        chai.request(server)
            .get('/user')
            .query({userid:userid})
            .end(function(err, res){
                res.should.have.status(200);
                expect(res.body[0].id).to.equal(userid);
                done();
            })
    });


    it('should return a 404 error when asking for a user that does not exist', function(done){
        var user_id = 0;
        chai.request(server)
            .get('/user')
            .query({userid:0})
            .end(function(err, res){
                res.should.have.status(404);
                done();
            })
    });

    it('should clean up from the post', function(done){
        chai.request(server)
            .delete('/user')
            .query({username: "TEST_USER_USERNAME"})
            .end(function(err, res){
                res.should.have.status(200);
                done();
            })
    });
});
