var express = require('express');
var app = express();
var path = require('path');
//var server = require('http').createServer(app);
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

//configure mongo db
var configDB = require('./config/database.js');
mongoose.connect(configDB.url);

require('./config/passport')(passport);

//view engine set up
app.set('views', path.join(__dirname,'app/views'))

//set up express application
app.use(morgan('dev')); // log each request
app.use(cookieParser()); //read cookies
app.use(bodyParser.json()); //get info
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

//require for passport
app.use(session({
	secret: 'I love being a coder',
  	resave: true,
  	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flashing messages stored in the session


require('./app/routes.js')(app,passport);

app.listen(3000);

