define(function(require) {
	'use strict';
	 
	var angular = require('angular');
	var services = require('services/services');
    var jb = require('core/core');
	var controllers = angular.module('app.controllers', ['app.jb', 'app.services']);
    
    controllers.controller('LoginCtrl', require('controllers/modules/login/login'));
    controllers.controller('MenuCtrl', require('controllers/modules/menu/menu'));
    //controllers.controller('RegisterCtrl', 'controllers/modules/login/register');
    
    return controllers;
});