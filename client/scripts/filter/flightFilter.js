'use strict';

angular.module('flightApp').filter('formatTime', function() {
	return function(input) {
		var time = "";
    	if (input < 60) {
    		time = input + 'm';
        	return time;
    	} else if (input % 60 == 0) {
    		time = (input - input % 60) / 60 + 'h'
        	return time;
    	} else {
    		time = ((input - input % 60) / 60 + 'h' + ' ' + input % 60 + 'm')
        	return time;
    	}
    };
})