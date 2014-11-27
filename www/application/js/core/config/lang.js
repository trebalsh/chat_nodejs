/*
 * @author jbaudin
 */
define(['angular'], function(angular) {
    'use strict';
    
    var lang = function($http, $locale, LanguageHelper) {
        var langid = $locale.id.substring(0, 2);
        return {
            getLang: function(callback) {
                $http.get('configuration/languages/lang_'+langid+'.json', {
                    jsoncallback:'JSON_CALLBACK'
                }).then(
                    function(r) {
                        angular.constant('lang', angular.fromJson(r).data);
                        callback(angular.fromJson(r).data);
                    }, 
                    function(e) {
                        console.log(e);
                    }
                );
            }
        };
    };
    return angular.module('LanguageConfig', ['$http', '$locale', 'LanguageHelper', lang]);
});