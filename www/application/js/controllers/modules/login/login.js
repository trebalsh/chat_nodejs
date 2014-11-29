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
        
        $scope.login = function(email, password) {
            $scope.loginobj.login(email, password, function(data) {
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