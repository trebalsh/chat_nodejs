/*
 * @author jbaudin
 */
define(['angular'], function(angular) {
    'use strict';
   
    var config = function($http) {
        return {
            getConfig: function(callback) {
                $http.get('configuration/general.json', {
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
    config.$inject = ['$http'];
    return config;
});