var http = require('http');
var url = require('url');
var path = require('path');
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
        var filename = path.join(process.cwd(), pathname);
        
        var handlerfound = false;
        
        switch (pathname) {
            case '/':
                loadfiles(__dirname+'/../../application/app.html', res);
            break;
            default:
                //parse routes
                handlerRoutes.forEach(function(handler, index) {
                    if (handler.route === pathname) {
                        handlerfound = true;
                        handler.handler(req, res);
                    }
                });   
            break;
        }
        if (handlerfound)
            return;
        console.log(filename);
        fs.exists(filename, function(exists) {
            if (!exists) {
                res.writeHead(404, {"Content-Type": "text/plain"});
                res.write("404 Not Found\n");
                res.end();
                return;
            }
            if (fs.statSync(filename).isDirectory()) filename += '/index.html';
            
            fs.readFile(filename, "binary", function(err, file) {
                if (err) {        
                    res.writeHead(500, {"Content-Type": "text/plain"});
                    res.write(err + "\n");
                    res.end();
                    return;
                }
                res.writeHead(200);
                res.write(file, "binary");
                res.end();
            });
        });
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