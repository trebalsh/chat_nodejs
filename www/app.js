/* load http server */
var httpserver = require('./modules/servers/httpserver');
httpserver.start();

/* load socket server */
var socketserver = require('./modules/servers/socketserver');
socketserver.start(httpserver.getapp());

/* load mysql connection */
var mysql = require('./modules/storages/mysql');
mysql.start();

/* load utils modules */
var checkers = require('./modules/utils/checkers');
