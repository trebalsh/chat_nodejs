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
        return this;
    },
    insert: function(data) {
        if (data === null) {
            return false;
        } else {
            this.insertdata = data.join(", ");
        }
        return this;
    },
    update: function(table) {
        this.table = table;
        return this;
    },
    into: function(table) {
        this.table = table;
        return this;
    },
    from: function(table) {
        this.table = table;
        return this;
    },
    updatevalues: function(values) {
        if (typeof values === 'object' || typeof values === 'Array') {
            var tmp = [];
            
            values.forEach(function(value, index) {
                tmp.push(value.field_name+"='"+value.field_value+"'");
            });
            this.updatevalues = tmp.join(", ");
        }
        return this;
    },
    values: function(values) {
        this.insertvalues = data.join(", ");
        return this;
    },
    where: function(condition) {
        this.condition = condition;
        return this;
    },
    cleaner: function() {
        var selectdata = "";
        var insertdata = "";
        var insertvalues = "";
        var updatevalues = "";
        var update
        var table = "";
        var condition = "";
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
            
            var that = this;
            
            query.on('error', function(err) {
                var evt = extend(errorrequest, {request:querytxt, message:err});
                triggerevents(ERROR_REQUEST, evt);
            }).on('result', function(res) {
                console.log(res);
                answer = res;
            }).on('end', function() {
                var evt = extend(successrequest, {result:answer});
                triggerevents(SUCCESS_REQUEST, evt);
                that.cleaner();
            });
        }
    }
};

/* Exported methods */

exports.ERROR_CONNECTION = ERROR_CONNECTION;
exports.ERROR_REQUEST = ERROR_REQUEST;
exports.SUCCESS_REQUEST = SUCCESS_REQUEST;

exports.start = start;
exports.query = function() {
    return new query();
};