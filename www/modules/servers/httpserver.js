var http = require('http');
var url = require('url');
var fs = require('fs');

var handlerRoutes = [];

function start() {
    function handler(req, res) {
        //add handlers for routes
        var pathname = url.parse(req.url).pathname;
        
        //default : "/"
        switch (pathname) {
            case '/':
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
            default:
                //parse routes
                handlerRoutes.forEach(function(handler, index) {
                    if (handler.route === pathname) {
                        handler.handler(req, res);
                    }
                });
            break;
        }
    }
    http.createServer(handler).listen(8000);
}

function addroutes(routes) {
    if (typeof routes === 'Array' || typeof routes === 'object') {
        routes.forEach(function(route, index) {
            handlerRoutes.push(route);
        });
    }
}

function getapp() {
    return http;
}

exports.start = start;
exports.addroutes = addroutes;
exports.getapp = getapp;