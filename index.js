module.exports = {
    // Comment methods
    comments: {
		post: require('./methods/comments/post.js').post,
		reply: require('./methods/comments/reply.js').reply
	},
    
    // Forum methods
    forums: {
		post: require('./methods/forums/post.js').post,
		edit: require('./methods/forums/edit.js').edit,
		follow: require('./methods/forums/followTopic.js').followTopic,
		unfollow: require('./methods/forums/unfollowTopic.js').unfollowTopic,
		getTitle: require('./methods/forums/getTopicTitle.js').getTopicTitle,
		getContent: require('./methods/forums/getPostContent.js').getPostContent,
		getAuthor: require('./methods/forums/getPostAuthor.js').getPostAuthor,
		getNew: require('./methods/forums/getNew.js').getNewPosts,
	},

    // Messages methods
    messages: {
		count: require('./methods/messages/count.js').count
	}
}
