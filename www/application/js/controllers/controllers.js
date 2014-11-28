define(function(require) {
	'use strict';
	 
	var angular = require('angular');
	var services = require('services/services');
	var config = require('config');
	var controllers = angular.module('app.controllers', ['jb', 'app.services']);

    controllers.controller('LoginCtrl', './controllers/modules/login/login');
    controllers.controller('RegisterCtrl', './controllers/modules/login/register');
    
    return controllers;
});