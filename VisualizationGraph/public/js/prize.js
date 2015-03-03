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
		var first_name=$('#first_name');
		var last_name=$('#last_name');
		var sender_email=$('#email');
		var phone_number=$('#phone_number');
		var residence=$('#residence');
		console.log(sender_email);
		if(first_name.length <2 || last_name) {

		}

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
	$('#result').append('<p>Congraduations! You have earned <strong>' + random + '</strong>. <br>' +'Please \
		fill in the below form so that we can deliver the gift to you. Otherwise, you cannot get the gift as expected.</p>');
	var form = '<form role="form" action="/" method="post" id="sendPrizeInfo"> \
					<div class="row" id="name"> \
                        <div class="col-xs-12 col-sm-6 col-md-6"> \
                            <div class="form-group"> \
                                <input type="text" name="first_name" id="first_name" class="form-control" placeholder="First Name"> \
                            </div> \
                        </div> \
                        <div class="col-xs-12 col-sm-6 col-md-6"> \
                            <div class="form-group"> \
                            <input type="text" name="last_name" id="last_name" class="form-control" placeholder="Last Name"> \
                            </div> \
                        </div> \
                    </div> \
                    <div class="form-group"> \
                        <input type="email" name="email" id="email" class="form-control" placeholder="Email Address"> \
                    </div> \
                    <div class="form-group"> \
                        <input type="phone_number" name="phone_number" id="phone_number" class="form-control" placeholder="Phone Number"> \
                    </div> \
                    <div class="form-group"> \
                        <input type="text" name="residence" id="residence" class="form-control" placeholder="Residence"> \
                    </div> \
                   	<div class="row"> \
                    	<div class="col-xs-12 col-md-6"> \
                        	<input type="submit" value="Send" class="btn btn-primary btn-block"> \
                    	</div> \
                    	<div class="col-xs-12 col-md-6"> \
                        	<a href="/" class="btn btn-danger btn-block">Cancel</a> \
                   		</div> \
                	</div> \
				</form>';
	$('#result').append(form);
}