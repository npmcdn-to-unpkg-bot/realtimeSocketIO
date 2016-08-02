'use strict';

angular.module('appRoutes', [])
    .config(['$routeProvider', '$locationProvider',
        function ($routeProvider, $locationProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'views/chat.html'
                })
                .when('/room/:id', {
                    templateUrl: 'views/room.html',                    
                    controller: 'chatController'
                });
               /* .when('/chatroom', {
                    templateUrl: 'views/chatroom.html'
                })
                .when('/chatroom/:id', {
                    templateUrl: 'views/chatroom.html',
                    controller: 'chatController'
                })
                .otherwise({
                    redirectTo: '/'
                });*/
   
            $locationProvider.html5Mode(true);

        }]);