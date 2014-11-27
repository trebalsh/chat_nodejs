/**
 * @author jbaudin
 */
define(['app'], function(app) {
	'use strict';
    
    app.config(['$stateProvider', '$urlRouterProvider',
		function($stateProvider, $urlRouteProvider) {
            $stateProvider.state('login', {
		    	url: "/login",
                templateUrl: "templates/login/login.html",
                resolve: {
                    'config':function($q, AppMethods) {
                        var defer = $q.defer();
                        AppMethods.fetchData(defer);
                        return defer.promise;
                    }
                },
		    	controller: 'LoginCtrl'
	    	}).state('tabs', {
                url: "/tabs",
                abstract:true,
                templateUrl: "templates/menu/menu.html",
                controller:"MenuCtrl"
            }).state('tabs.register', {
		    	url: "/register",
                views: {
                    'menuContent': {
                        templateUrl: "templates/login/register.html",
                        controller: 'RegisterCtrl'
                    }
                }
			}).state('tabs.available', {
                url:'/available-people/:id',
                views: {
                    'menuContent': {
                        templateUrl: "templates/chat/people.html",
                        controller: 'PeopleCtrl'
                    }
                }
            }).state('tabs.history', {
                url:'/history/:id',
                views: {
                    'menuContent': {
                        templateUrl: "templates/chat/history.html",
                        controller: 'HistoryCtrl'
                    }
                }
            }).state('tabs.chatroom', {
                url:'/chatroom/:id',
                views: {
                    'menuContent': {
                        templateUrl: "templates/chat/room.html",
                        controller: 'RoomCtrl'
                    }
                }
            }).state('tabs.notfound', {
                url:'/404',
                views: {
                    'menuContent': {
                        templateUrl: "templates/errors/notfound.html",
                        controller: 'NotFoundCtrl'
                    }
                }
            });
		    $urlRouteProvider.otherwise('/login');
		}
	]);
});