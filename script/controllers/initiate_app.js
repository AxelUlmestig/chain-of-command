/*
 * Created the angular app object and injects the state variable.
 */

var app = angular.module('bot',[]);

app.factory('state', function () {
    return {
	    'language': null,
	    'space': null,
	    'bot': null
    };
});
