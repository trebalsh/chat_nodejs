var mysql = require('mysql');
var events = require('events');
var extend = require('util')._extend;

var connectionsarray = [];
var connection = null;

//definition mysql custom events
var ERROR_CONNECTION = "errco";
var errorconnection = {
    label: 'Connection error',
    message: '',
    code: 500
};

var ERROR_REQUEST = "errreq";
var errorrequest = {
    label: 'Request error',
    request: '',
    message: '',
    code: 500
};

var SUCCESS_REQUEST = "sucreq";
var successrequest = {
    label: 'Request success',
    result: null,
    code: 200
};

var eventemitter;

function triggerevents(type, event) {
    eventemitter.emit(type, event);
}

/* METHODS */

function start() {
    eventemitter = new events.EventEmitter();
    
    connection = mysql.createConnection({
        host: 'localhost',
        port: '8889',
        user: 'root',
        password: 'root',
        database: 'chat_nodejs'
    });
    
    connection.connect(function(err) {
        var evt = extend(errorconnection, { message : err });
        triggerevents(ERROR_CONNECTION, evt);
    });
}

/* Query system */

var query = function() {
    var selectdata = "";
    var insertdata = "";
    var insertvalues = "";
    var updatevalues = "";
    var update
    var table = "";
    var condition = "";
}
query.prototype = {
    select: function(data) {
        if (data === null) {
            this.selectdata = "*";
        } else {
            this.selectdata = data.join(", ");
        }
    },
    insert: function(data) {
        if (data === null) {
            this.insertdata = "*";
        } else {
            this.insertdata = data.join(", ");
        }
    },
    update: function(table) {
        this.table = table;
    },
    into: function(table) {
        this.table = table;
    },
    from: function(table) {
        this.table = table;
    },
    updatevalues: function(values) {
        if (typeof values === 'object' || typeof values === 'Array') {
            var tmp = [];
            
            values.forEach(function(value, index) {
                tmp.push(value.field_name+"='"+value.field_value+"'");
            });
            this.updatevalues = tmp.join(", ");
        }
    },
    values: function(values) {
       this.insertvalues = data.join(", ");
    },
    where: function(condition) {
        this.condition = condition;
    },
    run: function() {
        if (connection !== null) {
            var querytxt;
            if (this.selectdata !== "") {
                querytxt = "SELECT "+this.selectdata+" FROM "+this.table;
                if (this.condition) {
                    querytxt += " WHERE "+this.condition;
                }
            } else if (this.insertdata !== "") {
                querytxt = "INSERT INTO "+this.table+" ("+this.insertdata+") VALUES ("+this.insertvalues+")";
            } else if (this.updatevalues) {
                querytxt = "UPDATE "+this.table+" SET "+this.updatevalues;
                if (this.condition) {
                    querytxt += " WHERE "+this.condition;
                }
            } else {
                return false;
            }
            
            var query = connection.query(querytxt);
            var answer;
            
            query.on('error', function(err) {
                var evt = extend(errorrequest, {request:querytxt, message:err});
                triggerevents(ERROR_REQUEST, evt);
            }).on('result', function(res) {
                answer = res;
            }).on('end', function() {
                var evt = extend(successrequest, {result:answer});
                triggerevents(SUCCESS_REQUEST, evt);
                this.cleaner();
            });
        }
    },
    cleaner: function() {
        var selectdata = "";
        var insertdata = "";
        var insertvalues = "";
        var updatevalues = "";
        var update
        var table = "";
        var condition = "";
    }
};

/* Exported methods */

exports.ERROR_CONNECTION = ERROR_CONNECTION;
exports.ERROR_REQUEST = ERROR_REQUEST;
exports.SUCCESS_REQUEST = SUCCESS_REQUEST;

exports.start = start;
exports.query = query;