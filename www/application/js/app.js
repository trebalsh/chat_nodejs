/*
 * @author jbaudin
 */
define([
	'angular',
	'uiRouter',
    './core/core',
    './controllers/controllers',
	'./services/services',
	'./directives/directives',
	'./filters/filters',
], function(angular) {
	'use strict';
    
    return angular.module('app', [
		'ui.router',
		'jb',
        'app.services',
		'app.controllers',
        'app.directives',
		'app.filters'
	]);
});