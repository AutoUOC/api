// Posts a forum post to a topic
const https = require('https');
const fs = require('fs');
const path = require('path');
const fetch = require("node-fetch");

// Fetch authentithication stuff
const cookieAuth = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../auth/cookies.json')));

// Export method
module.exports = {
    async getTopicTitle(topicID) { 
		const response = await fetch("https://scratch.mit.edu/discuss/topic/" + topicID)
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
            return {
                'code': response.status,
                'msg': 'Got title of topic ' + topicID,
                'data': pageHTML.split('<title>')[1].split('</title>')[0]
            };
        }
    }
}
