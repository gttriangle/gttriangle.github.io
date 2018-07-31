angular.module('gt-tri').directive('limitText', ['$compile', function ($compile) {
    return {
        restrict: 'A',
        require: 'ngModel',
        scope: { ngModel: '=', pattern: '=' },
        link: function (scope, element, attrs, ngModelCtrl) {
            ngModelCtrl.$options.$$options.allowInvalid = true;
            ngModelCtrl.$parsers.push(function (newValue) {
                var regex = new RegExp(scope.pattern);
                if (!regex.test(newValue)) {
                    ngModelCtrl.$setViewValue(ngModelCtrl.$$rawModelValue, 'change');
                    ngModelCtrl.$render();
                    scope.ngModel = ngModelCtrl.$$rawModelValue;
                    return ngModelCtrl.$$rawModelValue;
                }
                scope.ngModel = newValue;
                return newValue;
            });
        }
    }
}]);
