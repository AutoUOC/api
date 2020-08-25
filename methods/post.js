const https = require('https');
const fs = require('fs');
const path = require('path');

// Fetch authentithication stuff
const cookieAuth = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../auth/cookies.json')));

// Export method
module.exports = {
    post(topicId, body) {
        // Set request content
        let content = 'csrfmiddlewaretoken=' + cookieAuth.forums.csrfToken + '&body=' + body + '&AddPostForm=';

        // Configure headers
        let head = {
            'Referer': 'https://scratch.mit.edu/discuss/topic/' + topicId + '/?#reply',
            'Connection': 'keep-alive',
            'Origin': 'https://scratch.mit.edu',
            'Content-Length': content.length,
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'multipart/form-data',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept': 'text/html, */*; q=0.01',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:79.0) Gecko/20100101 Firefox/79.0',
            'X-CSRFToken': cookieAuth.comments.csrfToken,
            'Cookie': cookieAuth.comments.cookieToken
        };

        // Configure HTTP options
        let options = {
            method: 'POST',
            host: 'scratch.mit.edu',
            path: '/discuss/topic/' + topicId + '/?#reply',
            headers: head
        };

        var req = https.request(options, (res) => {
            console.log(options.headers);
            res.on('data', (d) => {
                process.stdout.write(d);
            });
        });
          
        req.on('error', (e) => {
            console.error(e);
        });
          
        req.write(content);
        req.end();
    }
}
