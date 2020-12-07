// Posts a forum post to a topic
const https = require('https');
const fs = require('fs');
const path = require('path');
const fetch = require("node-fetch");

// Fetch authentithication stuff
const cookieAuth = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../auth/cookies.json')));

// Export method
module.exports = {
    async getPostAuthor(topicID, postNum) { 
    const response = await fetch("https://scratch.mit.edu/discuss/topic/" + topicID + "/?page=" + (Math.floor(postNum / 20) + 1));
    if (response.status === 403) {
            return {
                'code': response.status,
                'error-msg': 'Invalid auth',
                'data': 'none'
            };
        } else if (response.status === 500) {
            return {
                'code': response.status,
                'error-msg': 'Server issues',
                'data': 'none'
            };
        } else {
            const pageHTML = async () => {await response.text();}
            console.log(pageHTML.split('<a class="black username" href="/users/')[(postNum % 20)+1].split('/"')[0]);
            return {
                'code': response.status,
                'msg': 'Got author of post number ' + postNum + " from topic " + topicID,
                'data': pageHTML.split('<a class="black username" href="/users/')[(postNum % 20)+1].split('/"')[0]
            };
        }
    }
}
