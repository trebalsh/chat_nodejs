/**
 * @author jbaudin
 */
define([
    'angular', 
    'socketio'
], function(angular, io) {
    var ws = function(config) {
        //TODO configuration Manager#socket
        
        /** configuration */
        var _server = "";
        
        /** logs */
        var error = [];
        var warning = [];
        
        /** socket */
        var socket;
        
        var wsservice = function(server) {
            this._server = server;
        };
        
        wsservice.prototype.connect = function() {
            this.socket = io.connect(this._server);
            
            this.handleerrors();
            this.disconnect();
        };
        
        wsservice.prototype.handleerrors = function() {
            this.socket.on('connect_error', function() {
                this.error.push({connect_error:"Unable to connect to remote server"});
            });
            
            this.socket.on('error', function() {
                this.error.push({error:"Socket.io reported a generic error"});
            });
        };
        
        wsservice.prototype.disconnect = function() {
            this.socket.on('disconnect', function() {
                this.warning.push({disconnect:"Connection has been lost"});
            });
        };
        
        wsservice.prototype.geterrors = function() {
            var r = this.error;
            this.error.pop();
            return r;
        };
        
        wsservice.prototype.getwarning = function() {
            var r = this.warning;
            this.warning.pop();
            return r;
        };
        
        wsservice.prototype.sendtoserver = function(id, data) {
            this.socket.emit(data.route, data.content);
        };
        
        wsservice.prototype.addhandler = function(type, callback) {
            this.socket.on(type, callback);
        };
        
        return wsservice;
    };
    
    ws.$inject = ['config'];
    return ws;
});