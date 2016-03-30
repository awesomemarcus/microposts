Posts = new Mongo.Collection("posts");

Posts.attachSchema(new SimpleSchema({
	body: {
		type: String,
		label: 'Say something:',
		max: 500
	},
	userId: {
		type: String,
		autoValue: function(){
			return Meteor.userId();
		}
	},
	createdAt: {
		type: Date,
		autoValue: function(){
			return new Date()
		}
	}
}));