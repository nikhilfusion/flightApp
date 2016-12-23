'use strict';

angular.module('flightApp').service('flightService', ["$http", "$q", function($http, $q) {
   
    this.getCities = function() {
        var deferred = $q.defer();
        $http.get('/api/cities')
        .then(function(data) {
            deferred.resolve(data.data);
        }, function(error) {
            deferred.reject(message);
        });
        return deferred.promise;
    }

    this.getFlightDtls = function(searchParams) {
        var deferred = $q.defer();
        $http.post('/api/flights', searchParams)
        .then(function(data) {
            deferred.resolve(data.data);
        }, function(err) {

        })
        return deferred.promise;
    }
}])