process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');
var should = chai.should();

chai.use(chaiHttp);

describe("/POST /DELETE user (create accounts)", function(){

    it('should make sure there is no user', function(done){
        chai.request(server)
            .delete('/user')
            .query({username: "TEST_USER_USERNAME"})
            .end(function(err, res){
                res.should.have.status(200);
                done();
            })
    });


    it('should Create a new account', function(done){
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

    it('should not be able to create an account', function(done){
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
                res.should.have.status(409);
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


