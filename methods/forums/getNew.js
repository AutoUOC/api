// I decided to make a new file so we can tweak stuff more easily (:

const https = require('https');
const fs = require('fs');
const path = require('path');
const fetch = require("node-fetch");

// Fetch authentithication stuff
const cookieAuth = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../auth/cookies.json')));


module.exports = {
 async getNewPosts(topicID) { 
        // Gets latest 15 posts in a topic
        const response = await fetch("https://scratch.mit.edu/discuss/feeds/topic/" + topicID)
        if (response.status === 403) {
                return {
                    'code': response.status,
                    'error-msg': 'Invalid auth',
                    'data': 'none'
                };
            } else if (res.status === 500) {
                return {
                    'code': response.status,
                    'error-msg': 'Server issues',
                    'data': 'none'
                };
            } else {
                const pageHTML = await response.text();
                var array = pageHTML.split("<entry>");
                array.shift();
                var latestPosts = []
                for (let post in array) {
                latestPosts.push({'time': post.split("<published>")[1].split("</")[0], 'author': post.split("<author><name>")[1].split("</")[0], 'postID': post.split("<id>")[1].split("</")[0], 'contentHTML': post.split('<summary type="html">')[1].split("</")[0]});
                }
                return {
                    'code': response.status,
                    'msg': 'Got latest 15 posts of topic ' + topicID,
                    'data': latestPosts
                };
            }
        }
}
