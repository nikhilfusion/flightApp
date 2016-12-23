'use strict';

angular.module('flightApp', [
	'ui.router',
	'ui.bootstrap',
    'rzModule'
])
.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
	$urlRouterProvider.otherwise('/');
	$locationProvider.html5Mode(true);
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'views/flight.html',
            controller : 'flightController',
            controllerAs: 'flightCtrl'
        })
}]);
