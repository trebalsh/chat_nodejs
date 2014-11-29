/*
 * @author jbaudin
 */
define(['angular'], function(angular) {
    'use strict';
    
    var login = function(Config, HttpNetwork) {
        var socketconnection;
        
        var errors = [];
        var success = [];
        
        var log = function() {
            this.httpconnection = new HttpNetwork();
        };
        
        log.prototype.login = function(username, password, callback) {
            this.httpconnection.restpost('/login', {username:username, password:password}, {}, callback);
        };
        
        log.prototype.register = function(username, email, password) {
            this.httpconnection.restpost('/register', {email_address:email,password:password}, {}, callback);
        };
        return log;
    };
    
    login.$inject = ['Config', 'HttpNetwork'];
    return login;
});