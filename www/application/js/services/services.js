define(function(require) {
	'use strict';
    
	var angular = require('angular');
    var services = angular.module('app.services', ['jb']);
    
    //TODO parse json file for modules installation
    
    /* menu */
    services.factory('MenuCtrl', require('services/modules/menu/menu'));
    
    /* account management */
    services.factory('LoginCtrl', require('services/modules/login/login'));
    services.factory('RegisterCtrl', require('services/modules/login/register'));
    
    /* chat module */
    services.factory('PeopleCtrl', require('services/modules/chat/people'));
    services.factory('HistoryCtrl', require('services/modules/chat/history'));
    services.factory('RoomCtrl', require('services/modules/chat/room'));
    
    /* error handler */
    services.factory('NotFoundCtrl', require('services/modules/errors/notfound'));
    
    return services;
});