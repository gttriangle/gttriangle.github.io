(function () {
    'use strict';
    angular.module('gt-tri').service('loginModalSvc', ['authSvc', '$uibModal', loginModalSvc]);
    function loginModalSvc(authSvc, $uibModal) {
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

            tempModalDefaults.controller.$inject = ['$scope', '$uibModalInstance'];
            return $uibModal.open(tempModalDefaults).result;
        }

        function thisCtrl($scope, $uibModalInstance) {

        }
    }
})();
