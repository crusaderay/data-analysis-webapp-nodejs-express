var emailService = require('../config/emailService')

module.exports = function(app, passport){
	/******************* normal routes start ****************/
	app.get('/', function(req,res){
		res.sendFile(__dirname + '/views/welcome.html');
	});

	app.get('/forcegraph', function(req,res){
		res.sendFile(__dirname + '/views/forcegraph.html');
	});

	app.get('/bubble', function(req,res){
		res.sendFile(__dirname + '/views/bubble.html');
	});

	app.get('/piechart', function(req,res){
		res.sendFile(__dirname + '/views/piechart.html');
	});

	app.get('/prize', function(req,res){
		res.sendFile(__dirname + '/views/prize.html');
	});

	app.post('/sendEmail', function(req,res){
		emailService.sendPrizeEmail(req.body.first_name, req.body.last_name, req.body.phone_number,req.body.sender_email, req.body.residence);
	});
	/******************* normal routes end ****************/

	/******************* authenticate routes start ****************/
	//LOGIN PART
	app.get('/login', function(req,res){
		res.sendFile(__dirname + '/views/login.html', {message: req.flash('loginMessage')});
	});

	app.post('/login', passport.authenticate('local-login',{
		successRedirect: '/forcegraph',
		failureRedirect: '/login',
		failureFlash: true
	}));

	//SIGNUP PART
	app.get('/signup',function(req,res){
		res.sendFile(__dirname + '/views/signup.html', {message: req.flash('signupMessage')});
	});

	app.post('/signup', passport.authenticate('local-signup',{
		successRedirect: '/forcegraph',
		failureRedirect: '/signup',
		failureFlash: true
	}));
	/******************* authenticate routes end ****************/
}