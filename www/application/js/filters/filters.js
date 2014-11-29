define(function(require) {
	'use strict';
	var angular = require('angular');
	var config = require('core/core');
	var filters = angular.module('app.filters', ['app.jb']);
    
    filters.factory('test', require('filters/modules/test'));
    
    return filters;
});