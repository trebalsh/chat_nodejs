var io = require('socket.io');

var sockets = [];

var handleEvents = [];

function start(app) {
    if (app !== null) {
        io.listen(app);
    }
}

function addHandler(eventname, callback) {
    handleEvents.push({eventname:eventname, callback:callback});
}

function connect() {
    io.sockets.on('connection', function(socket) {
        
        socket.on('disconnect', function() {
            var socketindex = connectionsarray.indexOf(socket);
            if (socketindex >= 0)
                connectionsarray.splice(socketindex, 1);
        });
        
        handleEvents.forEach(function(handler, index) {
            socket.on(handler.eventname, callback);
        });
        
        connectionsarray.push(socket);
    });
}

exports.start = start;
exports.addHandler =  addHandler;
exports.connect = connect;