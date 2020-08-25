// Posts a forum post to a topic
const https = require('https');
const fs = require('fs');
const path = require('path');

// Fetch authentithication stuff
const cookieAuth = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../auth/cookies.json')));

// Export method
module.exports = {
    comment(topic, body) {
        // Set request content
        let content = 'csrfmiddlewaretoken=' + cookieAuth.forums.csrfToken + '&body=' + body + '&AddPostForm=';

        // Configure headers
        let head = {
            'Referer': 'https://scratch.mit.edu/discuss/topic/' + topic,
            'Connection': 'keep-alive',
            'Origin': 'https://scratch.mit.edu',
            'Content-Length': content.length,
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'multipart/form-data; boundary=---------------------------53803459825946508421916781648',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept': 'ttext/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:79.0) Gecko/20100101 Firefox/79.0',
            'Cookie': cookieAuth.cookie,
            'Upgrade-Insecure-Requests': '1'
        };

        // Configure HTTP options
        let options = {
            method: 'POST',
            host: 'scratch.mit.edu',
            path: '/discuss/topic/' + user + '/?#reply',
            headers: head
        };

        // Send HTTPS request
        var req = https.request(options, (res) => {
            res.on('data', (d) => {
                process.stdout.write(d);
            });
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