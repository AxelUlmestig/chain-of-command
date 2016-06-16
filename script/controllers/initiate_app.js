/*
 * Created the angular app object and injects the state variable.
 * Three different controllers are used to handle the language, 
 * space and bot.
 */

var app = angular.module('bot',[]);

app.factory('state', function () {
    return {
	    'language': null,
	    'space': null,
	    'bot': null
    };
});
