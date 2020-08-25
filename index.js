module.exports = {
    // Posting Comments
    comment: require('./methods/comment.js').comment,
    
    // Forum Activity
    post: require('./methods/post.js').post,
    edit: require('./methods/edit.js').edit
}