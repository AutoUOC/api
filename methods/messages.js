// Post comments to user profiles
const https = require('https');
const fs = require('fs');
const path = require('path');

// Fetch authentithication stuff
const cookieAuth = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../auth/cookies.json')));

// Export method
module.exports = {
    count(user) {
        // Send HTTPS request
        https.get('https://api.scratch.mit.edu/users/' + user + '/messages/count/', (res) => {
            let body = '';

            res.on("data", (chunk) => {
                body += chunk;
            });

            res.on("end", () => {
                if (res.statusCode === 403) {
                    return {
                        'code': res.statusCode,
                        'msg': 'Invalid auth',
                        'data': 'none'
                    };
                } else if (res.statusCode === 500) {
                    return {
                        'code': res.statusCode,
                        'msg': 'Server issues',
                        'data': 'none'
                    };
                } else {
                    return {
                        'code': res.statusCode,
                        'msg': 'Got msg count',
                        'data': JSON.parse(body).count
                    };
                }
            });
            // Handle Errors
        }).on('error', (e) => {
            console.error('API Error: ' + e);
        });

    }
}
