// Post comments to user profiles
const https = require('https');
const fs = require('fs');
const path = require('path');

// Fetch authentithication stuff
const cookieAuth = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../auth/cookies.json')));

// Export method
module.exports = {
    post(user, body) {
        // Set request content
        let content = JSON.stringify({
            'content': body,
            'parent_id': '',
            'commentee_id': ''
        });

        // Configure headers
        let head = {
            'Referer': 'https://scratch.mit.edu/users/' + user,
            'Connection': 'keep-alive',
            'Origin': 'https://scratch.mit.edu',
            'Content-Length': content.length,
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept': 'text/html, */*; q=0.01',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:79.0) Gecko/20100101 Firefox/79.0',
            'X-CSRFToken': 'a',
            'Cookie': cookieAuth.cookie
        };

        // Configure HTTP options
        let options = {
            method: 'POST',
            host: 'scratch.mit.edu',
            path: '/site-api/comments/user/' + user + '/add/',
            headers: head
        };

        // Send HTTPS request
        var req = https.request(options, (res) => {
            if (res.statusCode === 302 || res.statusCode === 200) {
                console.log('Comment has been posted to ' + user);
            } else if (res.statusCode === 403) {
                console.log('Failed to post comment: Invalid auth');
            } else if (res.statusCode === 500) {
                console.log('Failed to post comment: Scratch is having server issues');
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