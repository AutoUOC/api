// Post comments to user profiles
const https = require('https');
const fs = require('fs');
const path = require('path');

// Export method
module.exports = {
    vote(botid) {
        // Set request content
        let content = '';

        // Configure headers
        let head = {
            'Referer': 'https://bots.discordlabs.org/bot/' + botid,
            'Connection': 'keep-alive',
            'Origin': 'https://bots.discordlabs.org',
            'Content-Length': '0',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:80.0) Gecko/20100101 Firefox/80.0',
            'DNT': '1',
            'Upgrade-Insecure-Requests': '1',
            'Cookie': 'removed cuz idk if it can be used against me'
        };

        // Configure HTTP options
        let options = {
            method: 'POST',
            host: 'bots.discordlabs.org',
            path: '/bot/' + botid + '/vote',
            headers: head
        };

        // Send HTTPS request
        var req = https.request(options, (res) => {
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
                    'msg': 'Voted',
                    'data': 'none'
                };
            }
        });
        
        // Handle Errors
        req.on('error', (e) => {
            console.error('Error: ' + e);
        });
        
        // Send content and end request
        req.write(content);
        req.end();
    }
}
