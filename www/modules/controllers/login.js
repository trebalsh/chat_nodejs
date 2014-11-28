var loginservice = require('../services/login.js');

//constant
var ROUTE_LOGIN = '/login';
var ROUTE_REGISTER = '/register';
var ROUTE_LOSTPASSWORD = '/renew-password';

function login(request, response) {
    var body = "";
    console.log(request);
    request.on('data', function(chunk) {
        body += chunck;
    }).on('end', function() {
        /*if (data.username && data.password) {
            loginservice.login(data, function(res) {
                response.write(res);
            }, function(err) {
                response.write(err);
            });
        } else {
            response.write("403 : bim");
        }*/
        response.writeHead(200);
        response.end(body);
    });
}

function register(request, response) {
    if (data.username && data.password && data.email_address) {
        loginservice.register(data, function(res) {
            response.write(res);
        }, function(err) {
            response.write(err);
        });
    } else {
        response.write("403 : bim");
    }
}

exports.routes = function() {
    return [
        {
            route: ROUTE_LOGIN,
            handler: login
        },
        {
            route: ROUTE_REGISTER,
            handler: register
        }
    ];
};