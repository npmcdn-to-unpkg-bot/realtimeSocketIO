'use strict';

angular.module('chatCtrl', [])
    .controller('chatController', function ($scope, $routeParams) {

        $scope.user = $routeParams.id;

        var socket = io.connect();

        socket.emit('new user', $scope.user, function (data) {
            if (data) {
                console.log("Log In Success");
            } else {
                console.log("Log In Failed");
            }
        });
    });