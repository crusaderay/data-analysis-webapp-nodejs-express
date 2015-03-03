jQuery(function($){
	$('#prize').click(function(){
		fillAllPrizes(function(data){
			var random = getPrizeRandomly(data);
			appendResultForm(random);
			$('#prize').prop('disabled',true);
		});
		
	});
	$('#sendPrizeInfo').submit(function(e) {
		e.preventDefault();
		var first_name=$('#first_name').val();
		var last_name=$('#last_name').val();
		var sender_email=$('#email').val();
		var phone_number=$('#phone_number').val();
		var residence=$('#residence').val();
		if(first_name.length <2 || last_name.length<2) {
			console.log('name should be at least 2 characters');
		}
		if(phone_number.length !== 10) {
			console.log('please enter valid phone number.');
		}
		$.ajax({
			url: '/sendEmail',
			type:'POST',
			data: {'first_name': first_name, 'last_name': last_name, 'sender_email': sender_email, 'phone_number':phone_number, 'residence':residence},
			cache:false,
			success: function(data) {
				console.log('Success: ' + jQuery.parseJSON(data));
			},
			error: function(xhr,status,error) {
				console.log('Fail: ' + error.message);
			},

		});
	});
});

function fillAllPrizes(callback) {
	var prizes=[];
	for(var i=0;i<100;i++) {
		prizes[i] = 'one free academic service';
	}
	for(var i=100;i<200;i++) {
		prizes[i] = 'one free ps modification';
	}
	for(var i=200;i<203;i++) {
		prizes[i] = 'lucky pocket 10 yuan';
	}
	for(var i=203;i<213;i++) {
		prizes[i] = 'lucky pocket 5 yuan';
	}
	for(var i=213;i<228;i++) {
		prizes[i] = 'one wholeren small gift';
	}
	callback(prizes);
}

function getPrizeRandomly(prizes) {
	var random = prizes[Math.floor(Math.random() * prizes.length)];
	return random;
}

function appendResultForm(random) {
	$('#result').removeClass('hidden');
	$('#message').append('<p>Congraduations! You have earned <strong>' + random + '</strong>. <br>' +'Please \
		fill in the below form so that we can deliver the gift to you. Otherwise, you cannot get the gift as expected.</p>');
	
}