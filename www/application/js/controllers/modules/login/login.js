/**
 * @author jbaudin
 */

define(['angular'], function(angular) {
    'use strict';
    
    var ctrl = function($scope, LoginService) {
        $scope.loginobj = new LoginService();
    
        $scope.login = function(username, email, password) {
            $scope.loginobj.login(username, email, password);
        };
    };
    
    ctrl.$inject = ['$scope', 'LoginService'];
    return ctrl;
});