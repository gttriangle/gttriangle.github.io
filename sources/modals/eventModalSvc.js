(function () {
    'use strict';
    angular.module('gt-tri').service('eventModalSvc', ['$uibModal', eventModalSvc]);
    function eventModalSvc($uibModal) {
        var modalDefaults = {
            backdrop: 'static', // do not dismiss by clicking outside dialog
            keyboard: false,     // do not allow dismiss with Esc key
            size: 'lg',
            templateUrl: '/sources/modals/eventModalView.html'
        };

        var anEvent;
        var type;
        this.showModal = function (modalData) {
            if (!modalData) {
                modalData = {
                    type: "Add",
                    eventInfo: {
                        name: null,
                        date: new Date(),
                        eventType: null,
                        planningTime: null,
                        estAttendance: null,
                        lead: null,
                        moneySpent: null,
                        structure: null,
                        preEventNotes: null,
                        happiness: null,
                        attendance: null,
                        postEventNotes: null
                    }
                }
            } else {
                modalData.type = "Edit";
            }
            return this.show(modalData);
        };

        this.show = function (modalData) {
            type = modalData.type;
            anEvent = angular.copy(modalData.eventInfo);
            anEvent.date = new Date(anEvent.date);
            var tempModalDefaults = {};
            angular.extend(tempModalDefaults, modalDefaults);

            if (!tempModalDefaults.controller) {
                tempModalDefaults.controller = myModalCtrl;
            }
            tempModalDefaults.controller.$inject = ['$rootScope', '$scope', '$uibModalInstance', 'toaster'];
            return $uibModal.open(tempModalDefaults).result;
        };

        function myModalCtrl($rootScope, $scope, $uibModalInstance, toaster) {
            var vm = {};
            $scope.vm = vm;
            vm.anEvent = anEvent;
            vm.type = type;

            vm.checkIfDone = function (date) {
                if (date == null) {
                    return false;
                }

                var now = new Date();
                if (now > date) {
                    return true;
                } else {
                    return false;
                }
            };

            vm.complete = function () {
                if (vm.checkIfDone(vm.anEvent.date) && (vm.anEvent.name == null || vm.anEvent.date == null || vm.anEvent.eventType == null || vm.anEvent.estAttendance == null
                    || vm.anEvent.lead == null || vm.anEvent.moneySpent == null || vm.anEvent.structure == null || vm.anEvent.happiness == null || vm.anEvent.attendance == null)) {
                    toaster.pop('error', null, "Only notes can be blank");
                } else if (!vm.checkIfDone(vm.anEvent.date) && (vm.anEvent.name == null || vm.anEvent.date == null || vm.anEvent.eventType == null || vm.anEvent.estAttendance == null
                    || vm.anEvent.lead == null || vm.anEvent.moneySpent == null || vm.anEvent.structure == null)) {
                    toaster.pop('error', null, "Only notes can be blank");
                } else {
                    vm.anEvent.date = vm.anEvent.date.toLocaleDateString("en-US");
                    $uibModalInstance.close(vm.anEvent);
                }
            }
            vm.cancel = function () {
                $uibModalInstance.close();
            }
        }
    }
})();
