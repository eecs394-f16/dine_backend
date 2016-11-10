process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');
var should = chai.should();
var expect = chai.expect;

chai.use(chaiHttp);

describe("/GET login", function(){
    it('should return a 403 error when passing wrong user data', function(done){
        chai.request(server)
            .get('/login')
            .query({password: 'asdf', email: "asdfasfdsad"})
            .end(function(err, res){
                res.should.have.status(403);
                done();
            })
    });

    it('should return a 403 error when passing wrong email and correct password', function(done){
        chai.request(server)
            .get('/login')
            .query({password: 'password', email: "nick@stevdddenson.com"})
            .end(function(err, res){
                res.should.have.status(403);
                done();
            })
    });

    it('should return a 403 error when passing wrong password and correct email', function(done){
    chai.request(server)
        .get('/login')
        .query({password: 'passwoddrd', email: "nick@stevenson.com"})
        .end(function(err, res){
            res.should.have.status(403);
            done();
        })
    });

    it('should return a 200 when passing the right stuff', function(done){
        chai.request(server)
            .get('/login')
            .query({password: 'password', email: "nick@stevenson.com"})
            .end(function(err, res){
                res.should.have.status(200);
                expect( res.body[0].id).to.be.above(-1);
                done();
            })
    });
});
