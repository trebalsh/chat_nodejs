/**
 * @author jbaudin
 */

define(['angular'], function(angular) {
    'use strict';
    
    var ctrl = function($scope, $state, LoginServices) {
        $scope.loginobj = new LoginServices();
    
        $scope.username = "";
        $scope.email = "";
        $scope.password = "";
        
        $scope.login = function(username, password) {
            $scope.loginobj.login(username, password, function(data) {
                if (data.id) {
                    console.log('connected');
                }
            });
        };
        
        $scope.renewpassword = function() {
            
        };
    };
    
    ctrl.$inject = ['$scope', '$state', 'LoginServices'];
    return ctrl;
});