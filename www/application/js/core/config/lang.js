/*
 * @author jbaudin
 */
define(['angular'], function(angular) {
    'use strict';
    
    var lang = function($http, $locale, LanguageHelper) {
        return {
            getLang: function(callback) {
                var langid = $locale.id.substring(0, 2);
        
                $http.get('configuration/languages/lang_'+langid+'.json', {
                    jsoncallback:'JSON_CALLBACK'
                }).then(
                    function(r) {
                        callback(angular.fromJson(r).data);
                    }, 
                    function(e) {
                        console.log(e);
                    }
                );
            }
        };
    };
    lang.$inject = ['$http', '$locale', 'LanguageHelper'];
    return lang;
});