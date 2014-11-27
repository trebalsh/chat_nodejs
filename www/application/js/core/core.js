/*
 * @author jbaudin
 */
define([
    'angular',
], function(angular) {
    'use strict';
    
    var mod = angular.module('jb');
    
    /*helpers*/
    mod.factory('LanguageHelper', require('./core/helpers/language-helper'));
    
    /*configuration*/
    mod.factory('GeneralConfig', require('./core/config/general'));
    mod.factory('LanguageConfig', require('./core/config/lang'));

    mod.factory('Config', require('./core/config/config'));
    
    mod.service('config', ['$q', 'GeneralConfig', 'LanguageConfig', 'LanguageHelper',
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
    return mod;
});