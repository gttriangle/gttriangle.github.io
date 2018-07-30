angular.module('gt-tri').directive('siteHeader', function () {
        return {
            restrict: "E",
            controller: ['$scope', '$state', 'authSvc', '$window', function($scope, $state, authSvc, $window) {
                $scope.loggedIn = authSvc.loggedIn();
                $scope.loggedInUser = ($scope.loggedIn) ? authSvc.loggedInUser() : {permission: 'unregistered'};
                $scope.permission = $scope.loggedInUser.permission;
                $scope.$on('loginChange', function(event, loggedIn, user) {
                    $scope.loggedIn = loggedIn;
                    if (!loggedIn) {
                        $scope.permission = 'unregistered';
                    } else {
                        $scope.loggedInUser = user;
                        $scope.permission = user.permission;
                    }
                    $scope.$apply();
                    return;
                });

                $scope.$on('permissionChange', function (event, newPermission) {
                    $scope.permission = newPermission;
                    $scope.$apply();
                })

                $scope.login = function () {
                    $state.go('Login');
                }
                $scope.logout = function () {
                    authSvc.logoutUser();
                }

                $scope.goToHome = function () {
                    $state.go('Home');
                };

                $scope.goToAdmin = function () {
                    $state.go('Admin');
                };

                $scope.goToCalendar = function () {
                    $state.go('Calendar');
                };

                $scope.goToEventDiagnostics = function () {
                    $state.go('EventDiagnostics');
                };

                $scope.goToEventPolicies = function () {
                    $window.open('/sources/pdf/eventPolicies.pdf');
                };

                $scope.goToMyAccount = function () {
                    $state.go('Account');
                };

                $scope.goToBudget  = function () {
                    $state.go('Budgets');
                };

                $scope.goToTransactions = function () {
                    $state.go('Transactions');
                };

                $scope.goToFinancialStatus = function () {
                    $state.go('FinancialStatus');
                };

                $scope.goToFamilyTrees = function () {
                    $state.go('FamilyTrees');
                };
            }],
            template: `<div class="siteHeader-container col-md-12">
            <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
                <div class="container-fluid">
                    <div class="nav-bar-header">
                        <a class="navbar-brand" ng-click="goToHome()">
                            <img src="/sources/images/logo.png" class="rounded navbar-logo"
                            height="37">
                            <font color="Grey">Triangle @ GT</font>
                        </a>
                    </div>
                    <div class="collapse navbar-collapse" id="mainNavbar">
                        <ul class="nav navbar-nav">
                            <li>
                                <a class="nav-link" ng-click="goToHome()">
                                    Home
                                </a>
                            </li>
                            <li class="dropdown">
                                <a class="dropdown-toggle nav-link">Events</a>
                                <ul class="dropdown-menu">
                                    <li>
                                        <a class="nav-link" ng-click="goToCalendar()">
                                            Calendar
                                        </a>
                                    </li>
                                    <li ng-show="permission === 'chair' || permission === 'officer' || permission === 'financial officer' || permission === 'admin'">
                                        <a class="nav-link" ng-click="goToEventDiagnostics()">
                                            Event Diagnostics
                                        </a>
                                    </li>
                                    <li>
                                        <a class="nav-link" ng-click="goToEventPolicies()">
                                            Event Policies
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li class="dropdown" ng-show="permission === 'alumni' || permission === 'candidate' || permission === 'brother' || permission === 'chair' || permission === 'officer' || permission === 'financial officer' || permission === 'admin'">
                                <a class="dropdown-toggle nav-link">Finances</a>
                                <ul class="dropdown-menu">
                                    <li ng-show="permission === 'alumni' || permission === 'candidate' || permission === 'brother' || permission === 'chair' || permission === 'officer' || permission === 'financial officer' || permission === 'admin'">
                                        <a class="nav-link" ng-click="goToMyAccount()">
                                            My Account
                                        </a>
                                    </li>
                                    <li ng-show="permission === 'alumni' || permission === 'candidate' || permission === 'brother' || permission === 'chair' || permission === 'officer' || permission === 'financial officer' || permission === 'admin'">
                                        <a class="nav-link" ng-click="goToBudget()">
                                            Budget
                                        </a>
                                    </li>
                                    <li ng-show="permission === 'chair' || permission === 'officer' || permission === 'financial officer' || permission === 'admin'">
                                        <a class="nav-link" ng-click="goToTransactions()">
                                            Transactions
                                        </a>
                                    </li>
                                    <li ng-show="permission === 'financial officer' || permission === 'admin'">
                                        <a class="nav-link" ng-click="goToFinancialStatus()">
                                            Financial Status
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li ng-show="permission === 'alumni' || permission === 'candidate' || permission === 'brother' || permission === 'chair' || permission === 'officer' || permission === 'financial officer' || permission === 'admin'">
                                <a class="nav-link" ng-click="goToFamilyTrees()">
                                    Family Trees
                                </a>
                            </li>
                            <li ng-show="permission === 'admin'">
                                <a class="nav-link" ng-click="goToAdmin()">
                                    Admin Panel
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="nav navbar-nav navbar-right">
                        <button class="btn btn-primary" ng-show="!loggedIn" ng-click="login()">Login</button>
                        <div class="text-right" ng-show="loggedIn">
                            <font color="Grey">Welcome, {{loggedInUser.name}}</font>
                            <button class="btn btn-primary" ng-click="logout()">Logout</button>
                        </div>
                    </div>
                </div>
            </nav>
        </div>`
        }
    });
