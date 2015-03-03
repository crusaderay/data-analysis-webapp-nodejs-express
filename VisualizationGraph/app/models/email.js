var mongoose = require('mongoose');

var emailSchema = new mongoose.Schema({
	first_name: String,
	last_name: String,
	email: String,
	phone_number: String,
	residence:String
});


module.exports = mongoose.model('Email', emailSchema);
