var http = require('http');
var url = require('url');
var fs = require('fs');

var handlerRoutes = [];

function loadfiles(path, res) {
    fs.readFile(path, function(err, data) {
        if (err) {
            console.log(err);
            res.writeHead(500);
            return res.end('Error loading application');
        }
        console.log(data);
        res.writeHead(200);
        res.end(data);
    });
}

function start() {
    function handler(req, res) {
        //add handlers for routes
        var pathname = url.parse(req.url).pathname;
        
        //default : "/"
        switch (pathname) {
            case '/':
                loadfiles(__dirname+'/../../application/app.html', res);
            break;
            default:
                //check for js and css files
                if (pathname.substring(pathname.length - 2, pathname.length) === 'js') {
                    console.log("js");
                    loadfiles(__dirname+'/../..'+pathname, res);
                } else if (pathname.substring(pathname.length - 3, pathname.length) === 'css') {
                    console.log("css");
                } else if (handlerRoutes.length) {
                    //parse routes
                    var handlerfound = false;
                    handlerRoutes.forEach(function(handler, index) {
                        if (handler.route === pathname) {
                            handlerfound = true;
                            handler.handler(req, res);
                        }
                    });
                    if (handlerfound === false) {
                        res.writeHead(404);
                        res.end("NOTHING TO SEE");
                    }
                } else {
                    res.writeHead(404);
                    res.end("NOTHING TO SEE");
                }   
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