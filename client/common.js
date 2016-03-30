// check the current active link
Template.registerHelper("active", function(routeName){
	var currentRoute = Router.current().route;
	return currentRoute.getName() === routeName ? 'active' : '';
});

Template.navbar.events({
	'click .sign-out': function(event){
		event.preventDefault();

		Meteor.logout();
		Router.go('/');
	}
});