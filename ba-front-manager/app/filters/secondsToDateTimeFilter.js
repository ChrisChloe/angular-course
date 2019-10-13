// This filter makes the assumption that the input will be in decimal form (i.e. 17% is 0.17).
angular
    .module('app.filters')
    .filter('secondsToDateTime', [function() {
		return function(seconds) {
			return new Date(1970, 0, 1).setSeconds(seconds);
		};
	}]);