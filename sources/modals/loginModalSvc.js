(function () {
    'use strict';
    angular.module('gt-tri').service('loginModalSvc', ['authSvc', '$modal', loginModalSvc]);
    function (authSvc, $modal) {
        var modalDefaults = {
            backdrop: 'static',
            keyboard: false,
            size: 'custom-100',
            templateUrl: '/sources/modals/loginModal.html'
        }
        this.show = function (modalData) {
            var tempModalDefaults = {};
            angular.extend(tempModalDefaults, modalDefaults);

            if (!tempModalDefaults.controller) {
                tempModalDefaults.controller = thisCtrl;
            }

            tempModalDefaults.controller.$inject = ['$scope', '$modalInstance'];
            return $modal.open(tempModalDefaults).result;
        }

        function thisCtrl($scope, $modalInstance) {

        }
    }
})();
