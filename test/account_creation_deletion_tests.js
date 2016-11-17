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


describe("/POST /PUT /DELETE user (udate accounts)", function(){

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

    it('should update the account', function(done){
        chai.request(server)
            .post('/user/update')
            .send(
            {
                "key_name": "username",
                "key_value": "TEST_USER_USERNAME",
                "updates": [
                    {
                        'key': 'last_name',
                        'value': "TEST_USER_LAST_2"

                    },
                    {
                        'key': 'education',
                        'value': "TEST_EDUCATION"

                    },
                    {
                        'key': 'industry',
                        'value': "TEST_INDUSTRY"

                    },
                    {
                        'key': 'employer',
                        'value': "TEST_EMPLOYER"

                    }
                ]
            }
        )
            .end(function(err, res){
                res.should.have.status(200);
                done();
            })
    });

    it('should return the test account when requesting by username', function(done){
        var username = "TEST_USER_USERNAME";
        chai.request(server)
            .get('/user')
            .query({username:"TEST_USER_USERNAME"})
            .end(function(err, res){
                res.should.have.status(200);
                //res.body[0].should.equal({
                //    username: "TEST_USER_USERNAME",
                //    last_name:"TEST_USER_LAST_2",
                //    education:"TEST_EDUCATION",
                //    employer:"TEST_EMPLOYER",
                //    industry:"TEST_INDUSTRY"
                //});

                res.body[0].username.should.equal("TEST_USER_USERNAME");
                res.body[0].last_name.should.equal("TEST_USER_LAST_2");
                res.body[0].education.should.equal("TEST_EDUCATION");
                res.body[0].industry.should.equal("TEST_INDUSTRY");
                res.body[0].employer.should.equal("TEST_EMPLOYER");

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



