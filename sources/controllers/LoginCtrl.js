(function () {
    'use strict';
    angular.module('gt-tri').controller('LoginCtrl', ['$scope', '$state', 'authSvc', 'toaster', LoginCtrl]);

    function LoginCtrl($scope, $state, authSvc, toaster) {
        var vm = $scope.vm || {};
        $scope.vm = vm;
        vm.errors = [];
        $scope.type = 'login';
        $scope.email = null;
        $scope.password = null;
        $scope.name = null;

        vm.login = function() {
            authSvc.loginUser($scope.email, $scope.password).then(function () {
                toaster.pop('success', null, 'Logged In!');
                $state.go('Home');
            }, function (error) {
                vm.errors.push(error);
                toaster.pop('failure', null, 'Login Unsuccessful!');
            });
        }

        vm.register = function() {
            if (!!$scope.name && !!$scope.email && !!$scope.password) {
                authSvc.createUser($scope.name, $scope.email, $scope.password).then(function () {
                    toaster.pop('success', null, 'User registered!');
                    $state.go('Home')
                }, function (error) {
                    vm.errors.push(error);
                });
            }
        }

        vm.cancel = function() {
            $scope.email = null;
            $scope.name = null;
            $scope.password = null;
        }
    };
})();
