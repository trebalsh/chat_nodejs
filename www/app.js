/* load http server */
var httpserver = require('./modules/servers/httpserver');
httpserver.start();

/* load socket server */
var socketserver = require('./modules/servers/socketserver');
socketserver.start(httpserver.getapp());

/* load mysql connection */
var mysql = require('./modules/storages/mysql');
mysql.start();

/* load controllers */
var login = require('./modules/controllers/login');


/* set REST routes */
httpserver.addroutes(login.routes());

/* set socket */