var http = require('http');
var url = require('url');
var fs = require('fs');

function start() {
    function handler(req, res) {
        //add handlers for routes
        var pathname = url.parse(req.url).pathname;
        
        //default : "/"
        switch (pathname) {
            case '/':
            default:
                fs.readFile('application/app.html', function(err, data) {
                    if (err) {
                        console.log(err);
                        res.writeHead(500);
                        return res.end('Error loading application');
                    }
                    res.writeHead(200);
                    res.end(data);
                });
            break;
        }
    }
    
    http.createServer(handler).listen(8000);
}

function getapp() {
    return http;
}

exports.start = start;
exports.getapp = getapp;