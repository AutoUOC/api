module.exports = {
    post: require('./post.js'),
    edit: require('./edit.js'),
    follow: require('./followTopic.js'),
    unfollow: require('./unfollowTopic.js'),
    new: require('./getNew.js'),
    author: require('./getPostAuthor.js'),
    content: require('./getPostContent.js'),
    title: require('./getTopicTitle.js')
}