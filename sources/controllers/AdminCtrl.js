(function () {
    'use strict';
    angular.module('gt-tri').controller('AdminCtrl', ['$scope', '$state', 'firebase', '$firebaseObject', 'authSvc', AdminCtrl]);
    function AdminCtrl($scope, $state, firebase, $firebaseObject, authSvc) {
        var vm = $scope.vm || {};
        $scope.vm = vm;

        if (authSvc.permission() !== 'admin') {
            $state.go("Home");
        }

        $firebaseObject(firebase.database().ref().child('Users')).$bindTo($scope, 'allUsers')
        vm.permissionList = ['unregistered', 'alumni', 'candidate', 'brother', 'chair', 'officer', 'financial officer', 'admin'];

    }
})();
