/*Session.setDefault("skip",0);*/
/*Deps.autorun(function(){
	Meteor.subscribe("postsList",Session.get("skip"));
});*/

Template.dashboard.helpers({
	'posts': function(){
		currentUser = Meteor.userId();
		return Posts.find({userId: currentUser}, {sort: {createdAt: -1}});
	},
	'prevPage': function(){
		var currentPage = parseInt(Router.current().params,page) || 1;
		var previousPage = currentPage === 1 ? 1 : currentPage - 1;
		return Router.routes.dashboard.path({page: previousPage});
	},
	'nextPage': function(){
		var currentPage = parseInt(Router.current().params,page) || 1;
		var nextPage = currentPage + 1;
		return Router.routes.dashboard.path({page: nextPage});
	}
});

Template.dashboard.onCreated(function(){
	var currentPage = parseInt(Router.current().params.page) || 1;
	var skipCount = (currentPage -1) * Meteor.settings.public.recordsPerPage;

	this.subscribe('postsList', skipCount);
});

/*
Template.paginationNav.events({
	'click .prev': function(event){
		event.preventDefault();
		if(Session.get('skip') >= 5 ){
			Session.set('skip', Session.get('skip')-5);
		}
		console.log(Session.get('skip'));
	},
	'click .next': function(event){
		event.preventDefault();
		Session.set('skip', Session.get('skip')+5);
		console.log(Session.get('skip'));
	}
});
*/

Template.insertForm.events({
	'submit #insertForm': function(event){
		event.preventDefault();
		var postBody = $('[name="postBody"]').val();
		var data = {
			body: postBody
		}
		if(!currentUser){
			throw new Meteor.Error("not-logged-in", "You're not logged in.");
		}
		Posts.insert(data, function(error, result){
			if(error){
				console.log(error.message);
				FlashMessages.sendError(error.message);
			}
		});
		$('[name="postBody"]').val('');
	}
});

Template.userPostData.helpers({
	'formattedDate': function(){
		return moment(this.createdAt).format("MMM D, YYYY");
	}
});