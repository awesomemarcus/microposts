Template.login.events({
	'submit .form-signin': function(event){
		event.preventDefault();
		var email = event.target.email.value;
		var password = event.target.password.value;

		Meteor.LoginWithPassword(email, password, function(err){
			if(err){
				event.target.email.value = email;
				event.target.password.value = '';
				FlashMessages.sendError(err.reason);
			} else{
				FlashMessages.sendSuccess('You are now logged in');
				Router.go('dashboard');
			}
		});
	}
});