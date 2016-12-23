'use strict';
angular.module('flightApp').controller('flightController', ['$scope', 'flightService', function($scope, flightService) {
    var vm = this;
    vm.tripType = 2;
    vm.toCity = {};
    vm.fromCity = {};
    vm.passengers = 1;
    vm.startDate = '';
    vm.endDate = '';
    vm.minPrice = 0;
    vm.maxPrice = 0;
    vm.slider_options = {
        floor: vm.minPrice,
        ceil: vm.maxPrice,
        step: 500,
        precision: 1,
        onStart: function() {},
        onChange: function() {},
        onEnd: function() {
            vm.applyPriceFilter();
        }
    };
    
    vm.cities = [];
    vm.flights = [];
    vm.allflights = [];
    vm.flightService = flightService;
    
    vm.getCities = function() {
        flightService.getCities()
        .then(function(data) { 
          vm.cities = data;
        },
        function(error) {
            console.log(error);
        });
    }

    vm.getFlights = function() {        
        var searchParams = {
                    tripType: vm.tripType,
                    to_city_id: vm.toCity.id,
                    from_city_id: vm.fromCity.id
        };
        flightService.getFlightDtls(searchParams)
        .then(function(data) { 
          vm.flights = vm.allflights = data;
          if(vm.flights.length > 0){
              vm.minPrice = Math.min.apply(Math, data.map(function(o){ return o.price; }));
              vm.maxPrice = Math.max.apply(Math, data.map(function(o){ return o.price; }));
              vm.slider_options.floor = vm.minPrice;
              vm.slider_options.ceil = vm.maxPrice;
           }
        },
        function(error) {
            console.log(error);
        });
    }
    
    vm.applyPriceFilter = function(){
        vm.flights = vm.allflights.filter(function(obj) {
            if ((obj.price >= vm.minPrice) && (obj.price <= vm.maxPrice)) {
                return true;
            } else {
                return false;
            }
        });
    }
    vm.getCities();
 }])