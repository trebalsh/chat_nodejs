/*
 * @author jbaudin
 */
define([
	'angular',
    'uiRouter',
    'uiBootstrap',
    'core/core',
    'services/services',
	'controllers/controllers',
    'directives/directives',
	'filters/filters'
], function(angular) {
	'use strict';
    
    return angular.module('app', [
		'ui.router',
		'ui.bootstrap',
        'app.jb',
        'app.services',
		'app.controllers',
        'app.directives',
		'app.filters'
	]);
});