(function () {
    'use strict';
    angular.module('gt-tri').service('lineItemModalSvc', ['$uibModal', lineItemModalSvc]);
    function lineItemModalSvc($uibModal) {
        var modalDefaults = {
            backdrop: 'static', // do not dismiss by clicking outside dialog
            keyboard: false,     // do not allow dismiss with Esc key
            templateUrl: '/sources/modals/lineItemModalView.html'
        };

        var lineItem;
        var type = 'edit';

        this.showModal = function (modalData) {
            if (!modalData) {
                modalData = {
                    name: null,
                    amount: null
                }
                type = 'add'
            }
            return this.show(modalData);
        }

        this.show = function (modalData) {
            lineItem = angular.copy(modalData.lineItem);

            var tempModalDefaults = {};
            angular.extend(tempModalDefaults, modalDefaults);

            if (!tempModalDefaults.controller) {
                tempModalDefaults.controller = myModalCtrl;
            }
            tempModalDefaults.controller.$inject = ['$scope', '$uibModalInstance', 'toaster'];
            return $uibModal.open(tempModalDefaults).result;
        };

        function myModalCtrl($scope, $uibModalInstance, toaster) {
            var vm = $scope.vm || {};
            $scope.vm = vm;

            vm.lineItem = lineItem;
            vm.type = type;

            vm.complete = function () {
                if (vm.lineItem.name == null || vm.lineItem.amount == null) {
                    toaster.pop('error', null, "No fields may be blank");
                } else {
                    $uibModalInstance.close(vm.lineItem);
                }
            }

            vm.cancel = function () {
                $uibModalInstance.close(null);
            }
        }
    }
})();
