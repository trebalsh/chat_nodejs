//include
var checkers = require('../util/checkers');
var mysql = require('../storages/mysql');
mysql.on(mysql.ERROR_CONNECTION, function(data) {
    console.log(data);
});
mysql.start();

//constant
var ROUTE_LOGIN = '/login';
var ROUTE_REGISTER = '/register';
var ROUTE_LOSTPASSWORD = '/renew-password';

function login(data, success_callback, error_callback) {
    if (typeof data === 'object') {
        if (data.hasOwnProperty('username') && data.hasOwnProperty('password')) {
            var q = mysql.query();
            
            mysql.on(mysql.ERROR_REQUEST, error_callback);
            
            mysql.on(mysql.SUCCESS_REQUEST, function(res) {
                //update user last_activty time
                var now = new Date();
                q.update('user').updatevalues({field_name:'last_activity', field_value:now.toLocaleFormat("%Y-%m-%d %H:%M:%S")}).where("id='"+res.id+"'");
                success_callback(res);
            });
            
            q.select(['id']).from('user').where("username='"+data.username+"' AND password='"+data.password+"'").run();
        }
    }
}

function register(data, success_callback, error_callback) {
    if (typeof data === 'object') {
        if (checkers.test_username(data.username) && checkers.test_email_address(data.email_address) && data.hasOwnProperty(data.password)) {
            //TODO encrypt password + send confirmation email [template email]
            var q = mysql.query();
            
            mysql.on(mysql.ERROR_REQUEST, error_callback);
            mysql.on(mysql.SUCCESS_REQUEST, function(res) {
                if (res.username || res.email_address) {
                    error_callback({code:500, type:'login', message:'Username or email_address already taken'});
                } else {
                    //create user
                    var now = new Date();
                    q.insert(
                        ['email_address', 'username', 'creation_time', 'last_Activity']
                    ).into('user').values(
                        [data.email_address, data.username, now.toLocaleFormat("%Y-%m-%d %H:%M:%S"), now.toLocaleFormat("%Y-%m-%d %H:%M:%S")]
                    ).run();
                    success_callback(res);
                }
            });
            
            //check if email_address or username have not been already registered
            q.select(['email_address', 'username']).from('user').where("email_address='"+data.email_address+"' OR username='"+data.username+"'").run();
        }
    }
}

function renewpassword(data, success_callback, error_callback) {
    if (typeof data === 'object') {
        if (checkers.test_email_address(data.email_address) && checkers.test_username(data.username)) {
            var q = mysql.query();
            
            mysql.on(mysql.ERROR_REQUEST, error_callback);
            mysql.on(mysql.)
        }
    }
}

exports.routes = [
    {
        route:ROUTE_LOGIN,
        handler:login
    },
    {
        route:ROUTE_REGISTER,
        handler:register
    }
];