(function () {
    'use strict';
    angular.module('gt-tri').factory('authSvc', ['$q', 'firebase', '$firebaseObject', '$firebaseArray', '$rootScope', 'localStorageService', '$state', authSvc]);
    function authSvc($q, firebase, $firebaseObject, $firebaseArray, $rootScope, localStorageService, $state) {

        var allUsers;
        var uid;
        var promise = $firebaseObject(firebase.database().ref().child('Users')).$bindTo($rootScope,'allUsers');
        promise.then(function () {
            allUsers = $rootScope.allUsers;
        });

        var loginUser = function (email, password) {
            var defer = $q.defer();
            firebase.auth().signInWithEmailAndPassword(email, password).then(async function (result) {
                var now = new Date();
                await promise;
                $rootScope.$broadcast('loginChange', true, allUsers[result.user.uid]);
                localStorageService.set('authData', {
                    email: email,
                    password: password,
                    name: allUsers[result.user.uid].name,
                    permission: allUsers[result.user.uid].permission,
                    uid: result.user.uid,
                    logoutTime: now.setHours(now.getHours() + 2)
                });
                uid = result.user.uid;
                $rootScope.$watch(function () {
                    return $rootScope.allUsers[uid].permission;
                }, function (newValue, oldValue) {
                    if (newValue === oldValue) { return; }
                    var temp = localStorageService.get('authData');
                    temp.permission = newValue;
                    localStorageService.set('authData', temp);
                    $rootScope.$broadcast('permissionChange', newValue);
                })
                allUsers[result.user.uid].lastLogin = (new Date()).toLocaleDateString('en-US', {
                    month: 'numeric', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric'
                });
            }, function (e) {
                defer.reject(e.message);
            });
            return defer.promise;
        }

        var logoutUser = function() {
            firebase.auth().signOut().then(function () {
                localStorageService.set('authData', null);
                $rootScope.$broadcast('loginChange', false);
                $state.go('Login');
            });
        }

        var createUser = function(name, email, password) {
            var defer = $q.defer();
            try {
                firebase.auth().createUserWithEmailAndPassword(email, password).then(function (result) {
                    allUsers[result.user.uid] = {
                        email: result.user.email,
                        name: name,
                        permission: 'unregistered',
                        uid: result.user.uid
                    }
                    allUsers
                    loginUser(email, password).then(function () {
                        defer.resolve('Success');
                    });
                });
            } catch (e) {
                defer.reject(e.message);
            }
            return defer.promise;
        }

        var loggedInUser = function () {
            var authData = localStorageService.get('authData');
            return {
                email: authData.email,
                name: authData.name,
                uid: authData.uid,
                permission: authData.permission
            };
        }

        var loggedIn = function () {
            return !!localStorageService.get('authData');
        }

        var permisison = function () {
            var authData = localStorageService.get('authData');
            return authData.permission;
        }

        var authData = localStorageService.get('authData');
        if (!!authData && (new Date()) < authData.logoutTime) {
            loginUser(authData.email, authData.password).catch(function () {
                logoutUser();
            });
        } else {
            logoutUser();
        }



        return {
            loggedIn: loggedIn,
            loginUser: loginUser,
            logoutUser: logoutUser,
            loggedInUser: loggedInUser,
            createUser: createUser,
            permission: permisison
        }
    }
})();
