(function () {
    'use strict';
    angular.module('gt-tri').service('transactionModalSvc', ['$uibModal', transactionModalSvc]);
    function transactionModalSvc($uibModal) {
        var modalDefaults = {
            backdrop: 'static', // do not dismiss by clicking outside dialog
            keyboard: true,     // do not allow dismiss with Esc key
            size: 'custom-100',
            templateUrl: '/sources/modals/transactionModalView.html'
        };

        this.showModal = function (modalData) {
            return this.show(modalData);
        };

        this.show = function (modalData) {

            var tempModalDefaults = {};
            angular.extend(tempModalDefaults, modalDefaults);

            if (!tempModalDefaults.controller) {
                tempModalDefaults.controller = myModalCtrl;
            }
            tempModalDefaults.controller.$inject = ['$rootScope', '$scope', '$uibModalInstance'];
            return $uibModal.open(tempModalDefaults).result;
        };

        function myModalCtrl($rootScope, $scope, $uibModalInstance) {

        }
    }
})();
