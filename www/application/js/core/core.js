/*
 * @author jbaudin
 */
define([
    'angular',
], function(angular) {
    'use strict';
    
    var mod = angular.module('jb');
    
    /*js init*/
    if (!Array.prototype.last){
        Array.prototype.last = function(){
            return this[this.length - 1];
        };
    };
    
    /*helpers*/
    mod.factory('LanguageHelper', require('./core/helpers/language-helper'));
    
    /*configuration*/
    mod.factory('GeneralConfig', require('./core/config/general'));
    mod.factory('LanguageConfig', require('./core/config/lang'));

    mod.service('Config', ['$q', 'GeneralConfig', 'LanguageConfig', 'LanguageHelper',
        function(q, GeneralConfig, LanguageConfig, LanguageHelper) {
            var answer = {};
            
            answer.fetchData = function(q) {
                var gc = new GeneralConfig();
                gc.getConfig(function(r) {
                    answer.config = r;
                });
                
                var lc = new LanguageConfig();
                lc.getLang(function(r) {
                    answer.lang = new LanguageHelper(r);
                });
                q.resolve();
            };
            return answer;
    }]);
    
    /*network*/
    mod.factory('SocketNetwork', require('./core/network/socket'));
    mod.factory('HttpNetwork', require('./core/network/http'));
    
    return mod;
});