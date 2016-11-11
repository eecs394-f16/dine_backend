//npm depdencies
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var environment = process.env.NODE_ENV || 'dev';
//var passport =require('passport');
//var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');


//config
require('./config/database.js');
app.set('port', port);

//routes
var testRoutes = require('./app/routes/test.js');
var candidateRoutes = require('./app/routes/candidate.js');
var userRoutes = require('./app/routes/user.js');
var loginRoutes = require('./app/routes/login.js');
if(environment !=='test'){
    app.use(morgan('dev')); //log ever request to console
}
app.use(cookieParser());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
extended: true
}));

app.use(express.static(__dirname + '/public'));

//TEMPORARY CAN BE HUGE SECURITY FLAW
// WITH THIS APP IS OPEN TO ANYONE TO CREATE
app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    res.header("Access-Control-Allow-Methods", "GET, POST", "PUT");
    next();
});

//route configuration
app.route('/test')
    .get(testRoutes.testGet);

app.route('/login')
    .get(loginRoutes.login);

app.route('/candidate')
    .get(candidateRoutes.getAllCandidates);

app.route('/user')
    .post(userRoutes.createUser)
    .delete(userRoutes.deleteUser)
    .get(userRoutes.getMe);

app.route('/user/update')
    .post(userRoutes.updateProfile);


//passport
// app.use(session({secret: process.env.SECRET_KEY}));
// app.use(passport.initialize());
// app.use(passport.session());

// var LINKEDIN_API_KEY = process.env.LINKEDIN_API_KEY
// var LINKEDIN_SECRET_KEY = process.env.LINKEDIN_SECRET_KEY


// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
// function ensureAuthenticated(req, res, next) {
//   console.log('here');
//
//
//   if (req.isAuthenticated()) { return next(); }
//   res.status(403).send("user is not authenticated");
// }
//
// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete LinkedIn profile is
//   serialized and deserialized.
// passport.serializeUser(function(user, done) {
//   done(null, user);
// });
//
// passport.deserializeUser(function(obj, done) {
//   done(null, obj);
// });

// Use the LinkedInStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a token, tokenSecret, and LinkedIn profile), and
//   invoke a callback with a user object.
// passport.use(new LinkedInStrategy({
//     clientID:     LINKEDIN_API_KEY,
//     clientSecret: LINKEDIN_SECRET_KEY,
//     callbackURL:  "http://localhost:"+port+"/auth/linkedin/callback",
//     scope:        [ 'r_basicprofile', 'r_emailaddress'],
//     passReqToCallback: true
//   },
//   function(req, accessToken, refreshToken, profile, done) {
//     // asynchronous verification, for effect...
//     req.session.accessToken = accessToken;
//     process.nextTick(function () {
//       // To keep the example simple, the user's Linkedin profile is returned to
//       // represent the logged-in user.  In a typical application, you would want
//       // to associate the Linkedin account with a user record in your database,
//       // and return that user instead.
//       return done(null, profile);
//     });
//   }
// ));



// app.get('/auth/linkedin',
//   passport.authenticate('linkedin'),
//   function(req, res){
//   }
// )
//
// app.get('/auth/linkedin/callback',
//   passport.authenticate('linkedin', {
//     failureRedirect: '/loginFailure'
//   }, function(req, res){
//     res.status(202).json({success: "true"})
//   })
//)

var server = app.listen(app.get('port'), function() {
    console.log("Express server listening on port: " + server.address().port);
});



module.exports = app;
