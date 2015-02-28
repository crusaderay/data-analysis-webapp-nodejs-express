var LocalStrategy = require('passport-local').Strategy;

var User = require('../app/models/user');

module.exports = function(passport) {
	/*****set up session*****/
	passport.serializeUser(function(user, done) {
  		done(null, user.id);
	});
	passport.deserializeUser(function(id, done) {
  		User.findById(id, function(err, user) {
    		done(err, user);
  		});
  	});

  	/**********LOCAL LOGIN*************/
  	passport.use('local-login', new LocalStrategy({
  		//override default
  		usernameField: 'username',
  		passwordField: 'password',
  		passReqToCallback :true

  		},
  		function(req,username, password, done) {
  			//async
  			process.nextTick(function() {
  				User.findOne({'username':username}, function(err, user) {
  					if(err) {
  						return done(err);
  					}
  					if(!user) {
  						return done(null,false, req.flash('loginMessage','No user found.'));
  					}
  					if(!user.validPassword(password)) {
  						return done(null, false, req.flash('loginMessage','wrong password'));
  					}
  					else {
  						return done(null,user);
  					}
  				});
  			});
  		}
  	));

  	/*****************LOCAL SIGNUP********************/
  	passport.use('local-signup', new LocalStrategy({
  		//override default
  		usernameField : 'username',
  		passwordField : 'password',
  		passReqToCallback : true
  		},
  		function(req, username, password, done) {
  			//async
  			process.nextTick(function() {
  				if(!req.user) {
  					User.findOne({'username':username}, function(err, user) {
  						if(err) {
  							return done(err);
  						}
  						if(user) {
  							return done(null,false, req.flash('signupMessage','Username taken.'));
  						}
  						else {
  							var newUser = new User();
  							newUser.username = username;
  							newUser.password = newUser.generateHash(password);

	  						//save to mongodb
  							newUser.save(function(err){
  								if(err) {
  									return done(err);
  								}
  								return done(null,newUser);
  							});
  						}
  					});
  				} else {
  					return done(null,req.user);
  				}
  				
  			});
  		}
  	));
}