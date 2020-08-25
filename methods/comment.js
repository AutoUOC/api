// Post comments to user profiles
const http = require('http');
const fs = require('fs');

// Fetch authentithication stuff
const userAuth = JSON.parse(fs.readFileSync('../methods/userauth.json'));
const cookieAuth = JSON.parse(fs.readFileSync('../methods/cookies.json'));

// Export method
module.exports = {
    comment(user, body) {

        // Set request content
        let content = {
            'content': body,
            'parent_id': '',
            'commentee_id': ''
        };

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
            'X-CSRFToken': cookieAuth.csrfToken,
            'Cookie': cookieAuth.cookieToken
        };

        // Configure HTTP options
        let options = {
            method: 'POST',
            host: 'scratch.mit.edu',
            path: '/site-api/comments/user/' + user + '/add/',
            headers: head
        };

    }
}