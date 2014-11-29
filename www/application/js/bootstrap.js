/**
 * @author Jean Baudin
 */
define([
    'angular',
	'app',
    'routes'
], function(angular, app) {
	'use strict';
    
    var start  = function() {
        var $html;
        
        if (typeof cordova === 'undefined') {
            $html = angular.element(document.getElementsByTagName('html')[0]);
            angular.element().ready(function() {
                try {
                    angular.bootstrap(document, [app.name]);
                } catch (e) {
                    console.log(e.stack || e.message || e);
                }
            });
        } else {
            document.addEventListener('deviceready', function() {
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                }
                if (window.StatusBar) {
                    StatusBar.styleDefault();
                }
                angular.bootstrap(document, [app.name]);
            });
        }
    };
    (document.body && typeof device === 'undefined') ? start() : ionic.Platform.ready(start);
});
