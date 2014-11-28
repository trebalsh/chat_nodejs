/*
 * @author jbaudin
 */
define(['angular'], function(angular) {
    'use strict';
    
    var login = function(Config, SocketNetwork) {
        var socketconnection;
        
        var errors = [];
        var success = [];
        
        var log = function() {
            this.httpconnection = new SocketNetwork(Config.general.protocol+'://'+Config.general.addr+':'+Config.general.port);
            this.socketconnection.connect();
        };
        
        log.prototype.sethandlers = function() {
            /*login*/
            this.socketconnection.addhandler('login-error', function(data) {
                this.errors.push({loginerror:data});
            });
            
            this.socketconnection.addhandler('login-success', function(data) {
                this.success.push({loginsucess:data});
            });
            
            /*register*/
            this.socketconnection.addhandler('register-error', function(data) {
                this.errors.push({registererror:data});
            });
            this.socketconnection.addhandler('register-success', function(data) {
                this.success.push({registersuccess:data});
            });
        };
        
        log.prototype.login = function(username, email, password) {
            this.socketconnection.sendtoserver('login', {email_address:email, username:username, password:password});
        };
        
        log.prototype.getlasterrors = function() {
            var r = this.errors;
            this.errors.pop();
            
            return {
                'socket':this.socketconnection.getlasterrors(),
                'login':r
            };
        };
        
        log.prototype.getlastsuccess = function() {
            return this.success;
        };
        
        log.prototype.register = function(username, email, password) {
            this.socketconnection.sendtoserver('login', {email_address:email, username:username, password:password});
        };
    };
    
    login.$inject = ['Config', 'SocketNetwork'];
});