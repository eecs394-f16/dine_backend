process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');
var should = chai.should();

chai.use(chaiHttp);

describe("/GET test", function(){
  it('should GET list of names and states', function(done){
    chai.request(server)
    .get('/test')
    .end(function(res, err){
      res.should.have.status(200);
      res.body.should.be.a('array');
      done();
    })
  })
})
