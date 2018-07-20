angular.module('gt-tri').directive('siteHeader', function () {
        return {
            restrict: "E",
            controller: ['$scope', '$state', 'authSvc', function($scope, $state, authSvc) {
                $scope.loggedInUser = authSvc.loggedInUser;
                $scope.permission = $scope.loggedInUser.permission;
                $scope.loggedIn = authSvc.loggedIn;
                $scope.login = function () {
                    loginModalSvc.showModal({type: 'login'});
                }
                $scope.logout = function () {
                    authSvc.logoutUser();
                }

                $scope.goToHome = function () {

                };

                $scope.goToCalendar = function () {

                };

                $scope.goToEventDiagnostics = function () {

                };

                $scope.goToEventPolicies = function () {

                };

                $scope.goToEventPractices = function () {

                };

                $scope.goToMyAccount = function () {

                };

                $scope.goToBudget  = function () {

                };

                $scope.goToTransactions = function () {

                };

                $scope.goToFinancialStatus = function () {

                };

                $scope.goToFamilyTrees = function () {

                };
            }],
            template: `<nav class="navbar navbar-expand-sm bg-dark navbar-dark">
            <div class="col-md-11 container">
                <a class="navbar-brand" ng-click="goToHome()">
                    <img src="/sources/images/logo.png" class="rounded navbar-logo"
                        height="37">
                        Triangle @ GT
                </a>
                <div class="collapse navbar-collapse" id="mainNavbar">
                    <ul class="nav navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link" ng-click="goToHome()">
                                Home
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" ng-click="goToCalendar()">
                                Calendar
                            </a>
                        </li>
                        <li class="nav-item" ng-show="permission === 'chair' || permission === 'officer' || permission === 'financial officer' || permission === 'admin'">
                            <a class="nav-link" ng-click="goToEventDiagnostics()">
                                Event Diagnostics
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" ng-click="goToEventPolicies()">
                                Event Policies
                            </a>
                        </li>
                        <li class="nav-item" ng-show="permission === 'alumni' || permission === 'candidate' || permission === 'brother' || permission === 'chair' || permission === 'officer' || permission === 'financial officer' || permission === 'admin'">
                            <a class="nav-link" ng-click="goToMyAccount()">
                                My Account
                            </a>
                        </li>
                        <li class="nav-item" ng-show="permission === 'alumni' || permission === 'candidate' || permission === 'brother' || permission === 'chair' || permission === 'officer' || permission === 'financial officer' || permission === 'admin'">
                            <a class="nav-link" ng-click="goToBudget()">
                                Budget
                            </a>
                        </li>
                        <li class="nav-item" ng-show="permission === 'chair' || permission === 'officer' || permission === 'financial officer' || permission === 'admin'">
                            <a class="nav-link" ng-click="goToTransactions()">
                                Transactions
                            </a>
                        </li>
                        <li class="nav-item" ng-show="permission === 'financial officer' || permission === 'admin'">
                            <a class="nav-link" ng-click="goToFinancialStatus()">
                                Financial Status
                            </a>
                        </li>
                        <li class="nav-item" ng-show="permission === 'alumni' || permission === 'candidate' || permission === 'brother' || permission === 'chair' || permission === 'officer' || permission === 'financial officer' || permission === 'admin'">
                            <a class="nav-link" ng-click="goToFamilyTrees()">
                                Family Trees
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="nav navbar-nav navbar-right">
                    <button class="btn btn-primary" ng-show="!loggedIn" ng-click="login()">Login</button>
                    <div class="text-right" ng-show="loggedIn">
                        Welcome {{loggedInUser.name}}
                        <button class="btn btn-primary" ng-click="logout()">Logout</button>
                    </div>
                </div>
            </div>
        </nav>`
        }
    });
