define(function(require) {
	'use strict';
    
	var angular = require('angular');
    var jb = require('core/core');
    var services = angular.module('app.services', ['app.jb']);
    
    //TODO parse json file for modules installation
    
    /* menu */
    services.factory('MenuCtrl', require('services/modules/menu/menu'));
    
    /* account management */
    services.factory('LoginServices', require('services/modules/login/login'));
    
    /* chat module */
    services.factory('PeopleServices', require('services/modules/chat/people'));
    services.factory('HistoryServices', require('services/modules/chat/history'));
    services.factory('RoomServices', require('services/modules/chat/room'));
    
    /* error handler */
    services.factory('NotFoundServices', require('services/modules/errors/notfound'));
    
    return services;
});