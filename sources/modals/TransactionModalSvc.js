(function () {
    'use strict';
    angular.module('gt-tri').service('TransactionModalSvc', ['$uibModal', TransactionModalSvc]);
    function TransactionModalSvc($uibModal) {
        var modalDefaults = {
            backdrop: 'static', // do not dismiss by clicking outside dialog
            keyboard: true,     // do not allow dismiss with Esc key
            size: 'custom-100',
            templateUrl: '/sources/modals/TransactionModalView.html'
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
