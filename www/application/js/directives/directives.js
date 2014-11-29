define(function(require) {
	'use strict';
	var angular = require('angular');
	var config = require('core/core');
	var directives = angular.module('app.directives', ['app.jb']);

    directives.factory('test', require('filters/modules/test'));
    
    return directives;
});