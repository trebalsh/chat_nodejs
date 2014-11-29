/*
 * @author jbaudin
 */
define(['angular'], function(angular) {
    'use strict';
    
    var languageHelper = function($http) {
        var translation = null;
        
        var t = function(langfile) {
            this.translation = langfile;
        };
        
        t.prototype.get = function(label) {
            if (this.translation.hasOwnProperty(label)) {
                return this.translation[label];
            }
        };
        
        t.prototype.setLanguage = function(lang_code) {
            var that = this;
            
            $http.get('configuration/languages/lang_'+lang_code+'.json', {
                jsoncallback:'JSON_CALLBACK'
            }).then(
                function(r) {
                    that.translation = angular.fromJson(r).data;
                },
                function(e) {
                    console.log(e);
                }
            );    
        };
        
        return t;
    };
    languageHelper.$inject = ['$http'];
    return languageHelper;
});