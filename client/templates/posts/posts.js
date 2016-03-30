Template.posts.helpers({
	'posts': function(){
		return Posts.find({}, {sort: {createdAt: -1}});
	},
});

Template.postData.helpers({
	'formattedDate': function(){
		return moment(this.createdAt).format("MMM D, YYYY");
	}
});