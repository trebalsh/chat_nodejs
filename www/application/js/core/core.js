/*
 * @author jbaudin
 */
define(function(require) {
    'use strict';
    
    var angular = require('angular');
    var mod = angular.module('app.jb', []);
    
    /*js init*/
    if (!Array.prototype.last){
        Array.prototype.last = function(){
            return this[this.length - 1];
        };
    };
    
    /*helpers*/
    mod.factory('LanguageHelper', require('core/helpers/language-helper'));
    
    /*configuration*/
    mod.factory('GeneralConfig', require('core/config/general'));
    mod.factory('LanguageConfig', require('core/config/lang'));

    var config = function($q, GeneralConfig, LanguageConfig, LanguageHelper) {
        var answer = {};
        
        answer.fetchData = function(q) {
            var gc = GeneralConfig;
            gc.getConfig(function(r) {
                answer.general = r;
            });
            
            var lc = LanguageConfig;
            lc.getLang(function(r) {
                answer.lang = new LanguageHelper(r);
            });
            q.resolve();
        };
        return answer;
    }
    
    mod.factory('Config', function($q, GeneralConfig, LanguageConfig, LanguageHelper) {
        var defer = $q.defer();
        config($q, GeneralConfig, LanguageConfig, LanguageHelper).fetchData(defer);
        return defer.promise;
    });
    
    /*network*/
    mod.factory('SocketNetwork', require('core/network/socket'));
    mod.factory('HttpNetwork', require('core/network/http'));
    
    return mod;
});