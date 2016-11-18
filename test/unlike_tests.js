// process.env.NODE_ENV = 'test';
//
// var chai = require('chai');
// var chaiHttp = require('chai-http');
// var server = require('../server.js');
// var should = chai.should();
//
// chai.use(chaiHttp);
//
// describe("Unliking functionality", function(){
//     beforeEach(function(done) {
//         chai.request(server)
//             .post('/user')
//             .send(
//             {
//                 "first_name": "TEST_USER_FIRST",
//                 "last_name": "TEST_USER_LAST",
//                 "username": "TEST_USER_USERNAME_UNLIKE_1",
//                 "email": "TEST_UNLIKE@USER.EMAIL_1",
//                 "password": "TESTPASSWORD"
//             }
//         )
//             .end(function (err, res) {
//                 res.should.have.status(200);
//                 checkIfDone();
//             });
//         chai.request(server)
//             .post('/user')
//             .send(
//             {
//                 "first_name": "TEST_USER_FIRST_2",
//                 "last_name": "TEST_USER_LAST_2",
//                 "username": "TEST_USER_USERNAME_UNLIKE_2",
//                 "email": "TEST_UNLIKE@USER.EMAIL_2",
//                 "password": "TESTPASSWORD"
//
//             }
//         )
//             .end(function(err, res){
//                 res.should.have.status(200);
//                 checkIfDone();
//             });
//
//         var state = 0;
//         var checkIfDone = function(){
//             if(state == 0) {
//                 state++
//             }else{
//                 done();
//
//             }
//         };
//     });
//
//     describe("Scenario 1: user 1 likes user 2, unlikes user 2", function(){
//
//        it("should respond with a 0 when user 1 likes user 2", function(done){
//            chai.request(server)
//                .post('/like')
//                .query({person_liking: "TEST_USER_USERNAME_UNLIKE_1", person_being_liked: "TEST_USER_USERNAME_UNLIKE_2"})
//                .end(function(err, res){
//                    res.should.have.status(200);
//                    res.body.result.should.equal("PENDING");
//                    chai.request(server)
//                        .delete('/unlike')
//                        .query({person_unliking: "TEST_USER_USERNAME_UNLIKE_1", person_being_unliked: "TEST_USER_USERNAME_UNLIKE_2" })
//                        .end(function(err, res){
//                            res.should.have.status(200);
//                            res.body.result.should.equal("UNLIKED");
//                            done();
//                        })
//                })
//        });
//     });
//
//     describe("Scenario 2: user likes a nonexistent user", function () {
//
//         it("should respond with a 404", function (done) {
//             chai.request(server)
//                 .delete('/like')
//                 .query({person_liking: "TEST_USER_USERNAME_UNLIKE_1", person_being_liked: "NON_EXISTENT_USER"})
//                 .end(function (err, res) {
//                     res.should.have.status(404);
//                     done();
//                 })
//         });
//     });
//
//     describe("Scenario 3: user unlkining is non existent", function(){
//         it("should respond with a 404", function(done){
//             chai.request(server)
//                 .delete('/unlike')
//                 .query({person_unliking: "NON_EXISTENT_USER", person_being_unliked: "TEST_USER_USERNAME_UNLIKE_1" })
//                 .end(function(err, res){
//                     res.should.have.status(404);
//                     done();
//                 })
//         });
//     });
//
//     describe("Scenario 4: user unlikes themselves", function(){
//
//         it("should respond with a 409", function(done) {
//             chai.request(server)
//                 .delete('/unlike')
//                 .query({person_unliking: "TEST_USER_USERNAME_UNLIKE_1", person_being_unliked: "TEST_USER_USERNAME_UNLIKE_1"})
//                 .end(function (err, res) {
//                     res.should.have.status(409);
//                     done();
//                 })
//         });
//
//     });
//
//     after(function(done){
//         chai.request(server)
//             .delete('/user')
//             .query({username: "TEST_USER_USERNAME_UNLIKE_1"})
//             .end(function(err, res){
//                 res.should.have.status(200);
//                 checkIfDone();
//             });
//         chai.request(server)
//             .delete('/user')
//             .query({username: "TEST_USER_USERNAME_UNLIKE_2"})
//             .end(function(err, res){
//                 res.should.have.status(200);
//                 checkIfDone();
//             });
//         var state = 0;
//         var checkIfDone = function(){
//             if(state == 0) {
//                 state++
//             }else{
//                 done();
//             }
//         }
//     });
// });
//
//
