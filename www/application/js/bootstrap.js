/**
 * @author Jean Baudin
 */
define([
    'angular',
	'app',
    'routes'
], function(angular, app) {
	'use strict';
    
    document.addEventListener('deviceready', function() {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
        angular.bootstrap(document, [app.name]);
    });
});
