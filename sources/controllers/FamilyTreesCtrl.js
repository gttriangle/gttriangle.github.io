(function () {
    'use strict';
    angular.module('gt-tri').controller('FamilyTreesCtrl', ['$scope', '$state', 'firebase', '$firebaseObject', 'authSvc', FamilyTreesCtrl]);
    function FamilyTreesCtrl($scope, $state, firebase, $firebaseObject, authSvc) {

        $scope.loadAndTrigger = function() {
            var promise = $firebaseObject(firebase.database().ref().child('FamilyTree')).$loaded();
            promise.then(function(response) {
                var tree = new Treant(response);
            });
        };

        $scope.loadAndTrigger();
    }
})();
