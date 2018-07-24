(function () {
    'use strict';
    angular.module('gt-tri').controller('LoginCtrl', ['$scope', '$state', 'authSvc', 'toaster', LoginCtrl]);

    function LoginCtrl($scope, $state, authSvc, toaster) {
        var vm = $scope.vm || {};
        $scope.vm = vm;
        vm.errors = [];

        vm.login = function() {
            if (!!$scope.loginCreds.email && !!$scope.loginCreds.password) {
                authSvc.loginUser($scope.loginCreds.email, $scope.loginCreds.password).then(function () {
                    toaster.pop('success', null, 'Logged In!');
                    $state.go('Home');
                }, function (error) {
                    vm.errors.push(error);
                    toaster.pop('failure', null, 'Login Unsuccessful!');
                });
            }
        }

        vm.register = function() {
            if (!!$scope.registerCreds.name && !!$scope.registerCreds.email && !!$scope.registerCreds.password) {
                authSvc.createUser($scope.registerCreds.name, $scope.registerCreds.email, $scope.registerCreds.password).then(function () {
                    toaster.pop('success', null, 'User registered!');
                    $state.go('Home')
                }, function (error) {
                    vm.errors.push(error);
                });
            }
        }

        vm.cancel = function(form) {
            if (form === 'login') {
                $scope.loginCreds = {};
            } else if (form === 'register') {
                $scope.registerCreds = {};
            }
        }
    };
})();
