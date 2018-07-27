(function () {
    'use strict';
    angular.module('gt-tri').controller('FamilyTreesCtrl', ['$scope', '$state', 'authSvc', '$http', FamilyTreesCtrl]);
    function FamilyTreesCtrl($scope, $state, authSvc, $http) {

        $scope.loadAndTrigger = function() {
            $http.get("/sources/json/familyTree.json").then(function (response) {
                var tree = new Treant(response.data);
            }, function (error) {
                console.log(error);
            })
        };

        $scope.loadAndTrigger();
    }
})();
