Router.configure({
	layoutTemplate: 'layout'
});


Router.map(function(){
	// Posts Route
	this.route('posts',{
		path: '/',
		template: 'posts',
		layoutTemplate: 'layout'
	});

	this.route('dashboard', {
		path: '/dashboard/:page?',
		onBeforeAction: function(){
			var currentUser = Meteor.userId();

			if(currentUser){
				this.next();
			} else{
				Router.go('sign-in');
			}
		}
	});

	this.route('sign-in',{
		path: '/sign-in',
		template: 'login',
		layoutTemplate: 'formLayout'
	});

	this.route('register',{
		path: '/register',
		template: 'register',
		layoutTemplate: 'formLayout'
	});
	
});

