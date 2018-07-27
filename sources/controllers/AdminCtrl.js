(function () {
    'use strict';
    angular.module('gt-tri').controller('AdminCtrl', ['$scope', 'firebase', '$firebaseObject', 'authSvc', AdminCtrl]);
    function AdminCtrl($scope, firebase, $firebaseObject, authSvc) {
        var vm = $scope.vm || {};
        $scope.vm = vm;

        $firebaseObject(firebase.database().ref().child('Users')).$bindTo($scope, 'allUsers');


    }
})();
