/*
 * @author jbaudin
 */
define(['angular'], function(angular) {
    'use strict';
   
    var config = function($http) {
        return {
            getConfig: function(callback) {
                $http.get('configuration/config.json', {
                    jsoncallback:'JSON_CALLBACK'
                }).then(
                    function(r) {
                        app.constant('config', angular.fromJson(r).data);
                        callback(angular.fromJson(r).data);
                    },
                    function(e) {
                        console.log(e);
                    }
                );
            }
        };
    };
    return angular.module('GeneralConfig', ['$http', config]);
});