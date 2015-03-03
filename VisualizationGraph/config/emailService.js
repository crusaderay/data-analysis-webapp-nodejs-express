var nodemailer = require('nodemailer');

module.exports = {
	sendPrizeEmail: function(first_name, last_name, phone_number, sender_email, residence) {
		var transporter = nodemailer.createTransport();
  //   		service: 'Gmail',
  //   		auth: sails.config.emailAuth
		// });
		transporter.sendMail({
    		from: sender_email,
    		to: 'vivian.zhaocs@gmail.com',
    		subject: 'prize award',
    		text: 'Name: ' + first_name + ', ' + last_name + 'phone_number: ' + phone_number + 
    				'Residence： ' + residence
		}, function(err,response) {
			if(err) {
				console.log(err);
			} else {
				console.log('message sent!')
			}
		});
	}
}




