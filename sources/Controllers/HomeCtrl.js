(function () {
    angular.module('gt-tri').controller('HomeCtrl', ['$scope', '$state', HomeCtrl]);

    function HomeCtrl($scope, $state) {
        $scope.message = "I am the home Controller";
    };
})();
