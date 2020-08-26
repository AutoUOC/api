// Posts a forum post to a topic
const https = require('https');
const fs = require('fs');
const path = require('path');
const fetch = require("node-fetch");

// Fetch authentithication stuff
const cookieAuth = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../auth/cookies.json')));

// Export method
module.exports = {
    post(topicID, body) {
        // Set request content
        let content = 'csrfmiddlewaretoken=a&body=' + body + '&AddPostForm=';

        // Configure headers
        let head = {
            'Host': 'scratch.mit.edu',
            'Referer': 'https://scratch.mit.edu/discuss/topic/' + topicID,
            'Connection': 'keep-alive',
            'Origin': 'https://scratch.mit.edu',
            'Content-Length': content.length,
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:79.0) Gecko/20100101 Firefox/79.0',
            'X-CSRFToken': 'a',
            'Cookie': cookieAuth.cookie
        };

        // Configure HTTP options
        let options = {
            method: 'POST',
            host: 'scratch.mit.edu',
            path: '/discuss/topic/' + topicID + '/?#reply',
            headers: head
        };

        // Prepare POST data
        var req = https.request(options, (res) => {
            if (res.statusCode === 403) {
                return {
                    'code': res.statusCode,
                    'error-msg': 'Invalid auth',
                    'data': 'none'
                };
            } else if (res.statusCode === 500) {
                return {
                    'code': res.statusCode,
                    'error-msg': 'Server issues',
                    'data': 'none'
                };
            } else {
                return {
                    'code': res.statusCode,
                    'msg': 'Posted to topic ' + topicID,
                    'data': 'none'
                };
            }
        });
        
        // Handle Errors
        req.on('error', (e) => {
            console.error('API Error: ' + e);
        });
        
        // Send content and end request
        req.write(content);
        req.end();
    }
}
