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
                console.log('Message count: ' + JSON.parse(body).count.toString());
                if (res.statusCode === 403) {
                    console.log('Failed to get message count: Invalid auth');
                } else if (res.statusCode === 500) {
                    console.log('Failed to get message count: Scratch is having server issues');
                }
            });
            // Handle Errors
        }).on('error', (e) => {
            console.error('API Error: ' + e);
        });

    }
}
