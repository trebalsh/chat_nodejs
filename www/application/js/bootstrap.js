/**
 * @author Jean Baudin
 */
define([
    'angular',
	'app',
    'routes'
], function(angular, app) {
	'use strict';
    
    $html = angular.element(document.getElementsByTagName('html')[0]);
    angular.element().ready(
        function() {
            try {
                angular.bootstrap(document, [app.name]);
            } catch (e) {
                console.log(e.stack || e.message || e);
            }
        }
    );
});
