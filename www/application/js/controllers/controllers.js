define(function(require) {
	'use strict';
	 
	var angular = require('angular');
	var services = require('services/services');
    var jb = require('core/core');
	var controllers = angular.module('app.controllers', ['app.jb', 'app.services']);

    controllers.controller('LoginCtrl', './controllers/modules/login/login');
    controllers.controller('RegisterCtrl', './controllers/modules/login/register');
    
    return controllers;
});