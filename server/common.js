Meteor.publish('postsList', function(skipCount){
	var positiveIntegerCheck = Match.Where(function(x){
		check(x, Match.Integer);
		return x >= 0;
	});
	check(skipCount, positiveIntegerCheck);

	return Posts.find({}, {
		limit: parseInt(Meteor.settings.public.recordsPerPage),
		skip: skipCount
	});
});