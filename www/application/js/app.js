/*
 * @author jbaudin
 */
define([
	'angular',
	'uiRouter',
    'uiBootstrap',
    './core/core',
    './controllers/controllers',
	'./services/services',
	'./directives/directives',
	'./filters/filters',
], function(angular) {
	'use strict';
    
    return angular.module('app', [
		'ui.router',
        'ui.bootsrap',
		'app.jb',
        'app.services',
		'app.controllers',
        'app.directives',
		'app.filters'
	]);
});