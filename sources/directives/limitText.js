angular.module('gt-tri').directive('limitText', ['$compile', function ($compile) {
    return {
        restrict: 'A',
        require: 'ngModel',
        scope: { ngModel: '=', pattern: '=' },
        link: function (scope, element, attrs, ngModelCtrl) {
            ngModelCtrl.$parsers.push(function (newValue) {
                var regex = new RegExp(scope.pattern);
                if (!regex.test(newValue)) {
                    ngModelCtrl.$setViewValue(ngModelCtrl.$modelValue, 'change');
                    ngModelCtrl.$render();
                    return ngModelCtrl.$modelValue;
                }
                return newValue;
            });
        }
    }
}]);
