process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');
var should = chai.should();

chai.use(chaiHttp);

describe("/GET candidates", function(){
    it('should GET list of unique people to match with', function(done){
        chai.request(server)
            .get('/candidate')
            .query({userId: 2})
            .end(function(err, res){
                res.should.have.status(200);
                res.body.should.be.a('array');
                var occurances = [];
                for(var i = 0; i < res.body.length; i ++){
                    for(var j = 0; j < occurances.length; j ++){
                        res.body[i].should.not.equal(occurances[j])
                    }
                    occurances.push(res.body[i]);
                }
                done();
            })
    });

});


