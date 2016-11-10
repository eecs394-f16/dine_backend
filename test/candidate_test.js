process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');
var should = chai.should();

chai.use(chaiHttp);

describe("/GET candidates", function(){
    it('should GET list of people to match with', function(done){
        chai.request(server)
            .get('/candidate')
            .query({userId: 2})
            .end(function(err, res){
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            })
    })
});


