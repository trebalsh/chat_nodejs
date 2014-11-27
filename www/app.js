/* load required component for node and socket.io */
var app = require('http').createServer(handler);
var io  = require('socket.io').listen(app);
var fs  = require('fs');

/* load components for MySql (da da da) */
var mysql               = require('mysql');
var connectionsarray    = [];
var connection          = mysql.createConnection({
    host: 'localhost',
    port: '8889',
    user: 'root',
    password: 'root',
    database: 'chat_nodejs'
});

connection.connect(function(err) {
    console.log(err);
});

/* launch server on localhost:8000 */
app.listen(8000);

/* load Require + Angular application */
function handler(req, res) {
    fs.readFile(__dirname+'/application/app.html', function(err, data) {
        if (err) {
            console.log(err);
            res.writeHead(500);
            return res.end('Error loading application');
        }
        res.writeHead(200);
        res.end(data);
    });
}


/* checkers */
var test_email_address = function (email) {
    return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(email);
};

var test_username = function(username) {
    return /^([a-zA-Z0-9_\.\-])+$/.test(username);
};

var test_id = function(id) {
    return /^([0-9])+$/.test(id);
};

/* custom session mod */
var sessions = [];

/* register user method */
var saveuser = function(socket, data) {
    if (data !== null && data.hasOwnProperty('username') && data.hasOwnProperty('email_address')) {
        if (test_email_address(data.email_address) === true && test_username(data.username) === true) {
            //check if username already exists or not
            var query   = connection.query("SELECT id FROM user WHERE username='"+data.username+"' OR email_address='"+data.email_address+"'");
            var answer  = ""; 
            query.on('error', function(err) {
                errorsockets(socket, err);
            }).on('result', function(res) {
                if (res.id) {
                    errorsockets("Username or email_address already taken !");
                } else {
                    //init dates
                    var now = new Date();
                    //add new user in database
                    var query_insert = connection.query(
                        "INSERT INTO user (username, email_address, creation_time, last_activity) VALUES ("+
                        "'"+data.username+"'"+
                        ","+data.email_address+"'"+
                        ","+now.toLocaleFormat("%Y-%m-%d %H:%M:%S")+"',"+
                        ","+now.toLocaleFormat("%Y-%m-%d %H:%M:%S")+"',"+
                        ")"
                    );
                    query_insert.on('error', function(err) {
                        errorsockets(socket, err);
                    }).on('result', function(res) {
                        answer = "New has been successfully added!";
                    }).on('end', function() {
                        //confirm inscription
                        updatesockets(socket, answer);
                    });
                }
            }).end('end', function() {
                console.log("registeruser: end of process");
            });
        }
    }
};

/* login user method */
var loginuser = function(socket, data) {
    if (data !== null && data.hasOwnProperty('username') && data.hasOwnProperty('email_address')) {
        if (test_email_address(data.email_address) === true && test_username(data.username) === true) {
            //check if username already exists or not
            var query   = connection.query("SELECT id FROM user WHERE username='"+data.username+"' OR email_address='"+data.email_address+"'");
            var answer  = "";
            
            query.on('error', function(err) {
                errorsockets(socket, err);
            }).on('result', function(res) {
                if (res.id) {
                    answer = "You are connected !";
                    //start session
                    sessions.push({id:res.id, socket:socket});
                    //update silently the last_activity
                    var now = new Date();
                    var query_update = connection.query("UPDATE user SET last_activity='"+now.toLocaleFormat("%Y-%m-%d %H:%M:%S")+"'");
                    query_update.on('error', function(err) {
                        console.log(err);
                    }).on('result', function(res) {
                        console.log(res);
                    }).on('end', function() {
                        console.log("loginuser: end of process.");
                    });
                } else {
                    answer = "Please register !";
                }
            }).on('end', function(res) {
                updatesockets(socket, answer);
            });
        }
    }
};

/* history management */
var historylist = function(socket, id) {
    var query   = connection.query("SELECT id, creation_time FROM user_chat WHERE owner_id='"+id+"'");
    var answer  = {};
    
    query.on('error', function(err) {
        errorsockets(socket, err);
    }).on('result', function(res) {
        answer = res;
    }).on('end', function() {
        updatesocket(socket, answer);
    });
};

/* load old chat choose from the history list */
var loadchat = function(socket, data) {
    if (data.hasOwnProperty('id') && data.id > 0) {
        var query = connection.query(
            "SELECT uc.chat_file, u.username FROM user_chat as uc JOIN user as u, chat_partners as cp WHERE as.id='"+
            data.id+
            "' AND cp.chat_id = as.id AND u.id = cp.recipient_id"
        );
        var answer = {};
        
        query.on('error', function(err) {
            errorsockets(socket, err);
        }).on('result', function(res) {
            answer = res;
        }).on('end', function() {
            updatesocket(socket, answer);
        });
    }
};

/* create new chat */
var createchat = function(socket, data) {
    
};

/* init sockets */
io.sockets.on('connection', function(socket) {
    socket.on('createuser', function(data) {
        saveuser(socket, data);
    });
    
    socket.on('loginuser', function(data) {
        loginuser(socket, data);
    });
    
    socket.on('gethistory', function(data) {
        sessions.forEach(function(session) {
            if (session.socket == socket) {
                if (data.hasOwnProperty('id')) {
                    loadchat(socket, data);
                } else {
                    historylist(socket, session.id);
                }
                return;
            }   
        });
    });
    
    /*observe disconnections*/
    socket.on('disconnect', function() {
        var socketindex = connectionsarray.indexOf(index);
        if (socketindex >= 0)
            connectionsarray.splice(socketindex, 1);
    });
    console.log(socket);
    connectionsarray.push(socket);
});

var errorsockets = function(socket, data) {
    console.log(data);
    socket.emit('error', data);
};

var updatesockets = function(socketid, data) {
    date.time = new Date();
    socket.emit('success', data);
};